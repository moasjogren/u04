
const mainContainer = document.getElementById("main-container")


async function getProducts() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("HTTP" + response.status);
      }
      const data = await response.json();

      displayProducts(data)

    } catch (error) {
      console.log(error);
    }
  }


  getProducts()


  function displayProducts(data) {
    //data.forEach
    console.log(data[1])
    const products = data.map((product) => {
  let limitedText = product.description.substring(0,100)
  let limitedTitle = product.title.substring(0,60)
    const card = document.createElement("div")
    card.innerHTML = `
        <div id="card" class="card">
   <div class="card-image"> <img class="image" src="${product.image}" alt=""></div>
   <section class="card-text">
    <h3 class="card-title" >${limitedTitle}</h3>
    <p class="card-description" >${limitedText}...</p>
  
   </section>
   <footer class="card-footer">
    <p class="card-price">$${product.price}</p>
    <button class="card-button" >Add to cart +</button>
   </footer>
    </div>
    `
    mainContainer.appendChild(card)
   
    });

}

