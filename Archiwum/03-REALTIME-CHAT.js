// CRUD -> Create, Read, Update, Delete

// Import zależności pozwalającej na incjalizację aplikacji Firebasowej
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

// Import zależności dot. modułu Realtime Databse
import {
    getDatabase,
    set,
    ref,
    get,
    onValue,
    update,
    remove,
    onChildAdded,
    push
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHI9vz9TXlW9Oovmrv0Z7bGHv_xXZYv9w",
    authDomain: "zdfronpol11.firebaseapp.com",
    databaseURL: "https://zdfronpol11-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "zdfronpol11",
    storageBucket: "zdfronpol11.appspot.com",
    messagingSenderId: "680071626825",
    appId: "1:680071626825:web:cba7b4f8d84a73d31b7f98"
};

const app = initializeApp(firebaseConfig);
// Uruchomienie modułu Realtime Database
const database = getDatabase();

// Dostep do elementów UI
const nameInput = document.querySelector('#nameInput');
const messageInput = document.querySelector('#messageInput');
const sendMessageButton = document.querySelector('#sendMessageButton');
const chatAreaDiv = document.querySelector('#chatArea');

sendMessageButton.addEventListener('click', () => {
    // Pobranie imienia użytkownika z inputu
    const userName = nameInput.value;
    // Pobranie wiadomości z inputu
    const userMessage = messageInput.value;
    // Zapisanie imienia oraz wiadomości w bazie danych
    // push -> Dodanie do bazy z automatycznym nadaniem klucza (ID)
    //  1. Gdzie? 2. Co?
    push(ref(database, 'messages'), {
        author: userName,
        message: userMessage
    });
});

// Dodanie obserwatora do folderu 'messages', który będzie informował o zmianach w wiadomościach
onValue(ref(database, 'messages'), (snapshot) => {
    let chatContent = '';
    Object.values(snapshot.val()).forEach((message) => {
        chatContent += `${message.author}: ${message.message}<br>`
    });
    chatAreaDiv.innerHTML = chatContent;
});




