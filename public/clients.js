let allClients = [];
let editedId;

function getHtmlClients(clients) {
  return clients
    .map((client, i) => {
      return `<tr>
        <td>${i + 1}</td>
        <td>${client.name}</td>
        <td>${client.phone}</td>
        <td>${client.email}</td>
        <td>${client.county}</td>
        <td>${client.city}</td>
        <td>${client.street}</td>
         <td>   
            <a href="#" class="remove-btn" data-id="${client.id}">&#10006;</a>
            <a href="#" class="edit-btn" data-id="${client.id}">&#9998;</a>
            <button class="invoice-btn" data-id="${client.id}">invoice generator</button>
        </td>
        </tr>`;
    })
    .join("");
}

function showClients(clients) {
  const html = getHtmlClients(clients);

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = html;
}

function loadClients() {
  fetch("http://localhost:3000/clients")
    .then((r) => r.json())
    .then((clients) => {
      allClients = clients;
      showClients(clients);
    });
}

loadClients();

function addClient(client) {
  fetch("clients/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((response) => response.json())
    .then((status) => {
      if (status.success) {
        loadClients();
      }
    });
}

function removeClient(id) {
  fetch("clients/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((status) => {
      if (status.success) {
        loadClients();
      }
    });
}

function updateClient(client) {
  fetch("clients/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: editedId,
      name: client.name,
      phone: client.phone,
      email: client.email,
      county: client.county,
      city: client.city,
      street: client.street,
    }),
  })
    .then((response) => response.json())
    .then((status) => {
      if (status.success) {
        loadClients();
      }
    });
}

function saveClient() {
  const name = document.querySelector("#client input[name= name]").value;
  const phone = document.querySelector("#client input[name = phone]").value;
  const email = document.querySelector("#client input[name = email]").value;
  const county = document.querySelector("#client input[name = county]").value;
  const city = document.querySelector("#client input[name = city]").value;
  const street = document.querySelector("#client input[name = street]").value;

  const client = {
    name: name,
    phone: phone,
    email: email,
    county: county,
    city: city,
    street: street,
  };

  if (editedId) {
    client.id = editedId;
    updateClient(client);
  } else {
    addClient(client);
  }
}

document.querySelector("#client tbody").addEventListener("click", (e) => {
  const rowEl = e.target;
  if (rowEl.matches("a.remove-btn")) {
    const id = e.target.getAttribute("data-id");
    removeClient(id);
  } else if (rowEl.matches("a.edit-btn")) {
    document.getElementById("saveBtn").innerText = "Update";

    const id = e.target.getAttribute("data-id");
    const editedClient = allClients.find((client) => client.id == id);
    dataToUpdate(editedClient);
    editedId = id;
  }
  else if (rowEl.matches("button.invoice-btn")){
    showInvoiceProducts(allProducts);
    hideAll()
  }
});

function dataToUpdate(client) {
  document.querySelector("#client input[name = name]").value = client.name;
  document.querySelector("#client input[name = phone]").value = client.phone;
  document.querySelector("#client input[name = email]").value = client.email;
  document.querySelector("#client input[name = county]").value = client.county;
  document.querySelector("#client input[name = city]").value = client.city;
  document.querySelector("#client input[name = street]").value = client.street;
}

document.getElementById("search").addEventListener("input", e => {
  const text = e.target.value.toLowerCase();
  const filteredText = allClients.filter( client => {
   return (
     client.name.toLowerCase().indexOf(text) > -1 ||
     client.email.toLowerCase().indexOf(text) > -1 ||
     client.county.toLowerCase().indexOf(text) > -1 ||
     client.city.toLowerCase().indexOf(text) > -1 ||
     client.street.toLowerCase().indexOf(text) > -1 
  );
})
  showClients(filteredText);
})