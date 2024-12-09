const placeOrder = document.querySelector(".checkout-button")
const checkoutMessage = document.querySelector(".checkout-message-text")

placeOrder.addEventListener("click", function() {
    checkoutMessage.textContent = "Thank you for your purchase!"
})