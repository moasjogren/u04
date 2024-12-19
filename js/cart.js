const placeOrder = document.querySelector(".checkout-button");
const checkoutMessage = document.querySelector(".checkout-message-text");
const data = localStorage.getItem("shoppingCart");
const finalCart = document.getElementById("final-cart");
const cartCount = document.querySelector(".cart-counter");
const totalPrices = document.getElementById("total-price");

cartCount.innerText = !localStorage.cartCount ? "0" : localStorage.getItem("cartCount");
const clearCartBtn = document.getElementById("clear-cart-btn");

placeOrder.addEventListener("click", function () {
  checkoutMessage.textContent = "Thank you for your purchase! Please buy more next time :) ";

  gtag('event', 'button_click', {
    'event_category': 'checkout',
    'event_label': 'checkout-btn-clicks',
    'value': 1,
    'debug_mode': true
  });
});

function displayShoppingCart() {
  finalCart.innerHTML = "";
  let parsedData = JSON.parse(data);
  if (parsedData != null) {
    const itemCount = {};
    parsedData.forEach((item) => {
      if (itemCount[item.id]) {
        itemCount[item.id].count++;
      } else {
        itemCount[item.id] = { ...item, count: 1 };
      }
    });

    const shoppingCartarray = Array(...Object.values(itemCount));
    shoppingCartarray.map((product) => {
      let displayPrice = ``;

      if (product.count == 1) {
        displayPrice = `$${product.price}`;
      } else if (product.count >= 2) {
        displayPrice = `$${product.price * product.count} ($${product.price} /each)`;
      }

      const item = document.createElement("div");
      item.innerHTML = `<img src="${product.image}" alt="product-image" height="40px"> <p>X${product.count} ${product.title} - 
        ${displayPrice} </p>`;
      finalCart.appendChild(item);
    });
    const products = JSON.parse(data);
    const totatlPrice = products.reduce((acc, product) => acc + product.price, 0);
    totalPrices.innerHTML = `$${totatlPrice.toFixed(2)}`;

    clearCartBtn.style.display = "block";
  } else {
    clearCartBtn.style.display = "none";
  }
}

displayShoppingCart();

clearCartBtn.addEventListener("click", () => {
  localStorage.clear();
  finalCart.innerHTML = "";
  totalPrices.innerHTML = "Shopping cart empty.";
  cartCount.innerHTML = "0";
  clearCartBtn.style.display = "none";
});
