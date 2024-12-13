const placeOrder = document.querySelector(".checkout-button");
const checkoutMessage = document.querySelector(".checkout-message-text");
const data = localStorage.getItem("shoppingCart");
const finalCart = document.getElementById("final-cart");
const cartCount = document.querySelector(".cart-counter");
cartCount.innerText = !localStorage.cartCount ? "Empty, fucking buy something" : localStorage.getItem("cartCount");

placeOrder.addEventListener("click", function () {
  checkoutMessage.textContent = "Thank you for your purchase! Please buy more next time :) ";
});

function displayShoppingCart() {
  finalCart.innerHTML = "";

  //-------------för att göra nytt object med ammount--------//
  let parsedData = JSON.parse(data);
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
  const totalPrices = document.getElementById("total-price");
  totalPrices.innerHTML = `$${totatlPrice.toFixed(2)}`;
}

displayShoppingCart();

// Kommentar för ny PR
