#!/bin/bash
# Claude Code Slack 알림 스크립트
# 훅 이벤트(Stop, Notification)를 Slack Incoming Webhook으로 전송
# $0 — 현재 실행 중인 스크립트의 경로
# dirname "$0" — $0에서 파일명을 제거하고 디렉토리 경로만 추출
# $(...) - 명령어 실행 결과를 변수에 저장
WEBHOOK_URL_FILE="$(dirname "$0")/slack-webhook-url"
if [ ! -f "$WEBHOOK_URL_FILE" ]; then
  echo "오류: Slack Webhook URL 파일을 찾을 수 없습니다: $WEBHOOK_URL_FILE" >&2
  exit 1
fi
# tr - 문자 변환
# -d - 지정된 문자 제거
# [:space:] - 공백, 탭, 개행 등의 공백 문자
# < "$WEBHOOK_URL_FILE" - 파일 내용을 표준 입력으로 전달
WEBHOOK_URL=$(tr -d '[:space:]' < "$WEBHOOK_URL_FILE")

# settings.json 훅 커맨드에서 인자로 전달 (notification | stop)
# ${1:-notification}: 첫 번째 인자가 없으면 "notification"을 기본값으로 사용
TYPE="${1:-notification}"

# Claude Code가 훅 실행 시 stdin으로 JSON 이벤트 데이터를 전달
# cat으로 stdin 전체를 읽어 변수에 저장 (stdin은 한 번만 읽을 수 있으므로 재사용을 위해 보관)
INPUT=$(cat)

# jq로 JSON에서 필드 추출
# .cwd: 현재 작업 디렉토리 경로, .message: 훅 알림 메시지
CWD=$(echo "$INPUT" | jq -r '.cwd // ""')

# basename: 전체 경로에서 마지막 폴더명만 추출 (예: /Users/.../my-project → my-project)
# ${CWD:-unknown}: CWD가 비어있으면 "unknown"을 기본값으로 사용
DIR=$(basename "${CWD:-unknown}")
MSG=$(echo "$INPUT" | jq -r '.message // ""')

if [ "$TYPE" = "stop" ]; then
  HEADER="✅ *Claude Code 작업 완료*"
  [ -z "$MSG" ] && MSG="작업이 완료되었습니다."
else
  # "Claude is waiting for your input"는 Stop 이벤트 직후 자동 발생하는 내부 알림
  # 필터링하지 않으면 작업 완료 후에도 불필요한 알림이 추가로 전송됨
  if echo "$MSG" | grep -qi "waiting for your input"; then
    exit 0
  fi
  HEADER="🔔 *Claude Code 알림*"
  [ -z "$MSG" ] && MSG="권한 요청 또는 입력 대기 중"
fi

# stop이면 녹색, notification이면 주황색
COLOR=$([ "$TYPE" = "stop" ] && echo "#36a64f" || echo "#f0a500")

# jq -n: 입력 없이 JSON 생성 / --arg: shell 변수를 jq 변수로 안전하게 전달
# mrkdwn_in: Slack attachment에서 마크다운(*볼드* 등) 활성화할 필드 지정
PAYLOAD=$(jq -n \
  --arg header "$HEADER" \
  --arg dir "$DIR" \
  --arg status "$MSG" \
  --arg color "$COLOR" \
  '{
    text: $header,
    attachments: [{
      color: $color,
      text: ("*프로젝트*: " + $dir + "\n*상태*: " + $status),
      mrkdwn_in: ["text"]
    }]
  }')

# macOS 알림창 표시 (settings.json에서 osascript를 제거하고 여기서 처리하여 필터 적용)
osascript -e "display notification \"${MSG}\" with title \"Claude Code\"" 2>/dev/null || true

# curl 옵션 설명
# -s: silent, 진행률·에러 출력 숨김
# -X POST: HTTP 메서드 지정 (기본값 GET → POST로 변경)
# -H: HTTP 헤더 추가 (본문이 JSON임을 서버에 알림)
# -d: HTTP 본문(body)에 전송할 데이터
# > /dev/null 2>&1: stdout·stderr 모두 버림 (Slack 응답 "ok" 및 에러 메시지 숨김)
# || true: curl 실패 시에도 스크립트가 정상 종료되도록 강제 (훅 실패가 Claude 작업에 영향 방지)
curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  > /dev/null 2>&1 || true
