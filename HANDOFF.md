# 말모이 웹 — 작업 인수인계 (AI / 팀원용)

이 문서만 읽고 이어서 작업할 수 있도록 정리했습니다.
마지막 정리: 2026-11-14

---

## 1. 한눈에 보기

| 항목 | 상태 |
|---|---|
| 메인 페이지 `index.html` | 배경 + 요소 배치 완료, 기본 링크 기능 완료 |
| 체험소개 페이지 `experience.html` | 배경 + 요소 배치 완료, **인터랙션 없음** |
| 이미지·영상 | 페이지가 쓰는 파일 **모두 `assets/` 안에 있음** (빠진 파일 0개) |
| 다음 할 일 | 체험소개 1섹션 **단계 클릭 전환** (아래 6번) |

- 기술: 순수 HTML / CSS / JS (빌드 도구, 프레임워크 없음)
- 기준 화면: **폭 1920px** 데스크톱 (반응형 아님)
- Figma: https://www.figma.com/design/SvFy1kByI5BbAfC5PGnPYm/%EC%B5%9C%EC%A2%85
  - 메인 페이지: `Frame 5907` (node `4556:6649`, 1920 x 12473) — "웹쇼잉 최종" 섹션 안
  - 체험소개 페이지: `최종—체험소개` (node `4556:7426`, 1920 x 3724)
  - 체험소개 1섹션 2·3단계 모습: `최종—체험소개２` (`4556:7583`), `최종—체험소개３` (`4556:7664`)

---

## 2. 꼭 지켜야 할 규칙 (사용자가 정한 것)

1. **섹션 배경은 확정, 수정 금지** — `css/main.css`, `css/experience.css`
2. **크기는 Figma 와 똑같이** — 요소는 Figma x/y 좌표를 `left/top` 에 그대로 넣음
3. **글자는 이미지가 아니라 실제 텍스트**로 (Source 에 글자가 박힌 이미지가 있어도 HTML 로 다시 만듦)
   - 예외: 기울어진 단어 칩/태그(첫 화면 단어 칩, 체험소개 나무의 단어 카드), 평면도, 제작 과정 왼쪽 그림 카드
4. **인터랙션은 요청받은 것만** 넣음 (호버 영상, 애니메이션 등 임의로 추가하지 않기)
5. **GNB(상단 메뉴)는 첫 섹션 안에 고정** — 스크롤을 따라오지 않음
6. **오른쪽 아래 버튼 2개도 마지막 섹션 안에 고정** — 스크롤을 따라오지 않음
7. **GNB 메뉴 색**: 기본 = 네이비 글자 / **마우스 올렸을 때만** 분홍 배경(`#ff3d8b`) + 흰 글자
   (스크롤 위치에 따라 메뉴가 분홍으로 바뀌는 기능은 넣지 않기)
8. **오른쪽 스크롤바 숨김** 유지 (`css/base.css` 4번)
9. 작업 전 사용자에게 이해한 범위를 먼저 확인받는 방식을 선호함
10. 코드는 **다른 사람이 봐도 알 수 있게** 파일·주석으로 구분 (섹션마다 CSS 파일 1개)

---

## 3. 파일 구조

```
index.html                 메인 페이지 (섹션 1~10)
experience.html            체험소개 페이지 (섹션 1~3)
css/
  base.css                 공통: 폰트·색 변수, 초기화, 스크롤바 숨김, .section__inner(1920 박스)
  main.css                 메인 섹션 배경 + .page/.section/.main-footer 공통 틀  ← 수정 금지
  experience.css           체험소개 섹션 배경                                 ← 수정 금지
  section01-hero.css ~ section09-team.css   메인 섹션별 요소
  exp-section01-zones.css, exp-section02-word-record.css   체험소개 섹션별 요소
  gnb.css                  상단 메뉴 (두 페이지 공통)
  floating-buttons.css     오른쪽 아래 버튼 2개 (두 페이지 공통)
  footer.css               푸터 안쪽 요소 (두 페이지 공통)
js/
  main.js                  메인 페이지 전용: 제작 과정 고정 스크롤 4단계
assets/
  images/common/           두 페이지 공통 (로고, GNB 바, 맨 위로 버튼)
  images/section01-hero ~ section09-team/        메인 섹션별 이미지
  images/exp-section01-zones/, exp-section02-word-record/   체험소개 섹션별 이미지
  videos/world-intro.mp4   메인 04 세계관 영상
```

