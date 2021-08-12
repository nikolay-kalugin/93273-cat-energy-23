document.addEventListener("click", function (e) {

  if (e.target.className == "page-header__toggle-open" || e.target.className == "page-header__toggle-close") {
    document.querySelector(".page-header__toggle-open").classList.toggle("page__block--hide");
    document.querySelector(".page-header__toggle-close").classList.toggle("page__block--hide");
    document.querySelector(".main-nav").classList.toggle("page__block--hide");
  }

  // alert("123");
});
