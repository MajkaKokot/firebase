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
    onChildAdded
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

// CREATE (set) -> Zapis do bazy danych
// 1. Gdzie? Baza danych + ścieżka
// 2. Co? JSON
set(ref(database, 'users/uzytkownik1'), {
    username: 'pierwszy użytkownik',
    email: 'user1@mail.com',
    profile_picture: 'https://gravatar.com/avatar/754aff9a816fd9e0de1750c274e10e20?s=400&d=robohash&r=x'
})

// READ -> Odczyt z bazy danych
// Sposób 1: Jednorazowy odczyt danych (get)
//        1.1. Skąd? Baza danych + ścieżka
const userProperties = await get(ref(database, 'users/uzytkownik1'));
if (userProperties.exists()) {
    // Funkcja val() pobiera wartości z danego klucza.
    console.log(userProperties.val());
} else {
    console.log("User not found!");
}

// Sposób 2: Odczyt z bazy danych oraz nasłuchiwanie na zmiany (onValue)
onValue(ref(database, 'users/uzytkownik1'), (snapshot) => {
    console.log(snapshot.val());
})

// UPDATE -> Aktualizowanie danych (update)
// 1. Gdzie? Baza danych + ścieżka
// 2. Co? JSON
update(ref(database, 'users/uzytkownik1'), {
    email: "nowyemail@mail.com",
    phone_number: "000000000"
});

// Jak usunąć konkretny klucz (pole)?
update(ref(database, 'users/uzytkownik1'), {
    phone_number: null
});

// DELETE -> Usuwanie danych (remove)
// 1. Skąd? Baza danych + ścieżka

// Sposób 1: remove <- LEPIEJ W TEN SPOSÓB
// remove(ref(database, 'users/uzytkownik1'));

// Sposób 2: set
// set(ref(database, 'users/uzytkownik1'), null);

// -----------------------------------------------------------------------

// Pobieranie wszystkich danych z danego węzła (folderu)

// Dodanie dodatkowego użytkownika
set(ref(database, 'users/uzytkownik2'), {
    username: 'drugi użytkownik',
    email: 'user2@mail.com',
    profile_picture: 'https://gravatar.com/avatar/754aff9a816fd9e0de1750c274e10e20?s=400&d=robohash&r=x'
})

onValue(ref(database, 'users'), (snapshot) => {
    const allUsersSnapshot = snapshot.val();

    // Jeśli chcemy wyświetlić tylko klucze (ID)
    const usersKeys = Object.keys(allUsersSnapshot);
    console.log(`Na stronie zarejestrowało się ${usersKeys.length} użytkowników.`);

    // Jeśli chcemy wyświetlić właściwości wpisów
    Object.values(allUsersSnapshot).forEach((userProperties) => {
        console.log(userProperties.email);
    });
});

// Nasłuchiwanie na konkretny typ akcji na całym węźle
// https://firebase.google.com/docs/database/web/lists-of-data?hl=en#listen_for_child_events
onChildAdded(ref(database, 'users'), (snapshot) => {
    console.log(snapshot.key);
    console.log(snapshot.val().email);
});

// Dodanie dodatkowego użytkownika
set(ref(database, 'users/uzytkownik5'), {
    username: 'piąty użytkownik',
    email: 'user5@mail.com',
    profile_picture: 'https://gravatar.com/avatar/754aff9a816fd9e0de1750c274e10e20?s=400&d=robohash&r=x'
})

// Ropoznowanie, czy użytkownik jest w trybie Offline
onValue(ref(database, '.info/connected'), (snapshot) => {
    console.log(snapshot.val());
});
