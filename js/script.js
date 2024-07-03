import { appState } from "./appState.js";

// FAVS
const favsModal = document.querySelector(".favourite-products");
const favsCloseBtn = document.querySelector(".favs-closeBtn");
const toggleShowFavsBtn = document.querySelector(".favsToggleBtn");
const quantityEl = document.querySelector(".favourite-products__quantity");
const favouritesProductsContainer = document.querySelector(
  ".favourite-products__list"
);

const cartProductsAmount = document.querySelector(".cart-amount");
const favsProductsAmount = document.querySelector(".fav-amount");

const productsElements = document.getElementsByClassName("product");
const productsList = document.getElementsByClassName("products")[0];
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

const renderProducts = (data = appState.products) => {
  productsList.innerHTML = "";
  data.forEach((item) => {
    const productEl = document.createElement("div");
    productEl.classList.add("product");
    item.liked && productEl.classList.add("liked");
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

  [...productsElements].forEach((product) => {
    product.addEventListener("click", (e) => {
      const clickedEl = e.target;
      if (
        !clickedEl.classList.contains("add-to-favourite") &&
        !clickedEl.classList.contains("add-to-cart")
      ) {
        return;
      } else if (clickedEl.classList.contains("add-to-favourite")) {
        const currentProduct = clickedEl.closest(".product");
        currentProduct.classList.toggle("liked");
        const currentID = +currentProduct.id;
        addToFavourites(currentID);
      } else if (clickedEl.classList.contains("add-to-cart")) {
        const currentProduct = clickedEl.closest(".product");
        const currentID = +currentProduct.id;
        addToCart(currentID);
      }
    });
  });
};

// OGARNAC KOSZYK

renderProducts(appState.products);

const closeCartBtn = document.querySelector(".cart-closeBtn");
const openCartBtn = document.querySelector(".cart-products-btn");
const cart = document.querySelector(".cart");
const cartItemsContainer = document.querySelector(".cart__list-items");

openCartBtn.addEventListener("click", () => {
  cart.classList.toggle("show");
});

closeCartBtn.addEventListener("click", () => {
  cart.classList.remove("show");
});

const addToCart = (id) => {
  const foundEl = appState.products.find((el) => el.id === id);
  appState.cartProducts.push(foundEl);
  renderCartItems();
};

const renderCartItems = () => {
  cartItemsContainer.innerHTML = "";
  appState.cartProducts.forEach((cartProduct) => {
    const cartItemEl = document.createElement("li");
    cartItemEl.setAttribute("id", cartProduct.id);
    cartItemEl.classList.add("cart-item", "modal-item");
    cartItemEl.innerHTML = `<button
                    class="cart-item__deleteBtn user-modal-item__deleteBtn"
                    ><i class="fa-solid fa-xmark"></i
                  ></button>
                  <img
                    src=${cartProduct.img}
                    alt=${cartProduct.productTitle}
                    class="cart-item__img user-modal-item__img"
                  />
                  <div class="cart-item__content user-modal-item__content">
                    <h4
                      class="cart-item__product-name user-modal-item__product-name"
                      >${cartProduct.productTitle}</h4
                    >
                    <p
                      class="cart-item__product-price user-modal-item__product-price"
                      >$ ${cartProduct.productPrice}</p
                    >
                  </div>`;
    cartItemsContainer.insertAdjacentElement("afterbegin", cartItemEl);
  });
  console.log(appState.cartProducts);
};

const renderFavouriteProducts = (favProducts = appState.favProducts) => {
  favouritesProductsContainer.innerHTML = "";
  favProducts.forEach((favProd) => {
    const favProdEl = document.createElement("li");
    favProdEl.setAttribute("id", favProd.id);
    favProdEl.classList.add("favourite-products__item");
    favProdEl.classList.add("modal-item");
    favProdEl.innerHTML = `<button class="fav-deleteBtn user-modal-item__deleteBtn"
                    ><i class="fa-solid fa-xmark"></i
                  ></button><img
                    src=${favProd.img}
                    alt=${favProd.productTitle}
                    class="favourite-products__img  user-modal-item__img"
                  />
                  <div class="favourite-products__content user-modal-item__content">
                    <h4 class="favourite-products__product-name user-modal-item__product-name"
                      >${favProd.productTitle}</h4
                    >
                    <p class="favourite-products__product-price user-modal-item__product-price">$ ${favProd.productPrice}</p>
                  </div>
               `;
    favouritesProductsContainer.insertAdjacentElement("afterbegin", favProdEl);
  });
  if (appState.favProducts.length !== 0) {
    favsProductsAmount.textContent = `${appState.favProducts.length}`;
    favsProductsAmount.classList.add("show");
  } else {
    favsProductsAmount.classList.remove("show");
  }
  quantityEl.textContent = `Quantity: ${appState.favProducts.length}`;
};

favouritesProductsContainer.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (!clickedEl.classList.contains("fav-deleteBtn")) {
    return;
  }
  const favProduct = clickedEl.closest(".favourite-products__item");
  appState.favProducts = [
    ...appState.favProducts.filter((i) => i.id !== +favProduct.id),
  ];
  const foundEl = appState.products.find((item) => item.id === +favProduct.id);
  foundEl.liked = false;

  renderFavouriteProducts();
  renderProducts();
});

const addToFavourites = (id) => {
  const foundEl = appState.products.find((item) => item.id === id);
  foundEl.liked = !foundEl.liked;
  appState.favProducts = [
    ...appState.products.filter((prod) => prod.liked === true),
  ];
  renderFavouriteProducts(appState.favProducts);
};

favsCloseBtn.addEventListener("click", () => {
  favsModal.classList.remove("show");
});

toggleShowFavsBtn.addEventListener("click", () => {
  favsModal.classList.toggle("show");
});
