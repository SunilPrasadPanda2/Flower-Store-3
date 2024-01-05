let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(sessionStorage.getItem("data")) || [];
let cartBasket, reload;
if (sessionStorage.getItem("reload") == null) {
  cartBasket = [...basket];
  sessionStorage.setItem("cartData", JSON.stringify(cartBasket));
  sessionStorage.setItem("reload", 1);
} else {
  cartBasket = JSON.parse(sessionStorage.getItem("cartData"));
}

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (cartBasket.length !== 0) {
    return (ShoppingCart.innerHTML = cartBasket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                
              </h4>
              <button class="btn hide">Pay</button>
          </div>

          <div class="buttons ">
              <i onclick="decrement(${id})" class="bi bi-dash-lg hide"></i>
              <div id=${id} class="quantity hide">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg hide"></i>
          </div>

          <h3> ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let pay = (id) => {
  let selectedItem = id;

  cartBasket = cartBasket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  sessionStorage.setItem("cartData", JSON.stringify(cartBasket));
};

let clearCart = () => {
  basket = [];
  cartBasket = [];
  generateCartItems();
  sessionStorage.setItem("data", JSON.stringify(basket));
  sessionStorage.setItem("cartData", JSON.stringify(cartBasket));
};

let checkout = () => {
  cartBasket = [];
  // generateCartItems()
  sessionStorage.setItem("cartData", JSON.stringify(cartBasket));
  generateCartItems();
  label.innerHTML = `<h2>Congratualtions, You bought all the items</h2>
  <a href="index.html">
    <button class="HomeBtn">Back to home</button>
  </a>`
};

let TotalAmount = () => {
  if (cartBasket.length !== 0) {
    let amount = cartBasket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
    <h2>Total Bill : Rs ${amount}</h2>
    <button onclick="checkout()" class="checkout" >Pay</button>
    `;
  } else return;
};

TotalAmount();
