슈퍼베이스 MCP

Step 2: Configure your AI tool

Platform

- Hosted = 슈퍼베이스 서버를 이용하겠다
- CLI = 로컬 호스트에서 돌리겠다

Project

- 적용 시킬 프로젝트 선택

Client

- VS Code (내가 사용하는 거)

---

_서비스 폴더 생성_

- 목록, 상세보기, 수정
  데이터를 받아서 조회를 하기때문에 서버클라이언트 ( 서비스에서 처리 가능 )
- 추가
  데이터를 넣어야하는거라 서비스에서 처리 할 필요가 없음

---

프로젝트 설명

1. TodoList

- 투두리스트 안에서 추가,수정,삭제 기능 구현(페이지 이동 없음)
- DB = id, created_at, title

2. board

- 게시판 목록
  게시글 클릭 시 해당 id로 페이지 이동 - 수정, 삭제
  상세페이지(id)로 이동 후 수정 삭제 가능
- 글쓰기
  add-board페이지로 이동 후 추가

- DB = id, created_at, title, content
