/* =========================================================
   experience.js — 체험소개 페이지 스크립트
   1. 공간(01·02·03) 클릭 → 선택 표시 이동 + 평면도 이미지 교체
   2. 단어 기록 섹션이 화면에 들어오면 .is-visible 붙이기 (움직임은 CSS)
   ========================================================= */

// 새로고침(F5)하면 항상 맨 위에서 시작 — 보던 위치로 돌아가면 여러 섹션 효과가 한꺼번에 나와서
history.scrollRestoration = "manual";

const zones = document.querySelectorAll(".zone");
const floorPlan = document.querySelector(".zones__floor-plan");

zones.forEach((zone) => {
  zone.addEventListener("click", () => {
    zones.forEach((z) => z.classList.remove("zone--active"));
    zone.classList.add("zone--active");
    floorPlan.src = zone.dataset.plan; // HTML 의 data-plan 에 적힌 이미지
  });
});


/* 2. 섹션이 40% 이상 보이면 .is-visible 을 붙이고 끝 */
const recordObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.add("is-visible");
    recordObserver.disconnect();
  }
}, { threshold: 0.4 });

recordObserver.observe(document.querySelector(".section--word-record"));
