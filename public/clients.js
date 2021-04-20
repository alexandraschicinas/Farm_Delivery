let allClients = [];
let editId;

function getHtmlClients(clients){
    return clients.map(client => {
        return `<tr>
        <td>${client.id}</td>
        <td>${client.name}</td>
        <td>${client.phone}</td>
        <td>${client.email}</td>
        <td>${client.county}</td>
        <td>${client.city}</td>
        <td>${client.street}</td>
         <td>   
            <a href="#" class="remove-btn" data-id="${client.id}">&#10006;</a>
            <a href="#" class="edit-btn" data-id="${client.id}">&#9998;</a>
        </td>
        </tr>`
    }).join("")
    
}

function showClients(clients) {
    const html = getHtmlClients(clients);
     
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = html;

}

function loadClients(){
    fetch("http://localhost:3000/clients") 
    .then(r => r.json())
    .then(clients => {
        allClients = clients;
        showClients(clients);
    });
}

loadClients();

function addClient(client) {
    fetch("clients/create", {
        method: "POST",
        headers: {
            "Content-Type":
            "application/json"
        },
        body: JSON.stringify(client)
    })
        .then(response => response.json())
        .then( status => {
            if(status.success) {
                loadClients();
            }
        });
}

function saveClient() {
    const name = document.querySelector("input[name= name]").value;
    const phone = document.querySelector("input[name = phone]").value;
    const email = document.querySelector('input[name = email]').value;
    const county = document.querySelector('input[name = county]').value;
    const city = document.querySelector('input[name = city]').value;
    const street = document.querySelector('input[name = street]').value;

    const client = {
        name: name,
        phone: phone,
        email: email,
        county: county,
        city: city,
        street: street
    }
    addClient(client);
}