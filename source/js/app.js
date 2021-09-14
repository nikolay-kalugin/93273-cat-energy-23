/* Анимация мобильного меню */

// Если включен JS, скрываем мобильное меню
document.querySelector(".main-nav").classList.add("visually-hidden");

document.addEventListener("click", function (e) {

  if (e.target.className == "page-header__toggle-open" || e.target.className == "page-header__toggle-close") {
    document.querySelector(".page-header__toggle-open").classList.toggle("visually-hidden");
    document.querySelector(".page-header__toggle-close").classList.toggle("visually-hidden");
    document.querySelector(".main-nav").classList.toggle("visually-hidden");
  }

});

/* Подчеркивание активного пункта меню */
const points = document.querySelectorAll(".main-nav__list li a");

for (let point of points) {

  if (point.href == document.location.href) {
    point.style.borderBottom = "2px solid #68B738";
    point.style.marginTop = "2px";
  }

}

/* Настройки для input - begin */
if (document.location.href == 'http://localhost:3000/form.html' || document.location.href == 'https://localhost:3000/form.html') {
  document.querySelector('.form__input-weight').addEventListener('input',
    function (e) {
      this.value = this.value.replace(/[^\d.]/g, '');
    }
  )

  document.querySelector('.form__input-age').addEventListener('input',
    function (e) {
      this.value = this.value.replace(/[^\d.]/g, '');
    }
  )

}
/* Настройки для input - end */
