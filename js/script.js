import  tabs     from './modules/tabs';
import  modal    from './modules/modal';
import  timer    from './modules/timer';
import calculate from './modules/calculate';
import  cards   from './modules/cards';
import  forms    from './modules/forms';
import  slider   from './modules/slider';
import {showModal} from './modules/modal'

window.addEventListener("DOMContentLoaded", () => {

  const timerShowModal = setTimeout(()=>showModal(".modal", timerShowModal), 50000); // вызывает модальное окно 50 сек

  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  modal("[data-openmodal]", ".modal", timerShowModal);
  timer(".timer", '2023-05-20');
  calculate();
  cards();
  forms("form", timerShowModal);
  slider({
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