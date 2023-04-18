import { showModal, hideModal } from "./modal";
import { postData } from "../modules/services/services"

function createForms(formSelector, timerShowModal) {
  //FORMS

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "/img/form/spinner.svg",
    succsess: "Спасибо, мы с Вами свяжемся!",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          showThanksModal(message.succsess);
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    showModal('.modal',timerShowModal);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class='modal__content'>
        <div class='modal__title'>${message}</div>
        <div data-closemodal class='modal__close'></div>
      </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      hideModal('.modal');
    }, 2000);
  }

  fetch("http://localhost:3000/menu").then((data) => data.json());
}

export default createForms;
