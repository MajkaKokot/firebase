import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import { 
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB_PiGsPB7B1FrRH__aLNDpZrdPeX2P5XQ",
    authDomain: "zwierzetamajka.firebaseapp.com",
    projectId: "zwierzetamajka",
    storageBucket: "zwierzetamajka.appspot.com",
    messagingSenderId: "848448042984",
    appId: "1:848448042984:web:cefecb9653a80925fa165d",
    measurementId: "G-4GV8GE42QD"
  };


const app = initializeApp(firebaseConfig);

// Inicjalizowanie modułu Auth
const auth = getAuth();

// Definiowanie elementów UI
const emailFormInput = document.querySelector("#emailForm");
const passwordFormInput = document.querySelector("#passwordForm");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const errorLabel = document.querySelector('#errorLabel');
const loginFormDiv = document.querySelector("#loginForm");


// Stworznie funkcji odpowiedzilanej za logowanie użytkownika
const loginUser = async () => {

    // Uwierzytelnianie/Logowanie użytkownika
    const providedEmail = emailFormInput.value;
    const providedPassword = passwordFormInput.value;
    
    try {
const user = await signInWithEmailAndPassword(auth, providedPassword);
console.log(user);

    } catch(error) {
           if (error.code === "auth/invalid-email") {
                errorLabel.innerHTML = "Podano niepoprawny e-mai"
            }
    }

    
    const user = await signInWithEmailAndPassword(auth, providedEmail, providedPassword);
    console.log(user);
};

loginBtn.addEventListener("click", loginUser);

// Stworzenie funkcji odpowiedzialnej za wylogowanie użytkownika
const logoutUser = async () => {
    await signOut(auth);
    console.log('User logged out.');
};

logoutBtn.addEventListener("click", logoutUser);
//white_check_mark
//eyes
//raised_hands
const signupUser = async () => {

    const providedEmail = emailFormInput.value;
    const providedPassword = passwordFormInput.value;

try {
const user = await createUserWithEmailAndPassword(auth, providedPassword);
console.log(user);

} catch(error) {
    errorLabel.innerHTML = error.code;
}
};


signupUser.addEventListener("click", signupUser);

const authUserObserver = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginFormDiv.getElementsByClassName.display = "none";
            authUserDiv.style.display = "block";
            console.log(user);

          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          
          // ...
        } else {
          authUserDiv.style.display = "none";
          loginFormDiv
        }
      });
      

}

  












