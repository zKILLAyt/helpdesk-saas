import { db } from "./firebase.js";
import { protegerRota, logout } from "./auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

protegerRota();
logout();

const tabela = document.querySelector("#usuariosTable tbody");

async function carregarUsuarios() {

  tabela.innerHTML = "";

  const snapshot = await getDocs(collection(db, "usuarios"));

  snapshot.forEach(doc => {

    const usuario = doc.data();

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${usuario.email}</td>
      <td>${usuario.role}</td>
      <td>${usuario.criadoEm?.toDate().toLocaleDateString() || "-"}</td>
    `;

    tabela.appendChild(tr);
  });
}

carregarUsuarios();