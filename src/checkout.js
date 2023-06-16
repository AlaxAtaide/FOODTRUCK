// Função para carregar e exibir o conteúdo de CheckoutCart.html no modal de checkout
function openCheckoutModal(paymentMethod) {
  const checkoutModal = document.getElementById("checkout-modal");
  const selectedPaymentMethod = document.getElementById("selected-payment-method");
  const checkoutIframe = document.getElementById("checkout-iframe");
  const modalOverlay = document.getElementById("modal-overlay");

  selectedPaymentMethod.textContent = paymentMethod;
  checkoutIframe.src = "CheckoutCart.html";
  checkoutModal.style.display = "block";
  modalOverlay.style.display = "block";
}

// Função para fechar o modal de checkout
function closeModal() {
  const checkoutModal = document.getElementById("checkout-modal");
  const modalOverlay = document.getElementById("modal-overlay");

  checkoutModal.style.display = "none";
  modalOverlay.style.display = "none";
}
