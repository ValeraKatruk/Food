import {getRecource} from "../modules/services/services"

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

  getRecource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
  });
}

export default cards;
