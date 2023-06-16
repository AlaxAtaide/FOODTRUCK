

// Efeito Underline na página ativa (Underline Effect in the active page)
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
const menuLength = menuItems.length;

for (let i = 0; i < menuLength; i++) {
  if (menuItems[i].href === currentLocation) {
    menuItems[i].classList.add('active');
  }
}

// Efeito Modo Noturno (DARK MODE)
const header = document.querySelector('.body'); 
const icon = document.querySelector('.icon-js');


// Verifica o modo ativo pelo usuário a última vez que entrou
window.addEventListener('load', () => {
  const header = document.querySelector('.body'); 
  const icon = document.querySelector('.icon-js');

// Verifica o valor armazenado no localStorage (Dessa forma será aplicado entre light/dark em todas as páginas ao apertar o botão)
  if (localStorage.getItem('modoNoturno') === 'ativado') {
    header.classList.add('dark'); // Aplicar estilo de modo noturno
  }

  icon.addEventListener('click', () => {
    header.classList.toggle('dark');
    if (header.classList.contains('dark')) {
      localStorage.setItem('modoNoturno', 'ativado'); // Armazenar estado do modo noturno no localStorage
    } else {
      localStorage.removeItem('modoNoturno'); // Remover estado do modo noturno do localStorage
    }
  });
});


// INICIO DO BACK-END DO SITE

// CARRINHO DE COMPRA (SHOPPING CAR)

