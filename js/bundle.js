/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculate.js":
/*!*********************************!*\
  !*** ./js/modules/calculate.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
  //CALCULETE

  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;
  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = "1.375";
    localStorage.setItem("ratio", "1.375");
  }  

  
  function calculatingResult() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex == "female") {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    }
    if (sex == "male") {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  calculatingResult();

  function settingLocalStorage(selector, classActive){
    const elements = document.querySelectorAll(selector);

    elements.forEach((element)=>{
      element.classList.remove(classActive);
      if(element.getAttribute('id') === localStorage.getItem('sex')){
        element.classList.add(classActive);
      } 
      if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        element.classList.add(classActive);
      }
    });
  }
  settingLocalStorage("#gender div", "calculating__choose-item_active");
  settingLocalStorage(".calculating__choose_big div", "calculating__choose-item_active");

  function getStaticValue(selector, classActive) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (event) => {
        const target = event.target;

        if (target.getAttribute("data-ratio")) {
          ratio = +target.getAttribute("data-ratio");
          localStorage.setItem("ratio",  +target.getAttribute("data-ratio"))
        } else {
          sex = target.getAttribute("id");
          localStorage.setItem("sex", target.getAttribute("id"))
        }

        elements.forEach((element) => {
          element.classList.remove(classActive);
        });

        target.classList.add(classActive);
        calculatingResult();
      });
    });    
  }
  getStaticValue("#gender div" , "calculating__choose-item_active");
  getStaticValue(".calculating__choose_big div", "calculating__choose-item_active");

  function getDynamicValue(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {

      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red'
      }else if(input.value.match(/\d/g)){
        input.style.border = '1px solid #54ed39'
      }else{
        input.style.border = 'none'
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calculatingResult();
    });
    
  }
  getDynamicValue("#height");
  getDynamicValue("#weight");
  getDynamicValue("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/services/services */ "./js/modules/services/services.js");


function cards() {
  //Использование классов

  class MenuCard {
    constructor(src, alt, title, descr, price, parentCard) {
      this.src = src,
      this.alt = alt,
      this.title = title,
      this.descr = descr,
      this.price = price,
      this.parent = document.querySelector(parentCard),
      this.transfer = 80,
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

  (0,_modules_services_services__WEBPACK_IMPORTED_MODULE_0__.getRecource)("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/services/services */ "./js/modules/services/services.js");



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

      (0,_modules_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal',timerShowModal);

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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
    }, 2000);
  }

  fetch("http://localhost:3000/menu").then((data) => data.json());
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createForms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRecource": () => (/* binding */ getRecource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: data,
  });
  return await res.json();
};

async function getRecource(url) {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status ${res.status}`);
  }
  return await res.json();
};




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, currentTotal, currentCount, wrapper, field}){
    // SLIDE and COUNTER
 
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prevSlider = document.querySelector(prevArrow),
        nextSlider = document.querySelector(nextArrow),
        total = document.querySelector(currentTotal),
        current = document.querySelector(currentCount),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideCount = 1;
  let offset = 0;
  function valueTotal(n) {
    +n < 10 ? (total.innerHTML = `0${n}`) : (total.innerHTML = n);
  }
  valueTotal(slides.length);

  function currentSlide(n) {
    n < 10
      ? current.innerHTML = `0${slideCount}`
      : current.innerHTML = slideCount;

    doters.forEach((dot) => {
      dot.style.opacity = "0.5";
      dot.style.backgroundColor = "#fff";
    });
    doters[slideCount - 1].style.opacity = "1";
    doters[slideCount - 1].style.backgroundColor = "#9979df";
  }

  slidesField.style.width = slides.length * 100 + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  nextSlider.addEventListener("click", () => {
    if (offset == numberFromString(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += numberFromString(width);
    }

    slideCount < slides.length ? currentSlide(slideCount++) : currentSlide(slideCount = 1);

    slidesField.style.transform = `translateX(-${offset}px)`;
  });

  prevSlider.addEventListener("click", () => {
    if (offset == 0) {
      offset = numberFromString(width) * (slides.length - 1);
    } else {
      offset -= numberFromString(width);
    }

    slideCount == 1 ? currentSlide(slideCount = slides.length) : currentSlide(slideCount--);

    slidesField.style.transform = `translateX(-${offset}px)`;
  });

   //DOTERS SLIDE
  
   slider.style.position = "relative";

   const doters = [],
     indicators = document.createElement("ol");
   indicators.classList.add("carousel-indicators");
   slider.append(indicators);
 
   for (let i = 0; i < slides.length; i++) {
     const dot = document.createElement("li");
     dot.setAttribute("data-slide-to", i + 1);
     dot.classList.add("dot");
     indicators.append(dot);
     doters.push(dot);
   }
 
   currentSlide(slideCount);
 
   doters.forEach((dot) => {
     dot.addEventListener("click", (event) => {
       const dataSlideTo = event.target.getAttribute("data-slide-to");
       slideCount = dataSlideTo;
       offset = numberFromString(width) * (dataSlideTo - 1);
       slidesField.style.transform = `translateX(-${offset}px)`;
       currentSlide(slideCount);
     });
   });
 
   function numberFromString(str) {
     return +str.replace(/\D/g, "");
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContantSelector, tabsParentSelector, activeClass) {
  // функции показ/скрытие контента Tabs

  const tabsParent = document.querySelector(tabsParentSelector),
    tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContantSelector);

  function hideTabsContent() {
    tabsContent.forEach((element) => {
      element.classList.add("hide");
      element.classList.remove("show", "fade");
    });
    tabs.forEach((element) => {
      element.classList.remove(activeClass);
    });
  }

  function showTabsContent(numTab = 0) {
    tabsContent[numTab].classList.add("show", "fade");
    tabsContent[numTab].classList.remove("hide");

    tabs[numTab].classList.add(activeClass);
  }
  hideTabsContent();
  showTabsContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tab, idx) => {
        if (tab == target) {
          hideTabsContent();
          showTabsContent(idx);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timerModal(id, deadline){
  // Timer

  function getTimeRemain(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;
    if (t < 0) {
      days = hours = minutes = seconds = 0;
    } else {
      days = Math.floor(t / 1000 / 60 / 60 / 24),
      hours = Math.floor((t / 1000 / 60 / 60) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
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
  setTimeClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timerModal);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calculate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calculate */ "./js/modules/calculate.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", () => {

  const timerShowModal = setTimeout(()=>(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)(".modal", timerShowModal), 50000); // вызывает модальное окно 50 сек

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-openmodal]", ".modal", timerShowModal);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", '2023-05-20');
  (0,_modules_calculate__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", timerShowModal);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
     container: ".offer__slider",
     slide: ".offer__slide",
     nextArrow: ".offer__slider-next",
     prevArrow: ".offer__slider-prev",
     currentTotal: "#total",
     currentCount: "#current",
     wrapper: ".offer__slider-wrapper",
     field: ".offer__slider-inner"
  });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map