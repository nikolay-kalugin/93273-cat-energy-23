// Анимация для значка бургер-меню
document.addEventListener("click", function (e) {

  if (e.target.className == "page-header__toggle-open" || e.target.className == "page-header__toggle-close") {
    document.querySelector(".page-header__toggle-open").classList.toggle("page__block--hide");
    document.querySelector(".page-header__toggle-close").classList.toggle("page__block--hide");
    document.querySelector(".main-nav").classList.toggle("page__block--hide");
  }

});

// Подчеркивание активного пункта меню
const points = document.querySelectorAll(".main-nav__list li a");

for (let point of points) {

  if (point.href == document.location.href) {
    point.style.borderBottom = "2px solid #68B738";
    point.style.marginTop = "2px";
    // point.style.paddingBottom = "3px";
  }

}
