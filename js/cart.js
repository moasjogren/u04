const placeOrder = document.querySelector(".checkout-button")
const checkoutMessage = document.querySelector(".checkout-message-text")
const data = localStorage.getItem("shoppingCart");
const finalCart = document.getElementById("final-cart")

const cartCount = document.querySelector(".cart-counter");
cartCount.innerText = !localStorage.cartCount ? "Empty, Fucking buy something" : localStorage.getItem("cartCount");

placeOrder.addEventListener("click", function() {
    checkoutMessage.textContent = "Thank you for your purchase!"
})





function displayShoppingCart() {
    finalCart.innerHTML = "";

    
    
//-------------för att göra nytt object med ammount--------//
//     let parsedData = JSON.parse(data);
//     const itemCount = {}
//     parsedData.forEach(item => {
//         if (itemCount[item.id]) {
//             itemCount[item.id].count++;
//           } else {
//             itemCount[item.id] = { ...item, count: 1 };
//           }
//     })

//     console.log(itemCount)
//    const shoppingCartarray = Array(...Object.values(itemCount))
//    shoppingCartarray.map((product) =>{
//     const item = document.createElement("div");
//     item.innerHTML = `${product.title} - ${product.price} X${product.count}` ;
//     finalCart.appendChild(item);
// });
//------------------------------------------------------------//

/*     let testCart = parsedData.filter((item, index) => {
        if(parsedData.includes(item)) {
            return parsedData.splice(index);
        };
    });
        
    console.log(testCart);

    testCart.map((product) =>{
        const item = document.createElement("div");
        item.innerHTML = `${product.title} - ${product.price}` ;
        finalCart.appendChild(item);
    }); */

//     const products = JSON.parse(data);

// const totatlPrice = products.reduce((acc, product) => acc + product.price,0)
// console.log(totatlPrice)
// const cart = products.

// reduce((acc, item) => {
//   if (!acc.includes(item.title)) {
//     acc.push(item.title);
  
 
//   }
//   return acc;
// }, []);

// console.log(cart)


// cart.map((item) => {
//  const test = document.createElement("div")
//  test.innerHTML = `${item}`;
//  finalCart.appendChild(test)

// })

 }
// function removeDuplicates(array) {
//     const filteredNumbers = array.filter((item, index) => array.indexOf(item) === index);
//     return filteredNumbers;
// }
// function removeDuplicates(array) {
//     return [...new Set(array)];
// }



displayShoppingCart();








// const cart = products.reduce((acc, item) => {
//     if (acc.includes(item.id)) {
    
//       acc.push(item.id);

//     }
//     return acc;
//   }, 0);
  
//   console.log(cart);

// let testOne = []

// let countProducts = 0;
//   function howManyProducts() {
//    products.forEach(id => {
//         countProducts++;
//         if(products.id === products.id){
            
//         testOne.push(products.id)
//         }
//    });

//   } 
// howManyProducts();
//   console.log(countProducts)
//   console.log(testOne)
