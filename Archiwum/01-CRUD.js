import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    getDocs, 
    collection,
    query, 
    where,
    orderBy,
    setDoc,
    updateDoc,
    deleteDoc
} 
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDHI9vz9TXlW9Oovmrv0Z7bGHv_xXZYv9w",
    authDomain: "zdfronpol11.firebaseapp.com",
    projectId: "zdfronpol11",
    storageBucket: "zdfronpol11.appspot.com",
    messagingSenderId: "680071626825",
    appId: "1:680071626825:web:cba7b4f8d84a73d31b7f98"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ZADANIE 7
/*
const docRef = doc(db, "zwierzeta", "1");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}
*/

// ZADANIE 8
/*
const animalsRef = collection(db, "zwierzeta");
const queryForAllAnimals = query(animalsRef);

const queryForAllAnimalsSnapshot = await getDocs(queryForAllAnimals);
queryForAllAnimalsSnapshot.forEach((animalDetails) => {
  console.log(animalDetails.id, " => ", animalDetails.data());
});
*/

// ZADANIE 9
/*
const animalsRef = collection(db, "zwierzeta");
const q = query(animalsRef, where("wymagane_pozwolenie", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    const animalId = doc.id;
    console.log(animalId, " => ", doc.data());
});
*/

// ZADANIE 10
/*
const animalsRef = collection(db, "zwierzeta");
const q = query(animalsRef, orderBy("cena", "desc"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    const animalId = doc.id;
    console.log(animalId, " => ", doc.data());
});
*/

// ZADANIE 11
/*
const data = {
    nazwa: 'piesek',
    cena: 500,
    wymagane_pozwolenie: false
}
await setDoc(doc(db, "zwierzeta", "5"), data);

const docRef = doc(db, "zwierzeta", "5");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    console.log("No such document!");
}
*/

// ZADANIE 12
/*
const docRef = doc(db, "zwierzeta", "5");
let docSnap = await getDoc(docRef);
const price = docSnap.data().cena;

await updateDoc(docRef, {
  cena: price * 0.7
});

docSnap = await getDoc(docRef);

if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    console.log("No such document!");
}
*/

// ZADANIE 13
/*
await deleteDoc(doc(db, "zwierzeta", "5"));

const animalsRef = collection(db, "zwierzeta");
const queryForAllAnimals = query(animalsRef);

const queryForAllAnimalsSnapshot = await getDocs(queryForAllAnimals);
queryForAllAnimalsSnapshot.forEach((animalDetails) => {
  console.log(animalDetails.data().nazwa);
});
*/

// ZADANIE 14
// ZADANIE 15

// Złapanie odpowiedniego DIV z HTMLa
const animalsListDiv = document.querySelector("#animalsList");

// Stworzenie funkcji, która pobiera oraz generuje listę wszystkich zwierząt
const generateAllAnimalsList = async () => {
    // Pobranie listy wszystkich zwierząt z bazy danych
    const allAnimalsSnap = await getDocs(collection(db, "zwierzeta"));

    // Wygenerowanie HTMLa z listą wszystkich zwierząt
    let animalsListContent = "<ul>";

    allAnimalsSnap.forEach((animal) => {
        const data = animal.data();
        animalsListContent += `<li>${data.nazwa}, 
            cena: <input type="number" data-id=${animal.id} value=${data.cena} class="inputPriceUpdate"> 
            <button type="button" data-id=${animal.id} class="btnDelete">Usuń</button>
            </li>`
    })

    animalsListContent += "</ul>"

    // Umieszczenie wygenerowanego HTMLa na stronie (w tym konkretnym DIVie)
    animalsListDiv.innerHTML = animalsListContent;

    // Pobranie wszystkich elementów z class=inputPriceUpdate
    const inputsPriceUpdate = document.querySelectorAll(".inputPriceUpdate");
    
    // Podpięcie funkcji aktualizującej cenę zwierzęcia w bazie danych
    inputsPriceUpdate.forEach((input) => {
        input.addEventListener("change", updateAnimalPriceInDatabase);
    });

    // Pobranie wszystkich elementów z class=btnDelete
    const btnsDelete = document.querySelectorAll(".btnDelete");

    // Podpięcie funkcji usuwającej zwierzę z bazy danych
    btnsDelete.forEach((btn) => {
        btn.addEventListener("click", deleteAnimalFromDatabase)
    });
}

generateAllAnimalsList();

// Stworzenie funkcji odpowiedzialnej za usunięcie elementu z bazy danych
const deleteAnimalFromDatabase = async (animalPointerEvent) => {
    const animalId = animalPointerEvent.target.dataset.id;
    console.log(animalId);
    await deleteDoc(doc(db, "zwierzeta", animalId));

    generateAllAnimalsList();
};

// Stworzenie funkcji odpowiedzialnej za aktualizację ceny elementu w bazie danych
const updateAnimalPriceInDatabase = async (animalPriceInput) => {
    // Pobranie nowej ceny z inputa z UI
    const newPrice = Number(animalPriceInput.target.value);

    // Pobranie identyfikatora zwierzęcia
    const animalId = animalPriceInput.target.dataset.id;
    
    // Stworzenie wskaźnika, o który element w bazie nam chodzi
    const animalRef = doc(db, "zwierzeta", animalId);

    await updateDoc(animalRef, {
        cena: newPrice
    });
}























