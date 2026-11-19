/* =========================================================
   fit-width.js — 페이지 전체를 창 폭에 맞춰 1920 기준 비율로 키우거나 줄임
   (예: 창 1440px → 0.75배, 창 2560px(맥북 5K/레티나) → 1.333배)
   → 어떤 화면에서도 1920 x 1080 에서 본 모습 그대로 보입니다. 메인·체험소개 공통
   ========================================================= */

function fitPageToWindow() {
  const page = document.querySelector(".page");
  page.style.zoom = window.innerWidth / 1920;
}

fitPageToWindow();
window.addEventListener("resize", fitPageToWindow);
