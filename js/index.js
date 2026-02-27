import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDvBoopJzCdywnDdy52Z-iSiCahOShQkAw",
    authDomain: "helpdesk-saas-c3bcf.firebaseapp.com",
    projectId: "helpdesk-saas-c3bcf",
    storageBucket: "helpdesk-saas-c3bcf.firebasestorage.app",
    messagingSenderId: "303000323821",
    appId: "1:303000323821:web:c2aa51c9ba7a0b3372aee4",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const form = document.getElementById("authForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const toggleMode = document.getElementById("toggleMode");
  const formSubtitle = document.getElementById("formSubtitle");
  const submitBtn = document.getElementById("submitBtn");
  const errorMsg = document.getElementById("errorMsg");

  let modoLogin = true;


  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "dashboard.html";
    }
  });

  toggleMode.addEventListener("click", () => {
    modoLogin = !modoLogin;
    errorMsg.innerText = "";

    if (modoLogin) {
      formSubtitle.innerText = "Acesse sua conta";
      submitBtn.innerText = "Entrar";
      toggleText.innerHTML = `
        Não tem conta?
        <span id="toggleMode" style="color:#2563eb;cursor:pointer;">Criar conta</span>
      `;
    } else {
      formSubtitle.innerText = "Crie sua conta";
      submitBtn.innerText = "Criar conta";
      toggleText.innerHTML = `
        Já tem conta?
        <span id="toggleMode" style="color:#2563eb;cursor:pointer;">Entrar</span>
      `;
    }


    document.getElementById("toggleMode").addEventListener("click", arguments.callee);
  });


  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.innerText = "";

    const email = emailInput.value;
    const senha = passwordInput.value;

    try {
      if (modoLogin) {
        await signInWithEmailAndPassword(auth, email, senha);
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
      }

      window.location.href = "dashboard.html";

    } catch (error) {
      tratarErro(error.code);
    }
  });

  function tratarErro(code) {
    if (code === "auth/email-already-in-use")
      errorMsg.innerText = "Este e-mail já está cadastrado.";

    else if (code === "auth/invalid-email")
      errorMsg.innerText = "E-mail inválido.";

    else if (code === "auth/weak-password")
      errorMsg.innerText = "Senha deve ter pelo menos 6 caracteres.";

    else if (code === "auth/user-not-found")
      errorMsg.innerText = "Usuário não encontrado.";

    else if (code === "auth/wrong-password")
      errorMsg.innerText = "Senha incorreta.";

    else
      errorMsg.innerText = "Erro: " + code;
  }
