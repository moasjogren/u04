const mainContainer = document.getElementById("main-container");
const filterButton = document.getElementById("filter-button");
const body = document.getElementById("body");
let showAll = [];
let filteredCategorys = [];
const modal = document.querySelector(".modal");
const openCard = document.getElementById("card");
let cardValue;
const modalContent = document.createElement("div");

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

    showAll = data.filter((obj) => filteredCategorys.includes(obj.category));

    // return item.category.includes(filteredCategorys);

    console.log(showAll);
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
    if (cardElement) {
      modal.classList.add("modal-show");
      cardValue = cardElement.getAttribute("value");
    }

    data.map((product) => {
      if (product.id == cardValue) {
        modalContent.innerHTML = `<div id="modal-content" class="modal-content">
        <h3>${product.title}</h3>
            <p>${product.description}</p>
            <button class="close-modal">Close</button>
          </div>`;
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
}
