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
