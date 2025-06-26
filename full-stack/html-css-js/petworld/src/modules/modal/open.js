const openModalButton = document.getElementById("new-schedule");
const modalOverlay = document.getElementById("overlay");

openModalButton.addEventListener("click", () => {
  modalOverlay.classList.remove("hide");
});