// Garante que o DOM tenha sido carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
  // Cria o seletor do elemento (button)
  let carts = document.querySelectorAll('.button');

  // Seletor dos elementos de produtos (neste exemplo, assumindo que cada produto tem a classe 'product')
  let products = document.querySelectorAll('.card');

  let productsData = []; // Array para armazenar os dados dos produtos

  // Itera sobre os elementos de produtos para extrair os dados
  products.forEach(product => {
    let name = product.querySelector('.name').textContent; // Nome do produto
    let desc = product.querySelector('.desc').textContent; // Descrição (tag) do produto
    let price = parseInt(product.querySelector('.price').textContent); // Preço do produto (convertido para número)
    let tag = product.querySelector('img').getAttribute('src'); // Recebe o nome da imagem do produto


  // Formata o preço com o símbolo de moeda "R$" e dois dígitos após a vírgula
    let formattedPrice = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Atualiza o elemento HTML com o preço formatado
    product.querySelector('.price').textContent = formattedPrice;


// Armazene o nome da imagem no objeto "productData"
let productData = {
  name: name,
  desc: desc,
  price: price,
  inCart: 0,
  tag: tag
};



    // Adiciona o objeto de dados do produto ao array
    productsData.push(productData);
  });

  
    // Loop para ir de 0 até a quantidade de elementos (cards) da minha página
  for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
      cartNumbers(productsData[i]); 
      custoTotal(productsData[i])
    })
  }

  // Função para atualizar o número de itens no carrinho quando a página é carregada
  function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    // Verifica se há itens no carrinho no localStorage
    if (productNumbers) {
      document.querySelector('.qtdcart').textContent = productNumbers;
      document.querySelector('.qtdcarrinho').textContent = productNumbers;

      // Atualiza a visibilidade do elemento .qtdcart e .qtdcarrinho
      if (parseInt(productNumbers) > 0) {
        document.querySelector('.qtdcart').style.visibility = 'visible';
        document.querySelector('.qtdcarrinho').style.visibility = 'visible';
      } else {
        document.querySelector('.qtdcart').style.visibility = 'hidden';
        document.querySelector('.qtdcarrinho').style.visibility = 'hidden';
      }
    }
  }

  // Chama a função onLoadCartNumbers() para atualizar a contagem de itens no carrinho
  onLoadCartNumbers();

  
  function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
  
    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.qtdcart').textContent = productNumbers + 1;
      document.querySelector('.qtdcarrinho').textContent = productNumbers + 1; // Adiciona esta linha para atualizar também a classe .qtdcarrinho
    } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.qtdcart').textContent = 1;
      document.querySelector('.qtdcarrinho').textContent = 1; // Adiciona esta linha para atualizar também a classe .qtdcarrinho
    }
  
    // Atualiza a visibilidade do elemento .qtdcart e .qtdcarrinho
    if (parseInt(localStorage.getItem('cartNumbers')) > 0) {
      document.querySelector('.qtdcart').style.visibility = 'visible';
      document.querySelector('.qtdcarrinho').style.visibility = 'visible'; // Adiciona esta linha para atualizar também a classe .qtdcarrinho
    } else {
      document.querySelector('.qtdcart').style.visibility = 'hidden';
      document.querySelector('.qtdcarrinho').style.visibility = 'hidden'; // Adiciona esta linha para atualizar também a classe .qtdcarrinho
    }
  
  

    setItems(product);

    function setItems(product) {
      let cartItems = localStorage.getItem('productsInCart')
      cartItems = JSON.parse(cartItems)


      if(cartItems != null) {

        if(cartItems[product.name] == undefined) {
          cartItems = {
            ...cartItems,
            [product.name]: product
          }
        }
        cartItems[product.name].inCart += 1;
      } else {
        product.inCart = 1;
        cartItems = {
          [product.name]: product
        }
      }


    
      localStorage.setItem("productsInCart", JSON.stringify
      (cartItems));
    }

  }

  function custoTotal(product) {
    let cartCusto = localStorage.getItem('custoTotal');
    
    if (cartCusto != null) {
      cartCusto = parseInt(cartCusto);
      localStorage.setItem("custoTotal", cartCusto + product.price);
    } else {
      localStorage.setItem("custoTotal", product.price);
    }
    
    // Atualiza o elemento HTML com o valor do custo total
    let cartTotal = document.querySelector('.basketTotal');
    if (cartTotal) {
      cartTotal.textContent = `R$ ${localStorage.getItem('custoTotal')},00`;
    }
    
  }
  

  function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
  
    let productContainer = document.querySelector(".products");
    let cartCusto = localStorage.getItem('custoTotal');
  
    if (cartItems && productContainer) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
          <tr class="product">
            <td class="product-info">
              <ion-icon name="close-circle" class="close" data-name="${item.name}"></ion-icon>
              <div class="product-details">
                <img src="./${item.tag}">
                <div class="product-name">${item.name}</div>
              </div>
            </td>
            <td class="pricer">${item.price},00</td>
            <td class="quantity">
              <ion-icon class="decrease" data-name="${item.name}" name="caret-back-circle"></ion-icon>
              <span>${item.inCart}</span>
              <ion-icon class="increase" data-name="${item.name}" name="caret-forward-circle"></ion-icon>
            </td>
            <td class="total">
              R$${item.inCart * item.price},00
            </td>
          </tr>
        `;
      });
  
      productContainer.innerHTML += `
        <tr class="basketTotalContainer">
          <td class="basketTotalTittle" colspan="3">
            Custo Total:
          </td>
          <td class="basketTotal">
            R$ ${cartCusto},00
          </td>
        </tr>
      `;
  
      // Seleciona todos os botões de diminuir quantidade
      let decreaseButtons = document.querySelectorAll('.decrease');
  
      // Adiciona um evento de clique para cada botão
      decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
          let productName = button.getAttribute('data-name');
          let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
          let cartCost = parseInt(localStorage.getItem('custoTotal'));
  
          // Se o produto tiver mais de 1 item no carrinho
          if (cartItems[productName].inCart > 1) {
            cartItems[productName].inCart -= 1;
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            localStorage.setItem('custoTotal', cartCost - cartItems[productName].price);
            displayCart();
            updateCartTotal();
          }
        });
      });
  
      // Seleciona todos os botões de aumentar quantidade
      let increaseButtons = document.querySelectorAll('.increase');
  
      // Adiciona um evento de clique para cada botão
      increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
          let productName = button.getAttribute('data-name');
          let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
          let cartCost = parseInt(localStorage.getItem('custoTotal'));
  
          cartItems[productName].inCart += 1;
          localStorage.setItem('productsInCart', JSON.stringify(cartItems));
          localStorage.setItem('custoTotal', cartCost + cartItems[productName].price);
          displayCart();
          updateCartTotal();
        });
      });
  
      // Seleciona todos os botões de remoção de produtos
      let removeButtons = document.querySelectorAll('.close');
  
      // Adiciona um evento de clique para cada botão
      removeButtons.forEach(button => {
        button.addEventListener('click', removeCartItem);
      });
  
      // Atualiza o valor total do carrinho
      let cartTotal = document.querySelector('.cartTotal');
  
      if (cartTotal) {
        cartTotal.textContent = `Total: R$${cartCusto},00`;
      }
    }
  }
  
  function removeCartItem(event) {
    const productName = event.target.dataset.name;
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  
    if (cartItems && cartItems[productName]) {
      const product = cartItems[productName];
      const productQuantity = product.inCart;
  
      delete cartItems[productName];
  
      const updatedProductNumbers = parseInt(localStorage.getItem("cartNumbers")) - productQuantity;
  
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      localStorage.setItem("cartNumbers", Math.max(0, updatedProductNumbers));
  
      let updatedCartCost = 0;
  
      for (const item in cartItems) {
        updatedCartCost += cartItems[item].price * cartItems[item].inCart;
      }
  
      if (Object.keys(cartItems).length === 0) {
        localStorage.removeItem("productsInCart");
        localStorage.removeItem("cartNumbers");
        localStorage.removeItem("custoTotal");
        document.querySelector('.basketTotalContainer').textContent = ''; // Remove o valor do custo total do elemento HTML
      } else {
        localStorage.setItem("custoTotal", updatedCartCost);
      }
  
      event.target.parentElement.parentElement.remove();
  
      document.querySelector(".qtdcart").textContent = Math.max(0, updatedProductNumbers);
      document.querySelector(".qtdcarrinho").textContent = Math.max(0, updatedProductNumbers);
      displayCart(); // Atualiza a exibição do carrinho
  
      // Atualiza o valor total do carrinho após a remoção do item
      updateCartTotal();
    }
  }
  
  // Chama a função displayCart() para atualizar a exibição do carrinho quando a página for carregada
  displayCart();
  
  // Resto do código...
  
  // Função para redirecionar para a página de pagamento com o valor de custoTotal
  function redirectToCheckout() {
    let custoTotal = localStorage.getItem('custoTotal');
    window.location.href = 'checkout.html';
  }
  
  // Adiciona um evento de clique ao botão de pagamento
  let paymentButton = document.getElementById('payment');
  if (paymentButton) {
    paymentButton.addEventListener('click', redirectToCheckout);
  }
  
  // Obtém o elemento do custo total
  const costValue = document.getElementById('cost-value');
  
  // Função para atualizar o valor do custo total na página
  function updateCostTotal() {
    let custoTotal = localStorage.getItem('custoTotal');
    costValue.textContent = `R$ ${custoTotal},00`;
  }
  
  // Chama a função para exibir o custo total inicialmente
  updateCostTotal();



});  

 // -----------------------------------------------------------------------------------------

  // CÓDIGO DO MERCADO PAGO - INTEGRAÇÃO (CHECKOUT TRANSPARENTE)

 // -----------------------------------------------------------------------------------------
  let custoTotal = localStorage.getItem('custoTotal');

document.addEventListener('DOMContentLoaded', () => {
  const mp = new MercadoPago("APP_USR-0b4554de-0cd1-40b7-8222-427fcd0ba50e");

  //FORMATA O CPF AUTOMÁTICO AO USUÁRIO DIGITAR
  $(document).ready(function() {
  $('#form-checkout__identificationNumber').mask('000.000.000-00');
  });
  
  
  const cardForm = mp.cardForm({
    amount: custoTotal,
    iframe: true,
    form: {
      id: "form-checkout",
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número do cartão",
      },
      expirationDate: {
        id: "form-checkout__expirationDate",
        placeholder: "MM/YY",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "CVV",
      },
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Nome completo do Titular",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emissor",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Número de parcelas",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "Digite seu CPF",
      },
      
    },
    callbacks: {
      onFormMounted: (error) => {
        if (error) return console.warn("Form Mounted handling error: ", error);
        console.log("Form mounted");
      },
      onSubmit: (event) => {
        event.preventDefault();
  
        
  
        const {
          paymentMethodId: payment_method_id,
          issuerId: issuer_id,
          cardholderEmail: email,
          amount,
          token,
          installments,
          identificationNumber,
          identificationType,
        } = cardForm.getCardFormData();
  
        fetch("/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: "Product Description",
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Payment response:", data);
            // Faça algo com a resposta do pagamento
          })
          .catch((error) => {
            console.error("Payment error:", error);
          });
      },
      onFetching: (resource) => {
        console.log("Fetching resource: ", resource);
  
        // Animate progress bar
        const progressBar = document.querySelector(".progress-bar");
        progressBar.removeAttribute("value");
  
        return () => {
          progressBar.setAttribute("value", "0");
        };
      },
    },
  });
});

 // -----------------------------------------------------------------------------------------

 // PÁGINA DE LOGIN - FORMATAÇÃO DE DADOS (TELEPHONE)

 // -----------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

var passwordInput = document.getElementById('password');

passwordInput.addEventListener('input', function(event) {
  var password = passwordInput.value;

  // Verifica se o evento foi acionado por uma tecla de apagar
  if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
    // Não aplica a formatação
    return;
  }

  // Remove todos os caracteres não numéricos da senha
  password = password.replace(/\D/g, '');

  // Limita a quantidade de caracteres numéricos a 8
  if (password.length > 8) {
    password = password.substring(0, 11);
  }

  // Adiciona a formatação correta (XX) XXXX-XXXX
  if (password.length >= 2) {
    password = '(' + password.substring(0, 2) + ') ' + password.substring(2);
    if (password.length >= 9) {
      password = password.substring(0, 10) + '-' + password.substring(10);
    }
  }

  // Atualiza o valor do campo de senha com a senha formatada
  passwordInput.value = password; 
});
});


 // -----------------------------------------------------------------------------------------

 // INTEGRAÇÃO COM TWILIO - INTEGRATION:

 // -----------------------------------------------------------------------------------------


 document.addEventListener('DOMContentLoaded', () => {
  let generatedVerificationCode;

  // Função para enviar o SMS
  function sendSms(toPhoneNumber, message) {
    const accountSid = 'AC1a4328be6f04cdd38980db483e1d9182';
    const authToken = '885b84ab2e618816b29b9bba5a9004c5';
    const twilioPhoneNumber = '+13613100829';

    // Construir a URL do endpoint de mensagens do Twilio
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    // Construir os parâmetros da solicitação POST
    const params = new URLSearchParams();
    params.append('To', toPhoneNumber);
    params.append('From', twilioPhoneNumber);
    params.append('Body', message);

    // Enviar a solicitação POST para o Twilio
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })
      .then(response => response.json())
      .then(data => {
        // SMS enviado com sucesso
        console.log('SMS enviado para: ' + data.to);
        console.log('Corpo da mensagem: ' + data.body);
      })
      .catch(error => {
        // Erro ao enviar o SMS
        console.error('Erro ao enviar o SMS:', error);
      });
  }

  // Captura o evento de envio do formulário
  document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Capturar os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const phoneNumber = document.getElementById('password').value;

    // Formatar o número de telefone removendo caracteres não numéricos
    const phoneNumberDigits = phoneNumber.replace(/\D/g, '');

    // Verificar se o número de telefone tem dígitos suficientes
    if (phoneNumberDigits.length >= 10) {
      // Adicionar o código do país (Brasil) ao número de telefone
      const phoneNumberFormatted = '+55' + phoneNumberDigits;

      // Função para gerar um código de verificação aleatório
      function generateVerificationCode() {
        const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return code;
      }

      // Gera o código de verificação
      generatedVerificationCode = generateVerificationCode();

      // Enviar o SMS com os valores
      sendSms(phoneNumberFormatted, 'Olá ' + username + '! Seu código de verificação é: ' + generatedVerificationCode);
      openModal();
    } else {
      console.error('Número de telefone inválido');
    }
  });

  // Função para abrir o modal de confirmação
  function openModal() {
    const modal = document.getElementById('verification-modal');
    const verificationCodeInput = document.getElementById('verification-code');
    modal.style.display = 'block';
    verificationCodeInput.value = ''; // Limpar o campo de código de verificação anterior
  }

  // Captura o evento de envio do formulário de confirmação do código de verificação
  document.getElementById('confirmation-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Capturar o código de verificação inserido pelo usuário
    const userVerificationCode = document.getElementById('verification-code').value;

    // Verificar se o código de verificação inserido está correto
    if (userVerificationCode === generatedVerificationCode) {
      // Código de verificação correto
      console.log('Código de verificação correto');
      // Redirecionar para a página index.html
      window.location.href = 'index.html';
    } else {
      // Código de verificação incorreto
      console.log('Código de verificação incorreto');
    }
  });
});
