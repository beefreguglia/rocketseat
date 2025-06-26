const modalOverlay = document.getElementById("overlay");
const closeButton = document.getElementById("close");

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.add("hide");
  }
})

closeButton.addEventListener("click", () => {
  modalOverlay.classList.add("hide");
});