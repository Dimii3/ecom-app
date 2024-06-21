import { products } from "./products.js";

// FAVS
let favourtiesProductsQuantity = 0;
const favsModal = document.querySelector(".favourite-products");
const favsCloseBtn = document.querySelector(".favs-closeBtn");
const toggleShowFavsBtn = document.querySelector(".favsToggleBtn");
const quantityEl = document.querySelector(".favourite-products__quantity");
const favouritesProductsContainer = document.querySelector(
  ".favourite-products__list"
);

const productsElements = document.getElementsByClassName("product");
const productsList = document.querySelector(".products");
// REVIEWS CAROUSEL
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

[...productsElements].forEach((product) => {
  product.addEventListener("click", (e) => {
    const clickedEl = e.target;
    if (!clickedEl.classList.contains("add-to-favourite")) {
      return;
    }
    const currentProduct = clickedEl.closest(".product");
    currentProduct.classList.toggle("liked");
    const currentID = +currentProduct.id;
    addToFavourites(currentID);
  });
});

const renderFavouriteProducts = (favProducts) => {
  favouritesProductsContainer.innerHTML = "";
  favProducts.forEach((favProd) => {
    const favProdEl = document.createElement("li");
    favProdEl.id = favProd.id;
    favProdEl.classList.add("favourite-products__item");
    favProdEl.innerHTML = `<img
                    src=${favProd.img}
                    alt=""
                    class="favourite-products__img"
                  />
                  <div class="favourite-products__content">
                    <h4 class="favourite-products__product-name"
                      >${favProd.productTitle}</h4
                    >
                    <p class="favourite-products__product-price">$ ${favProd.productPrice}</p>
                  </div>
               `;
    favouritesProductsContainer.insertAdjacentElement("afterbegin", favProdEl);
  });
};
let favouritesProducts = [];
const addToFavourites = (id) => {
  const foundEl = products.find((item) => item.id === id);
  foundEl.liked = !foundEl.liked;
  favouritesProducts = [...products.filter((prod) => prod.liked === true)];

  favourtiesProductsQuantity = favouritesProducts.length;
  quantityEl.textContent = `Quantity: ${favourtiesProductsQuantity}`;
  renderFavouriteProducts(favouritesProducts);
};

favsCloseBtn.addEventListener("click", () => {
  favsModal.classList.remove("show");
});

toggleShowFavsBtn.addEventListener("click", () => {
  favsModal.classList.toggle("show");
});
