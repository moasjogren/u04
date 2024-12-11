const placeOrder = document.querySelector(".checkout-button");
const checkoutMessage = document.querySelector(".checkout-message-text");
const data = localStorage.getItem("shoppingCart");
const finalCart = document.getElementById("final-cart");

const cartCount = document.querySelector(".cart-counter");
cartCount.innerText = !localStorage.cartCount ? "Empty, fucking buy something" : localStorage.getItem("cartCount");

placeOrder.addEventListener("click", function () {
  checkoutMessage.textContent = "Thank you for your purchase!";
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

  console.log(itemCount);
  const shoppingCartarray = Array(...Object.values(itemCount));
  shoppingCartarray.map((product) => {
    const item = document.createElement("div");
    item.innerHTML = `${product.title} - ${product.price} X${product.count}`;
    finalCart.appendChild(item);
  });
  //------------------------------------------------------------//

  /*     let testCart = parsedData.filter((item, index) => {
        if(parsedData.includes(item)) {
            return parsedData.splice(index);
        };

    });

    console.log(itemCount);

    const shoppingCartarray = Array(...Object.values(itemCount))
    shoppingCartarray.map((product) =>{

        let displayPrice = ``;

        if (product.count == 1) {
            displayPrice = `$${product.price}`;
        } else if (product.count >= 2) {
            displayPrice = `$${(product.price * product.count)} ($${product.price} /each)`;
        };

        const item = document.createElement("div"); 
        item.innerHTML = `X${product.count} ${product.title} - ` + displayPrice;
        finalCart.appendChild(item);
    });
