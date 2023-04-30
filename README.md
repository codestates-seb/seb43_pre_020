# Project - Stack overflow 주요기능 Clone

### 배포 주소 : https://bombom-stackoverflow.vercel.app/

### 프로젝트 기간 : 2023.04.14 - 2023.04.27 (14일)

### 프로젝트 이름 : Stackoverflow Clone Project

### 프로젝트 목표 :

1. ✅ 자동로그인 - JWT Token (Access, Refresh)
2. ✅ 질문 | 답변 | 댓글 CRUD + Vote
3. ✅ 배포하기
4. ❌ 소셜로그인 - OAuth

<br>

## Team 봄봄 🌱

|  Team FE  |                                                         허상범 (Leader)                                                          |                                                          박설화                                                           |                                                          최예슬                                                           |
| :-------: | :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| GitHub ID | <img width="150" src="https://avatars.githubusercontent.com/u/41741221?v=4"> <br> [@sangbeomheo](https://github.com/sangbeomheo) | <img width="150" src="https://avatars.githubusercontent.com/u/120469477?v=4"> <br> [@iberis2](https://github.com/iberis2) | <img width=150 src="https://avatars.githubusercontent.com/u/117844745?v=4"> <br> [@dd-stack](https://github.com/dd-stack) |
|   Role    |            유저인증(Login/Signup)<br>자동로그인<br>Router 관리<br>질문/답변 Vote<br>답변 채택<br>댓글 작성/수정/삭제             | 질문리스트 조회/정렬<br>유저 리스트 조회<br>유저 상세 조회<br>회원정보 변경<br>웹 에디터 등록<br>이미지 전송<br>질문 등록 |            공통 레이아웃<br>로그인/회원가입 UI<br>질문상세페이지 조회<br>질문 수정/삭제<br>답변 등록/수정/삭제            |

<br>

|  Team BE  |                                                          김승철 (Leader)                                                          |                                                              우성일                                                              |                                                          서지웅                                                           |
| :-------: | :-------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| GitHub ID | <img width="150" src="https://avatars.githubusercontent.com/u/119999208?v=4"> <br> [@kim-ksp7331](https://github.com/kim-ksp7331) | <img width="150" src="https://avatars.githubusercontent.com/u/70208509?v=4"> <br> [@wooniverse7](https://github.com/wooniverse7) | <img width="150" src="https://avatars.githubusercontent.com/u/116482931?v=4"> <br> [@sksjw95](https://github.com/sksjw95) |
|   Role    |                                    JWT<br>Deploy<br>Answer 채택<br>Question vote<br>사진 전송                                     |                                                   Member<br>Question<br>Audit                                                    |                                             Answer<br>Comment<br>Answer Vote                                              |

<br>

## Tech Stack

|                                                                    Front End                                                                     |                              Back End                               |
| :----------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| **`JavaScript`**<br>**`React`** **`React-Router`**<br>**`Redux-ToolKit`**<br>**`Vercel`** **`Axios`** **`SCSS`** <br>**`ESLint`** **`Prettier`** | **`Java`**<br>**`Spring`**<br>**`mySQL`**<br>**`AWS`**<br>**`JWT`** |

<br>

## 주요기능 Demo

|         Signup Page         |         Login Page          |
| :-------------------------: | :-------------------------: |
| <img src="" width="100%" /> | <img src="" width="100%" /> |

|          Main Page          |      Ask Question Page      |
| :-------------------------: | :-------------------------: |
| <img src="" width="100%" /> | <img src="" width="100%" /> |

|    Question Detail Page     |           My Page           |
| :-------------------------: | :-------------------------: |
| <img src="" width="100%" /> | <img src="" width="100%" /> |

<br>

## Docs

### 테스트 체크리스트

- 프로젝트 최종 배포 시점에 기능 QA를 진행한 체크리스트
- [📄 테스트 체크리스트 문서 링크](https://codestates.notion.site/875b3d68f71a47d7a24dfa8d1cb42afc?v=09ac620daaf54ec18805a7bb1b529cd4)

### 사용자 요구사항 정의서

- 프로젝트 시작할 때 필요한 요구사항을 작성
- [📄 사용자 요구사항 정의서 링크](https://codestates.notion.site/80dda56d4bdb4c938d7c397de666a725)

### API명세서

- API 명세서-HTTP Method
- [📄 API 명세서 링크](https://codestates.notion.site/API-HTTP-Method-87e5db648cc5428383453e1ff72f177d)

### ERD(Entity Relationship Diagram)

  <img src="https://user-images.githubusercontent.com/41741221/234961614-92d2bca1-987d-4e4b-8914-ba69d146423c.png" width="640px" />

<br>

## Team 규칙 & Brach 전략 & 커밋 컨벤션

### 규칙

- 코어타임 설정 :10:00 to 17:00 Team20-라운지 채널 접속하기
- 월-수-금 주3회 전체 회의 진행
  - 오전 10시부터 약 1~2시간
  - 팀별, 개인별 진행상황-이슈 공유
- 오버 커뮤니케이션하기
  - 부족하거나 모르는 부분이 보잘 것 없어보이더라도? 일단 이야기 해주기
  - 설명할 때, 배웠다고 가정하지 말고 천천히, 차분히, 자세히 알려주기

<br>

### 브랜치 구조

- **`main`**: 서비스 운영 브랜치입니다.
- **`release`**: 프로덕션 배포 브랜치. 배포와 테스트를 진행합니다.
- **`dev`**: 개발 환경 브랜치. 이슈 또는 기능 단위로 작업했던 내용을 합치고 검토합니다. (FE,BE 공통)
- **`feat`**: FE, BE 세부 작업 브랜치입니다.

<img src="https://user-images.githubusercontent.com/41741221/234965897-1dd62d40-d304-44bf-83f2-e26b024076ed.png" width="640px" />

<br>

### 커밋 컨벤션

> 출처: https://thalals.tistory.com/319

| Tag      | Title                                                             |
| -------- | ----------------------------------------------------------------- |
| feat     | 새로운 기능 추가                                                  |
| fix      | 버그 수정                                                         |
| docs     | 문서 수정                                                         |
| design   | CSS 등 사용자 UI 디자인 변경                                      |
| style    | 코드 포맷 변경, 세미 콜록 누락, 코드 수정이 없는 경우             |
| refactor | 코드 리팩토링                                                     |
| chore    | 빌드 테스트 업데이트, 패키지 매니저를 설정 (프로덕션 코드 변경 x) |
| comment  | 필요한 주석 추가 및 변경                                          |
| rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                |
| remove   | 파일을 삭제하는 작업만 수행한 경우                                |

<br>
