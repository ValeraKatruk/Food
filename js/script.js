document.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

  // функции показ/скрытие контента Tabs

  function hideTabsContent() {
    tabsContent.forEach((element) => {
      element.classList.add("hide");
      element.classList.remove("show", "fade");
    });
    tabs.forEach((element) => {
      element.classList.remove("tabheader__item_active");
    });
  }

  function showTabsContent(numTab = 0) {
    tabsContent[numTab].classList.add("show", "fade");
    tabsContent[numTab].classList.remove("hide");

    tabs[numTab].classList.add("tabheader__item_active");
  }

  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, idx) => {
        if (tab == target) {
          hideTabsContent();
          showTabsContent(idx);
        }
      });
    }
  });

  // Timer

  const deadline = "2023-05-20";

  function getTimeRemain(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;
    if (t < 0) {
      days = hours = minutes = seconds = 0;
    } else {
      (days = Math.floor(t / 1000 / 60 / 60 / 24)),
        (hours = Math.floor((t / 1000 / 60 / 60) % 24)),
        (minutes = Math.floor((t / 1000 / 60) % 60)),
        (seconds = Math.floor((t / 1000) % 60));
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function setTimeClock(selector, endtime) {
    const clock = document.querySelector(selector),
      days = clock.querySelector("#days"),
      hours = clock.querySelector("#hours"),
      minutes = clock.querySelector("#minutes"),
      seconds = clock.querySelector("#seconds"),
      timerId = setInterval(updateTimeClock, 1000);

    updateTimeClock();

    function updateTimeClock() {
      const t = getTimeRemain(endtime);

      function getZero(num) {
        return num < 10 ? `0${num}` : num;
      }

      (days.textContent = getZero(t.days)),
        (hours.textContent = getZero(t.hours)),
        (minutes.textContent = getZero(t.minutes)),
        (seconds.textContent = getZero(t.seconds));

      if (endtime == t.total) clearInterval(timerId);
    }
  }
  setTimeClock(".timer", deadline);

  // MODAL

  const openModal = document.querySelectorAll("[data-openmodal]"),
    // closeModal = document.querySelector("[data-closemodal]"),
    modal = document.querySelector(".modal");

  function showModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }
  function hideModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
    clearTimeout(timerShowModal);
  }

  const timerShowModal = setTimeout(showModal, 50000); // вызывает модальное окно 50 сек

  openModal.forEach((element) => {
    element.addEventListener("click", showModal);
  });

  // closeModal.addEventListener("click", hideModal);

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-closemodal") == "") {
      hideModal();
    }
  });

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      hideModal();
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      showModal();
      document.removeEventListener("scroll", showModalByScroll);
    }
  }
  document.addEventListener("scroll", showModalByScroll);

  //Использование классов

  class MenuCard {
    constructor(src, alt, title, descr, price, parentCard) {
      (this.src = src),
        (this.alt = alt),
        (this.title = title),
        (this.descr = descr),
        (this.price = price),
        (this.parent = document.querySelector(parentCard)),
        (this.transfer = 80),
        this.changeToRub();
    }

    changeToRub() {
      this.price = this.price * this.transfer;
    }

    render() {
      const card = document.createElement("div");
      card.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
      </div>
      `;
      this.parent.append(card);
    }
  }

const getRecource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }
  return await res.json();
};

getRecource("http://localhost:3000/menu").then((data) => {
  data.forEach(({ img, altimg, title, descr, price }) => {
    new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  });
});

  //FORMS

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "/img/form/spinner.svg",
    succsess: "Спасибо, мы с Вами свяжемся!",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: data,
    });
    return await res.json();
  };

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
          console.log(data);
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
    showModal();

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
      hideModal();
    }, 1000);
  }

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));

  //end DOMContentLoaded
});

