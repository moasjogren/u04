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
const cartLogo = document.querySelector(".cart-logo")
const select = document.getElementById("select")

let selectedValue = "";

const priceRange = document.querySelector("#price-range");
const priceFilterDiv = document.getElementById('price-filter-div');
const selectElement = document.getElementById('select');

const shoppingCart = localStorage.shoppingCart
  ? [...JSON.parse(localStorage.shoppingCart)]
  : [];

let totalShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

cartCount.innerText = !localStorage.cartCount ? "Empty, Fucking buy something" : localStorage.getItem("cartCount");

filterButton.addEventListener("click", function () {
  
  /* selectedValue = null; */
  console.log("works", selectedValue)
  
    selectElement.removeAttribute('selected', true);
    selectElement.setAttribute('selected', true);

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

    showAll = data.filter((obj) => filteredCategorys.includes(obj.category));

    // return item.category.includes(filteredCategorys);


    if (showAll.length !== 0) {
      displayProducts(showAll);
      priceFilterDiv.style.display = "initial";
      selectElement.setAttribute('selected', true);

    } else {
      displayProducts(data);
      priceFilterDiv.style.display = "none";

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
        (product) => product.id === Number(event.target.closest(".card").getAttribute("value"))
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

      // const priceRange = document.querySelector("#price-range");
      // console.log(priceRange.value)

      // priceRange.addEventListener('change', () => {
      //   console.log('click');
      // });
      // Sortera efter pris


      // const compare = sortSelect.value === "newest" 
      // ? (a,b) => new Date(b.paymentDue) - new Date(a.paymentDue) 
      // : (a,b) => new Date(a.paymentDue) - new Date(b.paymentDue)
      
      //För att hämta och skriva totalen

      // const shoppingCart = Object.values(localStorage)

      // const total = shoppingCart.reduce((acc, curr) => {
      //   const prices = JSON.parse(curr)
      // return acc + prices.price},0)
      // console.log(total)
      ///////////////////////////////////////////

      // const totalPrice = JSON.parse(localStorage).reduce((acc, item) => {return acc + item.price},0 )

      // let newString = JSON.stringify(valueArray)
      // .replace(/[ [ () , "-]/g, " ")
      // .replace("]", " ");
      /*   localStorage.setItem(chosenCard[0].title, productInfo);
      localStorage.setItem(chosenCard[0].price, productInfo); */
      // data.map((product) => {
      //   if (product.id == document.querySelector(".card").getAttribute("value")) {
      //     localStorage.setItem(product.id, productInfo);
      //   };

      // });

      //cartCounter++
      //cartCount.innerHTML = cartCounter;

      totalShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
      console.log(totalShoppingCart.length);

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
        <h3>${product.title}</h3>
            <p>${product.description}</p>
            <button class="close-modal">Close</button>
          `;
        modal.appendChild(modalContent);
      }
    });

    body.addEventListener("click", function (event) {
      if (event.target && event.target.closest(".close-modal")) {
        modal.classList.remove("modal-show");
        modalContent.innerHTML = "";
      } else if (event.target && event.target.closest(".modal")) {
        modal.classList.remove("modal-show");
        modalContent.innerHTML = "";
      }
    });
  });
  
  
/* 
  priceRange.addEventListener('change', () => {
    selectedValue = priceRange.value;
    console.log(selectedValue)
    
    let sorted = [];

    if(showAll.length = 0) {
      sorted = data.sort((a, b) => {
        if(selectedValue === "low-to-high") {
          return a.price - b.price
        } else if(selectedValue === "high-to-low") {
          return b.price - a.price
        }
      });
    } else {
      sorted = showAll.sort((a, b) => {
        if(selectedValue === "low-to-high") {
          return a.price - b.price
        } else if(selectedValue === "high-to-low") {
          return b.price - a.price
        }
      });
    }
  
    displayProducts(sorted);
  }); */

  
};


priceRange.addEventListener('change', () => {
  selectedValue = priceRange.value;
  console.log(selectedValue)
  
  const sorted = showAll.sort((a, b) => {
    if(selectedValue === "low-to-high") {
      return a.price - b.price
    } else if(selectedValue === "high-to-low") {
      return b.price - a.price
    };
  });
  console.log(sorted);
  displayProducts(sorted);
});
