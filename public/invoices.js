let allPrices = [];
let totalPrice;
let createElTd;
let invoiceClient, invoiceId, productId, date, delivery;
let idMap, ids;

function getHtmlInvoiceProducts(allProducts) {
  return allProducts
    .map((product, i) => {
      let nameCategory = categories.find(
        (category) => category.id === product.category
      );
      return `<tr data-id="${product.id}">
        <td> 
          <input type="checkbox" name="check" class="check" value="${
            product.id
          }" />
        </td>
         <td>${i + 1}</td>
         <td >${nameCategory.name}</td>
         <td>${product.name}</td>
         <td>${product.quantity}</td>
         <td>${product.price}</td>
         </tr>`;
    })
    .join("");
}
function showInvoiceProducts(allProducts) {
  const html = getHtmlInvoiceProducts(allProducts);
  const tbody = document.querySelector("#invoice tbody");
  tbody.innerHTML = html;
}

function createHtmlTFoot() {
  let tfoot = document.querySelector("#invoice tfoot");
  let createElTr = document.createElement("tr");
  createElTd = document.createElement("td");
  createElTr.appendChild(createElTd);
  createElTd.innerHTML = "Total sum;";
  tfoot.appendChild(createElTr);
}

function getPrices(allProducts) {
  let prices = allProducts.map((product) => {
    return product.price;
  });
  allPrices = prices;
  return allPrices;
}

function sumPrices(allPrices) {
  return allPrices.reduce((total, price) => {
    return total + price;
  }, 0);
}

function printSum() {
  createHtmlTFoot();
  getPrices(allProducts);
  let htmlSum = sumPrices(allPrices);

  createElTd.innerHTML = "Total Price:" + " " + htmlSum;
}

function showNameOfClientOnInvoice(clientId) {
  invoiceClient = allClients.find((client) => clientId == client.id);

  const h2EL = document.createElement("h1");
  const parentEl = document.getElementById("invoiceTitle");
  parentEl.appendChild(h2EL);
  h2EL.innerHTML = `Invoice for ${invoiceClient.name} `;
}

function getProductIds() {
  let checkboxes = document.getElementsByClassName("check");
  let arrayCheckboxes = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  );
  return arrayCheckboxes.map((checkbox) => checkbox.value);
}

function addInvoice() {
  fetch("invoices/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientId: invoiceClient.id,
      products: getProductIds(),
      delivery: "2021-06-23"
    }),
  })
    .then((response) => response.json())
    .then((r) => {
      console.log(r);
    });
}

function saveInvoiceData(){
  const saveBtn = document.querySelector("#save-invoice");
  saveBtn.innerHTML= getProductIds(), addInvoice();
}






