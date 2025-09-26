
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// load items from server and display them in the container 
async function loadItems() {
  const res = await fetch("http://localhost:3001/games");
  const data = await res.json();

  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("game-card");

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>💲${item.cost}</p>
      <p>📂 ${item.category || ""}</p>
      <div class="actions">
        <button onclick='openEditDialog(${JSON.stringify(item)})'>Edit</button>
        <button onclick='deleteItem(${item.id})'>Delete</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// open edit dialog and populate fields 
function openEditDialog(item) {
  const dialog = document.getElementById("editDialog");

  document.getElementById("edit-id").value = item.id;
  document.getElementById("edit-name").value = item.name;
  document.getElementById("edit-cost").value = item.cost;
  document.getElementById("edit-category").value = item.category;

  dialog.showModal();
}

// save edited item to server 
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("saveEditBtn").addEventListener("click", async () => {
    const id = document.getElementById("edit-id").value;
    const name = document.getElementById("edit-name").value;
    const cost = document.getElementById("edit-cost").value;
    const category = document.getElementById("edit-category").value;

    await fetch(`http://localhost:3001/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cost, category }),
    });

    document.getElementById("editDialog").close();
    loadItems();
  });
});

// delete item by id
async function deleteItem(id) {
  await fetch(`http://localhost:3001/delete/${id}`, { method: "DELETE" });
  loadItems();
}
// initial load of items 
document.addEventListener("DOMContentLoaded", loadItems);
