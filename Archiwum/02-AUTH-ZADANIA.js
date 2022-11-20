import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

import { 
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

import { 
    getFirestore,
    collection, 
    getDocs
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHI9vz9TXlW9Oovmrv0Z7bGHv_xXZYv9w",
    authDomain: "zdfronpol11.firebaseapp.com",
    projectId: "zdfronpol11",
    storageBucket: "zdfronpol11.appspot.com",
    messagingSenderId: "680071626825",
    appId: "1:680071626825:web:cba7b4f8d84a73d31b7f98"
};

const app = initializeApp(firebaseConfig);

// Inicjalizowanie modułu Auth
const auth = getAuth();
// Inicjalizowanie modułu Firestore
const db = getFirestore(app);

// Definiowanie elementów UI
const emailFormInput = document.querySelector("#emailForm");
const passwordFormInput = document.querySelector("#passwordForm");
const loginBtn = document.querySelector("#loginBtn");
const signupBtn = document.querySelector("#signupBtn");
const loginGoogleBtn = document.querySelector("#googleLoginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const errorLabel = document.querySelector("#errorLabel");
const loginFormDiv = document.querySelector("#loginForm");
const authUserDiv = document.querySelector("#authUser");
const animalsListDiv = document.querySelector("#animalsList");

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

// Stworzenie funkcji generującej listę zwierząt
const generateAllAnimalsList = async () => {
    const allAnimalsSnap = await getDocs(collection(db, "zwierzeta"));
    
    let animalsList = "<ol>"
    allAnimalsSnap.forEach((animal) => {
        animalsList += `<li>${animal.data().nazwa}</li>`
    });
    animalsList += "</ol>"
    console.log(animalsList);

    animalsListDiv.innerHTML = animalsList
};

// Stworzenie funkcji nasłuchującej na zmianę statusu sesji użytkownika
const authUserObserver = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            generateAllAnimalsList();
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

// 12. Dodanie możliwości logowania przez konto Google
const loginUserWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const loginResult = await signInWithPopup(auth, provider);
    console.log(loginResult);

    const user = loginResult.user;
    console.log(user);
};

loginGoogleBtn.addEventListener("click", loginUserWithGoogle);
















