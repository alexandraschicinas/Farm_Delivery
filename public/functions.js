function hide(id) {
  let el = document.getElementById(id);
  el.style.display = "none";
}

function hideAll() {
  const tables = document.getElementsByClassName("table");
  for (let i = 0; i < tables.length; i++) {
    hide(tables[i].id);
  }
}

function showTable(id) {
  hideAll();

  let tableToShow = document.getElementById(id);
  tableToShow.style.display = "";
}
showTable("client");

function clicksOnMenu() {
  document.addEventListener("click", (e) => {
    let link = e.target;
    if (link.matches("#menu div a")) {
      let id = link.getAttribute("data-id");
      showTable(id);
    }
  });
}
clicksOnMenu();
