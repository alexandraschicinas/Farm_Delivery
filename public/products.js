let allProducts = [];
let editId1;

function getHtmlProducts(products) {
    return products.map(product => {
        return `<tr>
         <td>${product.id}</td>
         <td>${product.category}</td>
         <td>${product.name}</td>
         <td>${product.quantity}</td>
         <td>${product.price}</td>
         <td>${product.date}</td>
          <td>   
             <a href="#" class="remove-btn" data-id="${product.id}">&#10006;</a>
             <a href="#" class="edit-btn" data-id="${product.id}">&#9998;</a>
         </td>
         </tr>`
    }).join("")

}
function showProducts(products) {
    const html = getHtmlProducts(products);

    const tbody = document.querySelector("#product tbody");
    tbody.innerHTML = html;

}
function loadProducts() {
    fetch("/products")
        .then(r => r.json())
        .then(products => {
            allProducts = products;
            showProducts(products);
        });
}

loadProducts();