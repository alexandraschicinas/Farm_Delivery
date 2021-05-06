hide(invoice)
function getHtmlInvoiceProducts(allProducts) {
  return allProducts
    .map((product, i) => {
      let nameCategory = categories.find(
        (category) => category.id === product.category
      );
      return `<tr>
        <td> <input type = "checkbox"> </td>
         <td>${i + 1}</td>
         <td>${nameCategory.name}</td>
         <td>${product.name}</td>
         <td>${product.quantity}</td>
         <td>${product.price}</td>
         </tr>`;
    })
    .join("");
}
function showInvoiceProducts(allProducts) {
  const html = getHtmlInvoiceProducts(allProducts);
  console.log(html)

  const tbody = document.querySelector("#invoice tbody");
  tbody.innerHTML = html;
}

