"use strict";

// Añade aquí tu correo real para activar el enlace de ayuda del footer.
const SUPPORT_EMAIL = "";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 999;
const quantityInput = document.getElementById("quantity");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const buyButton = document.getElementById("buy-button");
const purchaseForm = document.getElementById("purchase-form");
const purchaseResult = document.getElementById("purchase-result");

function normalizeQuantity(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(number)));
}

function updateQuantity(value) {
  const quantity = normalizeQuantity(value);
  quantityInput.value = String(quantity);
  decreaseButton.disabled = quantity <= MIN_QUANTITY;
  increaseButton.disabled = quantity >= MAX_QUANTITY;
  purchaseResult.replaceChildren();
}

function syncQuantityControls() {
  const number = Number(quantityInput.value);
  const valid = quantityInput.value.trim() !== "" && Number.isInteger(number)
    && number >= MIN_QUANTITY && number <= MAX_QUANTITY;
  buyButton.disabled = !valid;
  decreaseButton.disabled = !valid || number <= MIN_QUANTITY;
  increaseButton.disabled = !valid || number >= MAX_QUANTITY;
  purchaseResult.replaceChildren();
}

decreaseButton.addEventListener("click", () => {
  updateQuantity(Number(quantityInput.value) - 1);
  syncQuantityControls();
});

increaseButton.addEventListener("click", () => {
  updateQuantity(Number(quantityInput.value) + 1);
  syncQuantityControls();
});

quantityInput.addEventListener("input", syncQuantityControls);
quantityInput.addEventListener("change", () => {
  updateQuantity(quantityInput.value);
  syncQuantityControls();
});

purchaseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!purchaseForm.reportValidity() || buyButton.disabled) return;

  const quantity = normalizeQuantity(quantityInput.value);
  const title = document.createElement("strong");
  title.textContent = "Pago exitoso";
  const summary = document.createElement("p");
  summary.textContent = `${quantity} ${quantity === 1 ? "unidad seleccionada" : "unidades seleccionadas"} de Agua en polvo.`;
  const disclaimer = document.createElement("p");
  disclaimer.textContent = "Demostración: no se ha realizado ningún cobro ni pedido real.";
  purchaseResult.replaceChildren(title, summary, disclaimer);
});

const supportLink = document.getElementById("support-link");
const supportPending = document.getElementById("support-pending");
const supportDescription = document.getElementById("support-description");
const supportEmail = SUPPORT_EMAIL.trim();

if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(supportEmail)) {
  supportLink.href = `mailto:${supportEmail}?subject=${encodeURIComponent("Ayuda con Agua en polvo")}`;
  supportLink.hidden = false;
  supportPending.hidden = true;
  supportDescription.textContent = "Escríbenos y cuéntanos cómo podemos ayudarte. El enlace abrirá tu aplicación de correo.";
}

updateQuantity(MIN_QUANTITY);
syncQuantityControls();
