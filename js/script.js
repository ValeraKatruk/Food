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

  // Modal

  const openModal = document.querySelectorAll("[data-openmodal]"),
    closeModal = document.querySelector("[data-closemodal]"),
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

  //const timerShowModal = setTimeout(showModal, 5000); // вызывает модальное окно 5 сек

  openModal.forEach((element) => {
    element.addEventListener("click", showModal);
  });

  closeModal.addEventListener("click", hideModal);

  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      hideModal();
    }
  });

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      hideModal();
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
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

  function menuCard() {
    new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      ".menu .container"
    ).render();
    new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      "Меню “Премиум”",
      "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
      15,
      ".menu .container"
    ).render();
    new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
      35,
      ".menu .container"
    ).render();
  }
  menuCard();

  //FORMS

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "Загрузка...",
    succsess: "Спасибо, мы с Вами свяжемся!",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    postForm(item);
  });

  function postForm(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open("POST", "server.php");

      request.setRequestHeader("Content-type", "aplication/json");
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener("load", () => {
        if (request.status == 200) {
          console.log(request.response);
          statusMessage.textContent = message.succsess;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }


  //end DOMContentLoaded
});
