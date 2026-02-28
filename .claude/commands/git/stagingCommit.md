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
argument-hint: [타입, 이모지, 커밋설명]
model: sonnet
---

아래 파라미터를 **그대로** 사용하여 커밋을 생성하세요. 파라미터 값을 임의로 변경하거나 diff 내용으로 대체하지 마세요.

- 커밋 타입 (type): $0
- 이모지 (emoji): $1
- 커밋 설명 (message): $2

커밋 메시지 형식: `$0: $1 $2`

현재 변경사항을 스테이징하고, 위 형식으로 커밋을 생성해주세요.