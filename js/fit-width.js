/* =========================================================
   fit-width.js — 창이 1920px 보다 좁으면 페이지 전체를 비율대로 줄임
   (예: 창 1440px → 0.75배). 메인·체험소개 공통
   ========================================================= */

function fitPageToWindow() {
  const page = document.querySelector(".page");
  page.style.zoom = Math.min(1, window.innerWidth / 1920);
}

fitPageToWindow();
window.addEventListener("resize", fitPageToWindow);
