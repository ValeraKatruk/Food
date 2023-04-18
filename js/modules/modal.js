function showModal(modalSelector, timerShowModal) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (timerShowModal) {
    clearTimeout(timerShowModal);
  }
}
function hideModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";  
}

function modal(triggerSelector, modalSelector, timerShowModal) {
  const openModal = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  openModal.forEach((element) => {
    element.addEventListener("click", ()=>{showModal(modalSelector, timerShowModal)});
  });

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-closemodal") == "") {
      hideModal(modalSelector);
    }
  });

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      hideModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      showModal(modalSelector, timerShowModal);
      document.removeEventListener("scroll", showModalByScroll);
    }
  }
  document.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {showModal};
export {hideModal};
