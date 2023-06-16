document.addEventListener('DOMContentLoaded', () => {
// Obtém referência ao botão "Pagar"
const pagarButton = document.getElementById("pagar");

// Obtém referência ao modal
const modal = document.getElementById("modal");

// Adiciona um evento de clique ao botão "Pagar"
pagarButton.addEventListener("click", function() {
  // Exibe o modal
  modal.style.display = "block";
});

// Fecha o modal quando o usuário clicar fora da área do modal
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Obtém referência aos botões do modal
const modalPixButton = document.getElementById("modal-pix");
const modalCartaoButton = document.getElementById("modal-cartao");

// Adiciona um evento de clique ao botão "PIX"
modalPixButton.addEventListener("click", function() {
  // Faça algo quando o usuário selecionar a opção PIX
  console.log("Opção selecionada: PIX");
  // Feche o modal
  modal.style.display = "none";
});

// Adiciona um evento de clique ao botão "Cartão de Crédito"
modalCartaoButton.addEventListener("click", function() {
  // Faça algo quando o usuário selecionar a opção Cartão de Crédito
  console.log("Opção selecionada: Cartão de Crédito");
  // Feche o modal
  modal.style.display = "none";
});
});

document.addEventListener('DOMContentLoaded', () => {


// Adicione este código abaixo do código existente no seu arquivo JavaScript

// Função para carregar e exibir o conteúdo de CheckoutCart.html dentro do modal
function openCheckoutModal() {
  const modalContent = document.getElementById("modal-content");

  fetch("CheckoutCart.html")
    .then((response) => response.text())
    .then((data) => {
      modalContent.innerHTML = data;
      // Exibir o modal
      openModal();
    })
    .catch((error) => {
      console.error("Error loading CheckoutCart.html:", error);
    });
}

// Função para exibir o modal
function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
}

// Adicione um evento de clique aos métodos de pagamento existentes
const paymentOptions = document.querySelectorAll(".payment-option");
paymentOptions.forEach((option) => {
  option.addEventListener("click", openCheckoutModal);
});


});
