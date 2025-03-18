import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyDU9dZvllFXkihpLJXFjIFqB48OZRYqKRg",
    authDomain: "ateliercontrol-49014.firebaseapp.com",
    projectId: "ateliercontrol-49014",
    storageBucket: "ateliercontrol-49014.firebasestorage.app",
    messagingSenderId: "809696390712",
    appId: "1:809696390712:web:6dc9e2ac4ee8f55b2380cd",
    measurementId: "G-52LXE7PFMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functionsInstance = getFunctions(app);

// Detect Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user-info").style.display = "block";
        document.getElementById("user-email").textContent = user.email;
        document.getElementById("auth-container").style.display = "none";
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        document.getElementById("user-info").style.display = "none";
        document.getElementById("auth-container").style.display = "flex";
        localStorage.removeItem("user");
    }
});

// Register User using Cloud Function
window.addEventListener("DOMContentLoaded", () => {
    const authForm = document.getElementById("auth-form");
    if (authForm) {
      authForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("register-email");
        const passwordInput = document.getElementById("register-password");
        if (!emailInput || !passwordInput) {
          console.error("Required input fields not found!");
          return;
        }
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        if (!email || !password) {
          alert("Please fill in all required fields.");
          return;
        }
        
        try {
          const createUserFunction = httpsCallable(functionsInstance, "createUser");
          const result = await createUserFunction({ email, password });
          console.log(result.data);
          alert("User successfully created! UID: " + result.data.uid);
        } catch (error) {
          console.error("Error:", error);
          alert("Error: " + error.message);
        }
      });
    }
  
  

    // Login User with Email/Password
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Connexion réussie !");
        } catch (error) {
            alert("Erreur: " + error.message);
        }
      });
    }

    // Logout User
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("Déconnexion réussie !");
        } catch (error) {
            alert("Erreur: " + error.message);
        }
      });
    }
  });