### 배치 방식 (모든 섹션 공통)
```html
<section class="section section--이름" id="아이디">
  <div class="section__inner">        <!-- 1920px 박스, 가운데 정렬 -->
    <img class="이름__요소" ...>      <!-- position:absolute; left/top = Figma 좌표 -->
  </div>
</section>
```
- 섹션 배경은 창 폭 100%, 내용은 1920 박스 안.
- 섹션 밖으로 나가는 장식 원은 `overflow:hidden` 박스로 잘라서 넣음 (CSS 주석 참고).
- 클래스 이름: `섹션약어__요소--변형` (BEM 비슷하게).
- HTML 요소 순서 = Figma 레이어 순서 (뒤에 쓴 것이 위에 겹침).

---

## 4. 메인 페이지 `index.html` — 진행 상황

| # | 섹션 (id) | Figma 이름 | 높이 | CSS | 상태 |
|---|---|---|---|---|---|
| 1 | 첫 화면 `#hero` | Frame 5906 | 1484 | section01-hero.css | 완료 (+GNB) |
| 2 | 말모이 이야기 `#story` | 02 그 많은 말들은… | 1080 | section02-story.css | 완료 |
| 3 | 리듬게임 이유 | 03 왜 리듬에 맞춰… | 1080 | section03-why-rhythm.css | 완료 (출처 링크만 새 창) |
| 4 | 세계관 안내 `#world` | 04 세계관 안내 | 1282 | section04-world.css | 완료 (영상 자동재생·음소거·반복) |
| 5 | 네 가지 감정 | 05 네 가지 감정… | 1278 | section05-fairies.css | 완료 |
| 6 | 플레이 방법 | Frame 5904 | 1291 | section06-how-to-play.css | 완료 |
| 7 | 네 가지 플레이 `#play-modes` | 04 같은 숲, 네 가지 플레이 | 2222 | section07-play-modes.css | 완료 (호버 영상 없음) |
| 8 | 제작 과정 `#making` | 06 말모이가 만들어지기까지 | 1080 (+고정 스크롤) | section08-making.css + js/main.js | 완료 |
| 9 | 팀 소개 `#team` | 04 세계관 안내(내용은 팀 소개) | 1339 | section09-team.css | 완료 (+버튼 2개) |
| 10 | 푸터 | Footer | 256 | footer.css | 완료 |

### 동작하는 기능
- GNB 메뉴 클릭 → 섹션으로 부드럽게 이동 (`href="#아이디"` + `scroll-behavior: smooth`)
  - 말모이 이야기 → `#story`, 세계관 안내 → `#world`, 제작 과정 → `#making`, 팀 소개 → `#team`, 로고 → `#hero`
- 팀 소개 오른쪽 아래: "체험 소개" → `experience.html`, 화살표 → `#hero`
- 푸터 메뉴: 말모이 → `index.html`, 체험소개 → `experience.html`
- **제작 과정 고정 스크롤**: 섹션이 화면 위에 고정된 채 스크롤하면 4단계 전환
  - `js/main.js` 가 `.section--making` 에 `data-step="1~4"` 를 붙임 → CSS 가 해당 단계만 표시
  - 단계별로 바뀌는 것: 배경색(`#FFE3F3 → #FFF6C9 → #DDF7FF → #E1FFE7`), 큰 노란 원(1단계만 다른 이미지), 왼쪽 그림 카드, 오른쪽 step 카드
  - 이 고정 구간 때문에 페이지 높이는 Figma(12473)보다 긴 15713px

### 메인에서 아직 안 한 것 (요청 오면)
- 07 게임 카드: "마우스 올리면 요정별 인게임 영상 재생" (Figma 안내 문구만 있음, 영상 파일 없음)
- 06 게임 화면 이미지: Figma 레이어 이름이 "GIF" — GIF 파일을 받으면 교체
- 05 요정 카드 뒷면(Source `요정 — 설명` 폴더 4장): 호버/뒤집기용으로 보여 미사용

---

## 5. 체험소개 페이지 `experience.html` — 진행 상황

| # | 섹션 (id) | Figma 이름 | 높이 | CSS | 상태 |
|---|---|---|---|---|---|
| 1 | 체험 소개 `#experience` | 전시 현장 — 구상도 | 1983 | exp-section01-zones.css | 배치 완료, **1단계 모습으로 고정** |
| 2 | 단어 기록 `#word-record` | 05 단어 기록 | 1484 | exp-section02-word-record.css | 배치 완료, 카드는 기본(흰색) |
| 3 | 푸터 | Footer | 256 | footer.css | 완료 |

