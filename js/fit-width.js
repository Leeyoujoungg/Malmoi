/* =========================================================
   fit-width.js — 페이지 전체를 창 폭에 맞춰 1920 기준 비율로 키우거나 줄임
   (예: 창 1440px → 0.75배, 창 2560px(맥북 5K/레티나) → 1.333배)
   → 어떤 화면에서도 1920 x 1080 에서 본 모습 그대로 보입니다. 메인·체험소개 공통
   ========================================================= */

function fitPageToWindow() {
  const page = document.querySelector(".page");
  const scale = window.innerWidth / 1920;

  page.style.zoom = scale;
  page.style.setProperty("--fit", scale); // CSS 에서 배율이 필요할 때 var(--fit)

  // 제작 과정 섹션(메인 페이지에만 있음)
  // 맥 Safari 는 zoom 이 걸린 곳의 sticky 고정을 틀리게 계산해서,
  // 바깥 틀은 zoom 을 되돌려(배율 1) 고정이 정확하게 되게 하고
  // 안쪽 내용에만 다시 배율을 걸어 보이는 모습은 똑같이 유지
  const making = document.querySelector(".making-scroll");
  if (making) {
    making.style.zoom = 1 / scale;
    making.querySelector(".section__inner").style.zoom = scale;
  }
}

fitPageToWindow();
window.addEventListener("resize", fitPageToWindow);
