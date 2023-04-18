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

export default tabs;