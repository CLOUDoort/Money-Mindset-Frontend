# MoneyMindset-Frontend

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/602c55a1-dcd8-4f55-97d9-933ded1d9622" width="100%"/>

## 동기
전체 자산에서 매달 나가는 고정금액과 목표금액을 빼고 내가 지금 사용할 수 있는 금액이 얼마인지 한 눈에 확인하고 싶었다.

## 핵심 기능
- 전체 자산에서 매달 나가는 고정금액을 뺀 금액을 생존 방어선으로 설정한다.
- 목표 항목이 추가되면 해당 목표 방어선이 생성되어 사용할 수 있는 금액을 한눈에 확인할 수 있다.

## 기간
230225 ~ 230730

## 기술 스택
- TypeScript
- React.js
- Tailwind CSS
- Jotai
- React Query
- React Hook Form

## 목차
- [메인페이지](#메인페이지)
- [회원가입, 로그인](#회원가입-로그인)
- [대시보드](#대시보드)
- [수입 및 지출 기록](#수입-및-지출-기록)
- [방어선 설정](#방어선-설정)
- [캘린더](#캘린더)
- [통계 그래프](#통계-그래프)
- [설정](#설정)
- [협업](#협업)
- [후기](#후기)

## 메인페이지
스크롤 애니메이션을 이용하여 메인페이지에서 서비스를 소개했다.
[구현과정](https://velog.io/@cloud_oort/TypescriptIntersection-Observer%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
 <br />  <br />
 
<img src="https://velog.velcdn.com/images/cloud_oort/post/8ba217fd-afe1-4261-b9b0-6f7a0c25af79/image.gif" width="100%"/>

## 회원가입, 로그인
### 회원가입
- 회원가입을 하면 welcome 페이지로 이동해서 자신의 자산을 입력하고 서비스 페이지로 이동한다.
- [React Hook Form 사용과정](https://velog.io/@cloud_oort/Typescriptreact-hook-form-%EC%82%AC%EC%9A%A9-input-custom-hook-%EC%9D%B4%EC%9A%A9)

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/414e77f3-5507-49b2-ae8c-b5a987c0d57d" width="100%"/>

### 로그인
- 회원가입하거나 로그인할 경우 refreshToken이 쿠키에 남고, 이 쿠키 기한이 남아있는 경우 로그인 과정을 거치지 않고 곧바로 서비스 페이지로 이동한다.
- 로그아웃하면 메인페이지로 이동한다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/ff924791-4789-4b12-a140-98ee2918bd59" width="100%"/>

## 대시보드
- 현재 자산
- 방어선 및 그래프
- 수입 및 지출 원 그래프
- 수입 및 지출 상세내용과 위치

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/602c55a1-dcd8-4f55-97d9-933ded1d9622" width="100%"/>

## 수입 및 지출 기록
### 수입 및 지출 기록
- 날짜, 사용내역, 금액을 입력받아 수입 및 지출 내역에 기록한다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/03aff5b5-7a7f-47f0-b435-f7b4c5ca5d44" width="100%"/>

### 상세내용, 위치 기록
- 수입 및 지출의 상세내용과 위치를 기록한다.
- 지도는 카카오 지도 API를 사용했다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/3cc4ce71-d6b4-4830-8d0f-471639e03a3d" width="100%"/>

### 수정 및 통계
- 항목을 클릭해서 수정할 수 있다.
- 수입과 지출의 통계를 볼 수 있다. 원그래프는 [Nivo](https://nivo.rocks/) 라이브러리를 사용했다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/a8b56d4e-79b1-4df0-8d10-44dc62914388" width="100%"/>

## 방어선 설정
### 목표 입력
- 목표를 입력하면 생존 방어선에서 목표 금액만큼 차감되어 해당 목표 방어선이 생성된다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/d5e40f8e-94b6-46a5-880b-5756567d6db2" width="100%"/>

### 고정 지출 입력
- 고정 지출을 입력하면 현재 자산에서 고정 지출을 뺀 값이 생존 방어선이 된다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/3c17db0f-5f3f-4695-92a0-d779ac233137" width="100%"/>

### 방어선 파괴
- 사용 가능 금액이 0원 이하가 될 경우 지출 그래프가 방어선 Y축을 뚫고 나가면서 방어선이 파괴된다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/26a8dedb-e635-430a-af17-e5d1aa722fc3" width="100%"/>

## 캘린더
- 캘린더에서 수입 및 지출 내역을 볼 수 있다.
- 상세내용과 위치를 기록한 경우 지도를 통해 그 날 수입 및 지출 기록을 볼 수 있다.
- [캘린더 제작 과정](https://velog.io/@cloud_oort/Typescript-Calendar-%EB%A7%8C%EB%93%A4%EA%B8%B0)

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/d8edbd59-4517-4360-a2da-b5d6e670137e" width="100%"/>

## 통계 그래프
- 지출 그래프
- 수입 및 지출 원그래프
- 수입, 지출 위치와 상세내용 지도

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/27690e18-5dd8-4007-b670-5a73d2f1aaa6" width="100%"/>

## 설정
- 비밀번호 변경과 회원탈퇴가 가능하다.

<img src="https://github.com/CLOUDoort/MoneyMindset-Frontend/assets/93777385/ce7c711c-5900-4934-b266-2d8cfbad1ef9" width="100%"/>

## 협업
[프론트엔드 github](https://github.com/CLOUDoort/Movieinner-Frontend/blob/main/README.md)
 <br />
[백엔드 개발자 github](https://github.com/HoonDongKang/movieinner-project-backend)
## 후기
학교 수업, 졸업 준비, 프로젝트를 동시에 진행했기 때문에 조금 오래 걸린 부분도 있지만 정말 열심히 준비한만큼 결과물이 만족스럽다!

지금까지 3개의 프로젝트를 끝냈다. 아직도 하고 싶은 프로젝트가 정말 많지만 이제는 기본기를 다져서 현업에서 사람들이 진짜로 사용하는 서비스에 기여하고 싶다.
