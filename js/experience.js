/* =========================================================
   experience.js — 체험소개 페이지 스크립트
   1. 공간(01·02·03) 클릭 → 선택 표시 이동 + 평면도 이미지 교체 + 평면도 위 공간 깜빡임
   2. 단어 기록 섹션이 화면에 들어오면 .is-visible 붙이기 (움직임은 CSS)
   ========================================================= */

const zones = document.querySelectorAll(".zone");
const floorPlan = document.querySelector(".zones__floor-plan");
const blink = document.querySelector(".zones__blink");

zones.forEach((zone, i) => {
  zone.addEventListener("click", () => {
    zones.forEach((z) => z.classList.remove("zone--active"));
    zone.classList.add("zone--active");
    floorPlan.src = zone.dataset.plan; // HTML 의 data-plan 에 적힌 이미지

    // 깜빡임: 위치·색 클래스를 바꾸고 애니메이션을 처음부터 다시 시작
    blink.className = "zones__blink zones__blink--" + (i + 1);
    void blink.offsetWidth; // 브라우저가 클래스 제거를 반영하게 해서, 같은 공간을 다시 눌러도 또 깜빡이게
    blink.classList.add("is-blinking");
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
