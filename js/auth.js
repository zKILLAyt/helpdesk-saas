import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export function protegerRota() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

export function logout() {
  const btn = document.querySelector(".logout");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
  });
}

export function usuarioLogado(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) callback(user);
  });
}