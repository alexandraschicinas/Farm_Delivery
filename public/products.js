let allProducts = [];
let editIdProd;
let categories = [];

function getHtmlProducts(products) {
  return products
    .map((product) => {
      let nameCategory = categories.find(
        (category) => category.id === product.category
      );
      return `<tr>
         <td>${product.id}</td>
         <td>${nameCategory.name}</td>
         <td>${product.name}</td>
         <td>${product.quantity}</td>
         <td>${product.price}</td>
         <td>${product.date}</td>
          <td>   
             <a href="#" class="remove-btn" data-id="${product.id}">&#10006;</a>
             <a href="#" class="edit-btn" data-id="${product.id}">&#9998;</a>
         </td>
         </tr>`;
    })
    .join("");
}
function showProducts(products) {
  const html = getHtmlProducts(products);

  const tbody = document.querySelector("#product tbody");
  tbody.innerHTML = html;
}
function loadProducts() {
  fetch("/products")
    .then((r) => r.json())
    .then((products) => {
      allProducts = products;
      showProducts(products);
    });
}

function addProducts(product) {
  fetch("/products/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((status) => {
      if (status.success) {
        loadProducts();
      }
    });
}

function removeProduct(id) {
  fetch("products/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((status) => {
      if (status.success) {
        loadProducts();
      }
    });
}

function updateProduct(product) {
  fetch("products/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: editIdProd,
      category: product.category,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      date: product.date,
    }),
  })
    .then((response) => response.json())
    .then((status) => {
      if (status.success) {
        loadProducts();
      }
    });
}

document.querySelector("#product tbody").addEventListener("click", (e) => {
  const rowEl = e.target;
  if (rowEl.matches("a.remove-btn")) {
    const id = e.target.getAttribute("data-id");
    removeClient(id);
  } else if ("a.edit-btn") {
    document.getElementById("saveProd").innerText = "Update";
  }
});

function saveProduct() {
  const category = document.querySelector("#product [name = category]").value;
  const name = document.querySelector("#product input[name = name]").value;
  const quantity = document.querySelector("#product input[name = quantity]")
    .value;
  const price = document.querySelector("#product input[name = price]").value;
  const date = document.querySelector("#product input[name = date]").value;

  const product = {
    category: category,
    name: name,
    quantity: quantity,
    price: price,
    date: date,
  };

  if (editIdProd) {
    product.id = editIdProd;
    updateProduct(product);
  } else {
    addProducts(product);
  }
}

function dataToUpdateProduct(product) {
  document.querySelector("#product [name = category]").value = product.category;
  document.querySelector("#product input[name = name]").value = product.name;
  document.querySelector("#product input[name = quantity]").value =
    product.quantity;
  document.querySelector("#product input[name = price]").value = product.price;
  document.querySelector("#product input[name = date]").value = product.date;
}

document.querySelector("#product tbody").addEventListener("click", (e) => {
  const rowEl = e.target;
  if (rowEl.matches("a.remove-btn")) {
    const id = e.target.getAttribute("data-id");
    removeClient(id);
  } else if ("a.edit-btn") {
    document.getElementById("saveProd").innerText = "Update";

    const id = e.target.getAttribute("data-id");
    const editedProduct = allProducts.find((product) => product.id == id);
    dataToUpdateProduct(editedProduct);
    editIdProd = id;
  }
});

function loadCategory() {
  fetch("/category")
    .then((r) => r.json())
    .then((category) => {
      categories = category;
      showCategory(categories);
    });
}

function showCategoryHtml(category) {
  return category.map((categ) => {
    return `<option value="${categ.id}">${categ.name} </option>`;
  });
}

function showCategory(category) {
  const html = showCategoryHtml(category);
  const inputCategory = document.querySelector(
    "#product tfoot select[name=category]"
  );
  inputCategory.innerHTML = html;
}

Promise.all(loadCategory(),
   loadProducts())
  .then(responses => {
    return responses;
  })
  .catch(function(message = "Something gone wrong..."){
    return message;
  });