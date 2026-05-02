export function showError(input, errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("active");
  input.classList.add("input-error");
}

export function clearError(input, errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("active");
  input.classList.remove("input-error");
}

export function clearAllErrors(fields) {
  fields.forEach(({ input, error }) => {
    clearError(input, error);
  });
}

