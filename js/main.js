/* =========================================================
   main.js — 메인 페이지 스크립트
   기능 목록
   1. 제작 과정 섹션: 스크롤 위치에 따라 배경 step(1~4) 바꾸기
   2. 섹션이 화면에 들어오면 .is-visible 붙이기 (움직임은 각 섹션 CSS)
   3. 네 가지 플레이: 카드에 마우스를 올리면 게임 영상 재생
   4. 세계관 안내: 영상이 화면에 들어오면 재생, 나가면 멈춤
   (메뉴·버튼을 눌러 섹션으로 이동하는 건 HTML 링크(href="#아이디")
    + base.css 의 scroll-behavior: smooth 로, 메뉴 호버 색은 css/gnb.css 로
    처리해서 JS 가 필요 없습니다)
   ========================================================= */

// 새로고침(F5)하면 항상 맨 위에서 시작 — 보던 위치로 돌아가면 여러 섹션 효과가 한꺼번에 나와서
history.scrollRestoration = "manual";

document.addEventListener("DOMContentLoaded", () => {
  initMakingSectionSteps();
  initRevealOnScroll();
  initModeCardVideos();
  initWorldVideo();
});


/* ---------------------------------------------------------
   1. 제작 과정 섹션 (06 말모이가 만들어지기까지)
   - 섹션은 CSS(sticky)로 화면 맨 위에 고정됩니다.
   - 고정되어 있는 동안의 스크롤 구간을 4등분해서
     step 1 → 2 → 3 → 4 로 바꿉니다.
   - 실제 색은 css/main.css 의 .section--making[data-step] 에 있습니다.
   --------------------------------------------------------- */
function initMakingSectionSteps() {
  const wrapper = document.querySelector(".making-scroll");
  const section = document.querySelector(".section--making");
  if (!wrapper || !section) return;

  const STEP_COUNT = 4;

  function updateStep() {
    const wrapperRect = wrapper.getBoundingClientRect();

    // 고정된 채로 스크롤할 수 있는 거리 (= 바깥 틀 높이 - 섹션 높이)
    const pinnedDistance = wrapperRect.height - section.offsetHeight;

    // 0 = 섹션이 막 고정됐을 때, 1 = 고정이 풀리기 직전
    const progress = -wrapperRect.top / pinnedDistance;
    const clamped = Math.min(Math.max(progress, 0), 0.999);
    const step = Math.floor(clamped * STEP_COUNT) + 1;

    if (section.dataset.step !== String(step)) {
      section.dataset.step = step;
    }
  }

  window.addEventListener("scroll", updateStep, { passive: true });
  window.addEventListener("resize", updateStep);
  updateStep();
}


/* ---------------------------------------------------------
   2. 섹션 등장 효과
   - 섹션이 40% 이상 보이면 .is-visible 을 붙이고, 한 번 붙으면 끝.
   - 대상 섹션: 말모이 이야기
   --------------------------------------------------------- */
function initRevealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(document.querySelector(".section--story"));
}


/* ---------------------------------------------------------
   3. 네 가지 플레이 카드 영상
   - 마우스를 올리면 소리와 함께 재생, 떼면 멈추고 처음 사진(poster)으로 되돌림
   - 카드를 클릭하면 소리가 켜짐 (아래 playWithSound 설명 참고)
   --------------------------------------------------------- */
function initModeCardVideos() {
  document.querySelectorAll(".mode-card").forEach((card) => {
    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => playWithSound(video));
    card.addEventListener("click", () => (video.muted = false));
    card.addEventListener("mouseleave", () => video.load()); // load() = 처음 상태(poster)로
  });
}


/* ---------------------------------------------------------
   4. 세계관 영상
   - 영상이 절반 이상 보이면 소리와 함께 재생, 화면에서 나가면 멈춤
   - 영상을 클릭하면 소리가 켜짐
   --------------------------------------------------------- */
function initWorldVideo() {
  const video = document.querySelector(".world__video video");

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) playWithSound(video);
    else video.pause();
  }, { threshold: 0.5 }).observe(video);

  video.addEventListener("click", () => (video.muted = false));
}


/* 소리 켜고 재생 (3, 4번 공통)
   브라우저 규칙: 페이지를 한 번도 클릭하지 않았으면 소리 있는 자동 재생을 막음
   → 막히면 소리 없이라도 재생 */
function playWithSound(video) {
  video.muted = false;
  video.play().catch(() => {
    video.muted = true;
    video.play();
  });
}
