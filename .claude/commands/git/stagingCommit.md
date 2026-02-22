---
description: '이모지와 컨벤셔널 커밋 메시지로 잘 포맷된 커밋을 생성합니다'
allowed-tools:
  [
    'Bash(git add:*)',
    'Bash(git status:*)',
    'Bash(git commit:*)',
    'Bash(git diff:*)',
    'Bash(git log:*)',
  ]
argument-hint: [param1, param2, message]
model: sonnet
---

커밋 메시지: $1, $2, $3
현재 변경사항을 분석하고, 변경사항을 스테이징 및 커밋을 생성해주세요.