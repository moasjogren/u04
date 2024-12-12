const mainContainer = document.getElementById("main-container");
const filterButton = document.getElementById("filter-button");
const body = document.getElementById("body");
let showAll = [];
let filteredCategorys = [];
const modal = document.querySelector(".modal");
const openCard = document.getElementById("card");
let cardValue;
const modalContent = document.createElement("div");
let cartCounter = 0;
const cartCount = document.querySelector(".cart-counter");
const cartLogo = document.querySelector(".cart-logo");
const searchValue = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

const shoppingCart = localStorage.shoppingCart
  ? [...JSON.parse(localStorage.shoppingCart)]
  : [];

let totalShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

cartCount.innerText = !localStorage.cartCount
  ? "Empty, Fucking buy something"
  : localStorage.getItem("cartCount");

filterButton.addEventListener("click", function () {
  document.querySelectorAll("input").forEach((item) => {
    if (item.checked) {
      filteredCategorys.push(item.value);
    }
  });
  getProducts();
});

async function getProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("HTTP" + response.status);
    }
    const data = await response.json();

    searchBtn.addEventListener("click", () => {
      const searchWord = searchValue.value.toLowerCase();

      if (searchValue.value) {
        showAll = data.filter((obj) => {
          obj.title = obj.title.toLowerCase();

          if (obj.title.includes(searchWord)) {
            obj.title =
              obj.title.split("")[0].toUpperCase() +
              obj.title.slice(1, obj.title.length);
            console.log(showAll);
            return obj;
          } else {
            return;
          }
        });
        displayProducts(showAll);
      } else {
        return;
      }
      searchValue.value = "";
    });

    showAll = data.filter((obj) => filteredCategorys.includes(obj.category));

    if (showAll.length !== 0) {
      displayProducts(showAll);
    } else {
      displayProducts(data);
    }
  } catch (error) {
    console.log(error);
  }
}

getProducts();

function displayProducts(data) {
  mainContainer.innerHTML = "";
  filteredCategorys = [];
  data.map((product) => {
    let limitedText = product.description.substring(0, 100);
    let limitedTitle = product.title.substring(0, 60);
    const card = document.createElement("div");
    card.innerHTML = `
        <div value=${product.id} id="card" class="card">
    <div class="card-image"> <img class="image" src="${product.image}" alt=""></div>
    <section class="card-text">
      <h3 class="card-title" >${limitedTitle}</h3>
      <p class="card-description" >${limitedText}...</p>
    </section>
    <footer class="card-footer">
      <p class="card-price">$${product.price}</p>
      <button class="card-button" >Add to cart</button>
    </footer>
      </div>
  `;
    mainContainer.appendChild(card);
  });
  mainContainer.addEventListener("click", function (event) {
    const cardElement = event.target.closest(".card");
    if (event.target.closest(".card-button")) {
      const chosenCard = data.filter(
        (product) =>
          product.id ===
          Number(event.target.closest(".card").getAttribute("value"))
      );

      const productInfo = {
        id: "",
        title: "",
        image: "",
        price: 0,
      };

      productInfo.id = chosenCard[0].id;
      productInfo.title = chosenCard[0].title;
      productInfo.image = chosenCard[0].image;
      productInfo.price = chosenCard[0].price;

      shoppingCart.push(productInfo);
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      cartLogo.classList.add("animate");

      setTimeout(() => {
        cartLogo.classList.remove("animate");
      }, 800);

      totalShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

      localStorage.setItem("cartCount", totalShoppingCart.length);

      cartCount.innerText = localStorage.getItem("cartCount");
    } else if (cardElement) {
      modal.classList.add("modal-show");
      cardValue = cardElement.getAttribute("value");
    }

    data.map((product) => {
      if (product.id == cardValue) {
        modalContent.classList.add("modal-content");
        modalContent.innerHTML = `
        <img class="modal-image" src="${product.image}" alt="product image">
        <h3 class="modal-title">${product.title}</h3>
            <p>${product.description}</p>
            <button class="close-modal">Close</button>
          `;
        modal.appendChild(modalContent);
      }
    });

    modal.addEventListener("click", function (event) {
      if (event.target && event.target.closest(".close-modal")) {
        modal.classList.remove("modal-show");
        modalContent.innerHTML = "";
      } else if (event.target === modal) {
        modal.classList.remove("modal-show");
        modalContent.innerHTML = "";
      }
    });
  });
}
