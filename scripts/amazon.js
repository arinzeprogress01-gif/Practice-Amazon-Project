import {cart, addToCart} from "../data/cart.js";
import {products } from "../data/products.js"

let productsHTML = '';

products.forEach((product) => {

    productsHTML +=  `
    <div Class="product-container">
          <div Class="product-image-container">
            <img Class="product-image"
              src="${product.image}">
          </div>

          <div Class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div Class="product-rating-container">
            <img Class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div Class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div Class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div Class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div Class="product-spacer"></div>

          <div Class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button Class="add-to-cart-button button-primary js-add-to-chart"
          data-product-id = "${product.id}}">
            Add to Cart
          </button>
        </div>
        `;
});



document.querySelector('.js-products-grid').innerHTML = productsHTML;


function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}


document.querySelectorAll('.js-add-to-chart')
  .forEach( (button) => {
    button.addEventListener('click', () => {

      const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();
    })
  })
  
