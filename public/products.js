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

function addProducts(product) {
    fetch("products/create", {
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
        id: editedId,
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

  function saveProduct() {
    const category = document.querySelector("input[name= category]").value;
    const name = document.querySelector("input[name = name]").value;
    const quantity = document.querySelector("input[name = quantity]").value;
    const price = document.querySelector("input[name = price]").value;
    const date = document.querySelector("input[name = date]").value;
  
    const product = {
      category: category,
      type: type,
      quantity: quantity,
      price: price,
      date: date,
    };
  
    if (editedId) {
      product.id = editedId;
      updateProduct(product);
    } else {
      addProduct(product);
    }
  }

  document.querySelector("#product tbody").addEventListener("click", (e) => {
    const rowEl = e.target;
    if (rowEl.matches("a.remove-btn")) {
      const id = e.target.getAttribute("data-id");
      removeClient(id);
    } else if ("a.edit-btn") {
      document.getElementById("saveBtn").innerText = "Update";
  
      const id = e.target.getAttribute("data-id");
      const editedProduct = allProducts.find((product) => product.id == id);
      dataToUpdateProduct(editedProduct);
      editedId = id;
    }
  });
  
  function dataToUpdateProduct(product) {
    document.querySelector("#product input[name = category]").value = product.category;
    document.querySelector("#product input[name = name]").value = product.name;
    document.querySelector("#product input[name = quantity]").value = product.quantity;
    document.querySelector("#product input[name = price]").value = product.price;
    document.querySelector("#product input[name = date]").value = product.date;
  }
  