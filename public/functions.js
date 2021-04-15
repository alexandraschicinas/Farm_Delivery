function hide(id) {
  let el = document.getElementById(id);
  el.style.display = "none";
}

function hideAll() {
  const tables = document.getElementsByClassName("table");
  for(let i = 0; i < tables.length; i++) {
        hide(tables[i].id);
  }
};
hideAll();

function showTable(id) {
  hideAll();  

  let tableToShow = document.getElementById(id);
  tableToShow.style.display = "";
}
showTable("client")

function clicks() {
  document.addEventListener("click", (e) => {
    let link = e.target;
    if(link.matches("#menu div a")) {
        let id = link.getAttribute("data-id");
        showTable(id);
    }
  });
}
clicks();

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
    .then(clients =>{
        allClients = clients;
        showClients(clients);
    });
}

loadClients();

 

