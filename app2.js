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
const signupBtn = document.querySelector("#signupBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const errorLabel = document.querySelector("#errorLabel");
const loginFormDiv = document.querySelector("#loginForm");
const authUserDiv = document.querySelector("#authUser");

// Stworznie funkcji odpowiedzilanej za logowanie użytkownika
const loginUser = async () => {

    // Uwierzytelnianie/Logowanie użytkownika
    const providedEmail = emailFormInput.value;
    const providedPassword = passwordFormInput.value;

    // Próba zalogowania użytkownika
    try {
        // Jeżeli wszystko się uda to zalogujemy użytkownika
        // oraz otrzymamy jego dane.
        const user = await signInWithEmailAndPassword(auth, providedEmail, providedPassword);
        console.log(user);
    } catch(error) {
        // Jeżeli coś pójdzie nie tak przy logowaniu..
        // to trafimy do tej sekcji

        // Rozpoznanie kodów błędów podczas logowania
        // Możemy korzystać z modułu AuthErrorCodes albo 
        // bezpośrednio kodów błędów
        if (error.code === AuthErrorCodes.INVALID_EMAIL 
            || error.code === "auth/wrong-password") {
            errorLabel.innerHTML = "Podano niepoprawny email lub hasło!"
        } else {
            errorLabel.innerHTML = error.code;
        }
    }
    
};

loginBtn.addEventListener("click", loginUser);

// Stworzenie funkcji odpowiedzialnej za wylogowanie użytkownika
const logoutUser = async () => {
    await signOut(auth);
    console.log('User logged out.');
};

logoutBtn.addEventListener("click", logoutUser);

// Stworzenie funkcji odpowiedzialnej za rejstrację użytkownika
// (poprzez email i hasło)
const signupUser = async () => {
    const providedEmail = emailFormInput.value;
    const providedPassword = passwordFormInput.value;

    // Próba dodania nowego użytkownika (rejstracji)
    try {
        // Jeżeli wszystko pójdzie OK to zostanie utworzony
        // nowy użytkownik oraz zostanie on automatycznie zalogowany
        const user = await createUserWithEmailAndPassword(auth, providedEmail, providedPassword);
        console.log(user);
    } catch(error) {
        // Jeżeli coś pójdzie nie tak - wydrukujmy dla użytkownika kod błędu
        errorLabel.innerHTML = error.code;
    }
};

signupBtn.addEventListener("click", signupUser);


const generateAllAnimalaList = async () => {
    amomalList += <li>${AnimationPlaybackEvent.data}</li>
}


// Stworzenie funkcji nasłuchującej na zmianę statusu sesji użytkownika
const authUserObserver = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginFormDiv.style.display = "none";
            authUserDiv.style.display = "block";
            console.log(user);
        } else {
            authUserDiv.style.display = "none";
            loginFormDiv.style.display = "block";
        }
    })
}

authUserObserver();
















