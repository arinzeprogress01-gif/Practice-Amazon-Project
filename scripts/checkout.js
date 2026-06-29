import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {

        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    if (!matchingProduct) {
        console.error(`No product found for ID: ${productId}`);
        return;
    }

    cartSummaryHTML += `

    <div Class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div Class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div Class="cart-item-details-grid">
        <img Class="product-image" src="${matchingProduct.image}">

        <div Class="cart-item-details">
            <div Class="product-name">
            ${matchingProduct.name}
            </div>
            <div Class="product-price">
            ${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div Class="product-quantity">
            <span>
                Quantity: <span Class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span Class="update-quantity-link link-primary">
                Update
            </span>
            <span Class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">
                Delete
            </span>
            </div>
        </div>

        <div Class="delivery-options">
            <div Class="delivery-options-title">
            Choose a delivery option:
            </div>
            <div Class="delivery-option">
            <input type="radio" checked Class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div Class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div Class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div Class="delivery-option">
            <input type="radio" Class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div Class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div Class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div Class="delivery-option">
            <input type="radio" Class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
                <div Class="delivery-option-date">
                Monday, June 13
                </div>
                <div Class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
})

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            
            const productId = link.dataset.productId
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.remove();
        })
    })