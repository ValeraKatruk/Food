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

export default calc;