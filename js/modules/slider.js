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

export default slider;