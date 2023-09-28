// Cart Open Close
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Making Add To Cart
// Cart Working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making Function
function ready() {
  // Remove Item From Cart
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity Change
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add to Cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  loadCartItems();
}

// Remove Cart Item
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
  saveCartItems();
}
// Quantity Change
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
  saveCartItems();
}

// Add Cart Function
function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
  saveCartItems();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("You have already added this item to cart.");
      return;
    }
  }
  let cartBoxContent = `
  <img src=${productImg}" alt="" class="cart-img" />
<div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input
    type="number"
    name=""
    id=""
    value="1"
    class="cart-quantity"
  />
</div>
<!-- Remove Item -->
<i class="bx bx-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  saveCartItems();
}

// Update Total
function updatetotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  // If price contain some cents
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  //    Save Total to Local Storage
  localStorage.setItem("cartTotal", total);
}

// Keep Item in cart when page refresh with local storage.
function saveCartItems() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let cartItems = [];

  for (let i = 0; i < cartBoxes.length; i++) {
    cartBox = cartBoxes[i];
    let titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
    let priceElement = cart.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let productImg = cartBox.getElementsByClassName("cart-img")[0].src;

    let item = {
      title: titleElemnt.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    };
    cartItems.push(item);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// Loads  In Cart
function loadCartItems() {
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg);

      let cartBoxes = document.getElementsByClassName("cart-box");
      let cartBox = cartBoxes[cartBoxes.length - 1];
      let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      quantityElement.value = item.quantity;
    }
  }
  let cartTotal = localStorage.getItem("cartTotal");
  if (cartTotal) {
    document.getElementsByClassName("total-price")[0].innerText =
      "$" + cartTotal;
  }
}
