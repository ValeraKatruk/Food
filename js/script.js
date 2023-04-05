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

  const timerShowModal = setTimeout(showModal, 5000);

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

  //end DOMContentLoaded
});
