import { addProductRequest } from "./requests.js";
import { validateProduct } from "./validation.js";
import { showError, clearError, clearAllErrors } from "./ui.js";

const addBtn = document.getElementById("add-btn");

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");

const nameError = document.getElementById("name-error");
const priceError = document.getElementById("price-error");

const successMessage = document.getElementById("success-message");

const fields = [
  { input: nameInput, error: nameError },
  { input: priceInput, error: priceError },
];

async function addProduct(event) {
  event.preventDefault();

  successMessage.classList.add("hidden");

  const name = nameInput.value.trim();

  clearAllErrors(fields);

  const { errors, price } = validateProduct(name, priceInput.value);

  if (errors.name) {
    showError(nameInput, nameError, errors.name);
  }

  if (errors.price) {
    showError(priceInput, priceError, errors.price);
  }

  if (errors.name || errors.price) return;

  try {
    await addProductRequest({ name, price });

    nameInput.value = "";
    priceInput.value = "";

    successMessage.classList.remove("hidden");
    nameInput.focus();
  } catch (err) {
    successMessage.classList.add("hidden");
    showError(nameInput, nameError, err.message);
  }
}

function handleNameInput() {
  clearError(nameInput, nameError);
  successMessage.classList.add("hidden");
}

function handlePriceInput() {
  clearError(priceInput, priceError);
  successMessage.classList.add("hidden");
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    addProduct(event);
  }
}

addBtn.addEventListener("click", addProduct);
nameInput.addEventListener("input", handleNameInput);
priceInput.addEventListener("input", handlePriceInput);
priceInput.addEventListener("keydown", handleEnterKey);