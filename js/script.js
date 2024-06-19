import { products } from "./products.js";

// REVIEWS CAROUSEL
const favouritesProducts = [];
const productsList = document.querySelector(".products");
const controls = document.querySelector(".controls");
const reviewsContainer = document.querySelector(".reviews");

//   CLEAR ACTIVE
const clearActiveButtons = () => {
  controlsButtons.forEach((btn) =>
    btn.classList.remove("controls__review--active")
  );
};

const controlsButtons = [...controls.children];
controlsButtons.forEach((controlBtn, index) => {
  controlBtn.addEventListener("click", () => {
    clearActiveButtons();
    reviewsContainer.style.transform = `translateX(-${40 * index}rem)`;
    controlBtn.classList.add("controls__review--active");
  });
});

const renderProducts = (data) => {
  data.forEach((item) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    productEl.id = item.id;
    productEl.innerHTML = `
<div class="product__img">
  <button class="add-to-favourite">
    <i class="fa-regular fa-heart product__liked"></i>
  </button>
  <img
    src=${item.img}
    alt="shoes"
    loading="lazy"
  />
</div>
<div class="product__content">
  <div class="product__description">
    <h3 class="product__title">${item.productTitle}</h3>
    <p class="product__price">$ ${item.productPrice}</p>
  </div>
  <button class="add-to-cart btn">Add to cart</button>
</div>
`;
    productsList.insertAdjacentElement("afterbegin", productEl);
  });
};

renderProducts(products);

const addToFavourites = (id) => {};
