document.addEventListener('DOMContentLoaded', function() {
  // Validação do campo de nome
  var nameInput = document.getElementById('name');
  nameInput.addEventListener('input', function() {
    var regex = /[^a-zA-Z\s]/g; // Expressão regular para encontrar caracteres não permitidos
    this.value = this.value.replace(regex, ''); // Remove os caracteres não permitidos
  });

  // Função para formatar o CPF
  function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    cpf = cpf.slice(0, 11); // Limita a quantidade máxima de caracteres para 14
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o ponto após os primeiros 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o ponto após os próximos 3 dígitos
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen e os últimos 2 dígitos
    return cpf;
  }

  // Função para validar o CPF
  function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    // Verifica os dígitos verificadores
    var sum = 0;
    var remainder;
    for (var i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (var j = 1; j <= 10; j++) {
      sum = sum + parseInt(cpf.substring(j - 1, j)) * (12 - j);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }
  
    // Função para formatar o número do cartão
    function formatCardNumber(cardNumber) {
      cardNumber = cardNumber.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      cardNumber = cardNumber.slice(0, 16); // Limita a quantidade máxima de caracteres para 16
      cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona um espaço a cada grupo de 4 dígitos
      return cardNumber;
    }
  
    // Função para formatar a validade do cartão
    function formatCardExpiry(cardExpiry) {
      cardExpiry = cardExpiry.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      cardExpiry = cardExpiry.slice(0, 4); // Limita a quantidade máxima de caracteres para 4
      cardExpiry = cardExpiry.replace(/(\d{2})(?=\d)/g, '$1/'); // Adiciona uma barra após os primeiros 2 dígitos
      return cardExpiry;
    }

  
    // Função para validar o número do cartão
    function validateCardNumber(cardNumber) {
      cardNumber = cardNumber.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      if (cardNumber.length !== 16) {
        return false;
      }
      // Restante da validação do número do cartão
      // ...
    }
  
    // Função para validar a validade do cartão
    function validateCardExpiry(cardExpiry) {
      cardExpiry = cardExpiry.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      if (cardExpiry.length !== 4) {
        return false;
      }
      // Restante da validação da validade do cartão
      // ...
    }
  
    // Função para validar o formulário de checkout
    function validateCheckoutForm(event) {
      event.preventDefault(); // Evita o envio do formulário
  
      // Validação do CPF
      const cpfInput = document.getElementById('CPF');
      const cpf = cpfInput.value;
      const isCPFValid = validateCPF(cpf);
      if (!isCPFValid) {
        alert('CPF inválido. Por favor, verifique o CPF.');
        cpfInput.focus();
        return;
      }
  
      // Validação do número do cartão
      const cardNumberInput = document.getElementById('card-number');
      const cardNumber = cardNumberInput.value;
      const isCardNumberValid = validateCardNumber(cardNumber);
      if (!isCardNumberValid) {
        alert('Número do cartão inválido. Por favor, verifique o número do cartão.');
        cardNumberInput.focus();
        return;
      }
  
      // Validação da validade do cartão
      const cardExpiryInput = document.getElementById('card-expiry');
      const cardExpiry = cardExpiryInput.value;
      const isCardExpiryValid = validateCardExpiry(cardExpiry);
      if (!isCardExpiryValid) {
        alert('Validade do cartão inválida. Por favor, verifique a validade do cartão.');
        cardExpiryInput.focus();
        return;
      }
  
      // Restante do código para enviar o formulário ou realizar outras ações
  
      // Exemplo:
      // checkoutForm.submit();
    }
  
    // Vincula a função de validação ao evento de envio do formulário
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', validateCheckoutForm);
  
    // Vincula as funções de formatação aos eventos de input dos campos
    const cpfInput = document.getElementById('CPF');
    cpfInput.addEventListener('input', function() {
      this.value = formatCPF(this.value);
    });
  
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', function() {
      this.value = formatCardNumber(this.value);
    });
  
    const cardExpiryInput = document.getElementById('card-expiry');
    cardExpiryInput.addEventListener('input', function() {
      this.value = formatCardExpiry(this.value);
    });
  });
  