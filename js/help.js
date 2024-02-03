const openModal = () => {
    const modalText = document.getElementById("helpModalText");
    const modal = document.getElementById("helpModal");
    modalText.innerHTML = settings[levelIndex]["help"];
    modal.style.display = "flex";
};

const closeModal = () => {
    const modal = document.getElementById("helpModal");
    modal.style.display = "none";
};

function attachModalEventListeners() {
    const openButton = document.getElementById("helpBtn");
    const closeButton = document.getElementById("closeModal");
    openButton.addEventListener("click", () => {openModal()});
    closeButton.addEventListener("click", () => {closeModal()});
}

attachModalEventListeners();
