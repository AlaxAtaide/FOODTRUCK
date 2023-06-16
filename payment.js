document.getElementById('pay-button').addEventListener('click', function() {
  var name = document.getElementById('name').value;
  var cpf = document.getElementById('CPF').value;
  var cardNumber = document.getElementById('card-number').value;
  var cardExpiry = document.getElementById('card-expiry').value;
  var cvv = document.getElementById('cvv').value;

  // Configurar os detalhes do pagamento
  var paymentData = {
    cardNumber: cardNumber,
    cardExpirationMonth: cardExpiry.split('/')[0],
    cardExpirationYear: cardExpiry.split('/')[1],
    cardholderName: name,
    cardholderIdentification: {
      type: 'CPF',
      number: cpf
    },
    securityCode: cvv,
    transactionAmount: parseFloat(document.getElementById('cost-value').textContent),
    installments: 1, // Defina o número de parcelas desejado
    paymentMethodId: '', // ID do método de pagamento selecionado (será preenchido posteriormente)
    issuerId: null // ID do emissor do cartão (será preenchido posteriormente)
  };

  // Chamar a API do Mercado Pago para criar o token do cartão de crédito
  Mercadopago.createToken(paymentData, function(result, error) {
    if (error) {
      console.error('Erro ao obter o token do cartão:', error);
    } else {
      var token = result.id;

      // Preencher o token do cartão no objeto paymentData
      paymentData.token = token;

      // Chamar a API do Mercado Pago para processar o pagamento
      Mercadopago.payment.create(paymentData, function(result, error) {
        if (error) {
          console.error('Erro ao processar o pagamento:', error);
        } else {
          console.log('Pagamento processado com sucesso:', result);
          // Redirecionar o usuário para a página de sucesso ou exibir uma mensagem de confirmação
        }
      });
    }
  });
});
