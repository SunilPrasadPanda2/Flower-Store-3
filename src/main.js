let shop = document.getElementById("shop");

let basket = JSON.parse(sessionStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item ${search.item === 1 ? "hide" : null}">
        <img width="220" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2> ${price} </h2>
            <div class="buttons">
              <div id=${id} class="quantity xod">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <button class="add" onclick="increment(${id})">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
    generateShop();
  } else {
    return;
  }
  
  sessionStorage.setItem("data", JSON.stringify(basket));
};




let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
