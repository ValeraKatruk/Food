document.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

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

  //end DOMContentLoaded
});