- GNB 메뉴: 체험소개 → `#experience`, 단어기록 → `#word-record`, 로고 → `index.html`
- 단어 기록 오른쪽 아래: "말모이" → `index.html`, 화살표 → `#experience`
- 체험소개 페이지에는 아직 JS 파일이 연결돼 있지 않음

---

## 6. 다음 할 일

### ① (진행 중이던 작업) 체험소개 1섹션 — 단계 클릭 전환
Figma 메모: "오른쪽 단계 버튼을 누르면 선택한 버튼이 강조되고, 왼쪽 전시 평면도에서 해당 공간이 단계별 색상으로 표시"
- 오른쪽 패널의 공간 카드 3개(`.zone--1/2/3`)를 클릭하면
  - 누른 카드에 `.zone--active` (흰 바탕, 진한 테두리, 색 그림자, 설명 표시, 번호 동그라미 진한 색)
  - 나머지는 흐린 기본 모습
  - 왼쪽 평면도 이미지 교체:
    - 1 → `assets/images/exp-section01-zones/floor-plan-step1-main-zone.png`
    - 2 → `floor-plan-step2-record-table.png`
    - 3 → `floor-plan-step3-emotion-tree.png`
- 2·3단계 공간 카드 **설명 문구는 아직 확인 안 됨** → Figma `4556:7583`, `4556:7664` 의 zones 안 텍스트에서 확인 필요
  (참고: Source `zones02/03.png` 이미지에는 "마음에 남은 말을 카드에 적어요" 로 보임)
- 사용자가 요청한 것은 **클릭 효과만** (스크롤 효과는 아직 요청 안 함)

### ② (요청 오면) 체험소개 2섹션 — 스크롤 효과
Figma 메모: "섹션에 들어오면 고르기 → 적기 → 걸기 카드가 위에서부터 차례로 분홍·하늘·연두색으로 채워지고, 마지막 카드가 강조될 때 나무에 걸린 단어 카드들이 살짝 흔들림"
- 채워진 카드 모습 참고 이미지: `card-01-pick-active.png`, `card-02-write-active.png`, `card-03-hang-active.png`

---

## 7. 이미지 확인 결과

- HTML/CSS 가 참조하는 파일 **145곳 모두 존재**, 바탕화면·Figma 임시 주소 참조 **없음**
- `assets/` 파일 121개, 약 19.9MB (그중 영상 13.6MB)
- 원본은 사용자 바탕화면 `Source/` 폴더. 프로젝트에는 **이름을 정리해서 복사**함
  (예: `Vector.png` → `light-left.png`, `circle-1.png` → `circle-top-right.png`, 한글 파일명 → 영문)
- Source 에 없던 것은 Figma 에서 받아 넣음 (아이콘·원 SVG, 게임 화면, 요정 캐릭터 잘라낸 이미지 등)

### 아직 안 쓰는 이미지 (다음 기능용으로 보관)
| 파일 | 용도 |
|---|---|
| `exp-section01-zones/floor-plan-step2-record-table.png` | 단계 클릭 전환 (2단계 평면도) |
| `exp-section01-zones/floor-plan-step3-emotion-tree.png` | 단계 클릭 전환 (3단계 평면도) |
| `exp-section01-zones/zone-list-step1~3-*.png` (3장) | 참고용 — 패널은 텍스트로 만들어서 미사용 |
| `exp-section02-word-record/card-01~03-*.png` (6장) | 참고용 — 카드는 텍스트로 만들었음. `-active` 는 스크롤 효과 색 참고 |

---

## 8. 실행 / 확인 방법

- 파일을 직접 열어도 되지만, 로컬 서버 권장:
  ```bash
  python -m http.server 5500
  ```
  → http://localhost:5500/index.html , http://localhost:5500/experience.html
- CSS 를 고쳤는데 화면이 안 바뀌면 브라우저 캐시 → **Ctrl+F5** (강력 새로고침)
- 웹폰트(Jua, Noto Sans KR, Bagel Fat One, Preahvihear, Pretendard)는 CDN 에서 불러오므로 인터넷 연결 필요

---

## 9. 알아두면 좋은 점

- `.page` 는 `overflow: clip` (hidden 이면 제작 과정 sticky 고정이 깨짐)
- 폰트 줄높이는 Figma 와 맞추려고 일부 요소에 px 로 직접 지정해 둠 (주석 "Figma 줄 높이")
- Figma 글꼴 Preahvihear 는 한글이 없어서 영문 부제에만 쓰고, 한글은 Noto Sans KR
- `.idea/`, `.claude/` 는 개인 설정이라 커밋하지 않음
