// 1. Importowanie bibliotek/zależności
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { 
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    collection,
    query,
    where,
    orderBy,
    updateDoc,
    deleteDoc
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';

// 2. Dodanie konfiguracji
const firebaseConfig = {
    apiKey: "AIzaSyDHI9vz9TXlW9Oovmrv0Z7bGHv_xXZYv9w",
    authDomain: "zdfronpol11.firebaseapp.com",
    projectId: "zdfronpol11",
    storageBucket: "zdfronpol11.appspot.com",
    messagingSenderId: "680071626825",
    appId: "1:680071626825:web:cba7b4f8d84a73d31b7f98"
};

// 3. Incjalizowanie modułów
const app = initializeApp(firebaseConfig);

// FIRESTORE: https://firebase.google.com/docs/firestore?authuser=0&hl=en

// 4. Podłączenie modułu Firestore Database
const db = getFirestore(app);

// CRUD -> Create, Read, Update, Delete

// READ: Pobranie danych z bazy danych

// 5. Pobranie informacji o konkretnej książce
const collectionName = 'ksiazki';
const documentId = '1';

// 5.1. Stworzenie wskaźnika, o który dokument nam chodzi
const docRef = doc(db, collectionName, documentId);
// 5.2. Pobranie danych z dokumentu wskazanego przez wskaźnik
const docSnap = await getDoc(docRef); // docSnap = document snapshot
// 5.3. Wyświetlenie danych
if (docSnap.exists()) {
    console.log(docSnap.data());
} else {
    console.log('Book not found!')
}

// CREATE: Dodawanie danych do bazy danych

// 6. Dodanie nowej książki

// 6.1. Ręczne nadawanie ID
const bookRef = doc(db, collectionName, '3');
const book = {
    tytul: 'Lalka',
    cena: 70,
    czy_w_sprzedazy: true,
    ile_sztuk: 40
};
setDoc(bookRef, book);

// 6.2. Automatyczne nadawanie ID
const booksCollectionRef = collection(db, collectionName);
const book2 = {
    tytul: 'Lalka 2',
    cena: 170,
    czy_w_sprzedazy: false,
    ile_sztuk: 0
};
const createdBook = await addDoc(booksCollectionRef, book2);
console.log(createdBook.id)

// 7. Wyświetlenie w konsoli tytułów wszystkich książek

// 7.1. Wskazanie kolekcji, z której chcemy pobrać dane
const queryAllBooks = query(booksCollectionRef);
// const queryAllBooks = query(collection(db, collectionName));

// 7.2. Pobranie danych wszystkich książek
const queryAllBooksSnap = await getDocs(queryAllBooks);
// Chcąc przejść przez wszystkie elementy możemy wykorzystać
// np. pętlę FOR, czy funkcję forEach
queryAllBooksSnap.forEach(singleBookSnap => {
    console.log(singleBookSnap.data().tytul);
});

// 8. Wyświetlenie w konsoli tytułów dostępnych książek

// 8.1. Wskazanie kolekcji, z której chcemy pobrać dane
const queryAvailableBooks = query(booksCollectionRef, 
    //where('czy_w_sprzedazy', '==', true),
    //orderBy('cena', 'asc')); // asc -> ascending (domyślne)
    orderBy('cena', 'desc')); // desc -> descending
const queryAvailableBooksSnap = await getDocs(queryAvailableBooks);

queryAvailableBooksSnap.forEach(singleBookSnap => {
    console.log(`Książka ${singleBookSnap.data().tytul} za ${singleBookSnap.data().cena} PLN`);
})

// UPDATE: Aktualizowanie danych z bazy danych

// 9. Zmiana ceny dokumentu o ID=1 na 15 PLN

// 9.1. Wskazanie, o który dokument nam chodzi
const bookForUpdateRef = doc(db, collectionName, '1');
const bookForUpdate = {
    cena: 15,
    czy_bestseller: true
};

await updateDoc(bookForUpdateRef, bookForUpdate);

// DELETE: Usuwanie danych z bazy danych

// 10. Usunięcie książki na stałe z bazy danych

// 10.1. Wskazanie, którą książkę chcemy usunąć
const bookForDeleteRef = doc(db, collectionName, '03a3C5vT7jooV99tErHS');

// 10.2. Usunięcie książki
await deleteDoc(bookForDeleteRef);

// 11. Wyświetlenie na liście tytułów wszystkich książek
let booksList = "<ul>";
queryAllBooksSnap.forEach(singleBookSnap => {
    booksList += `<li>${singleBookSnap.data().tytul}</li>`
});
booksList += '</ul>';

const booksListDiv = document.querySelector('#booksList');
booksListDiv.innerHTML = booksList;