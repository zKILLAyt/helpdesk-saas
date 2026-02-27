import { db } from "./firebase.js";
import { protegerRota, logout, usuarioLogado } from "./auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

protegerRota();
logout();

usuarioLogado((user) => {
  carregarDashboard(user);
});

async function carregarDashboard(user) {

  document.getElementById("boasVindas").innerText =
    `Bem-vindo, ${user.email}`;

  const snapshot = await getDocs(collection(db, "chamados"));

  let abertos = 0;
  let andamento = 0;
  let finalizados = 0;

  snapshot.forEach(doc => {

    const chamado = doc.data();
    if (chamado.userId !== user.uid) return;

    if (chamado.status === "aberto") abertos++;
    if (chamado.status === "andamento") andamento++;
    if (chamado.status === "finalizado") finalizados++;
  });

  document.getElementById("abertos").innerText = abertos;
  document.getElementById("andamento").innerText = andamento;
  document.getElementById("finalizados").innerText = finalizados;
}