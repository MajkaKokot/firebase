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
​
const firebaseConfig = {
    apiKey: "AIzaSyDHI9vz9TXlW9Oovmrv0Z7bGHv_xXZYv9w",
    authDomain: "zdfronpol11.firebaseapp.com",
    projectId: "zdfronpol11",
    storageBucket: "zdfronpol11.appspot.com",
    messagingSenderId: "680071626825",
    appId: "1:680071626825:web:cba7b4f8d84a73d31b7f98"
};
​
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
​
// ZADANIE 7
/*
const docRef = doc(db, "zwierzeta", "1");
const docSnap = await getDoc(docRef);
​
if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}
*/
​
// ZADANIE 8
/*
const animalsRef = collection(db, "zwierzeta");
const queryForAllAnimals = query(animalsRef);
​
const queryForAllAnimalsSnapshot = await getDocs(queryForAllAnimals);
queryForAllAnimalsSnapshot.forEach((animalDetails) => {
  console.log(animalDetails.id, " => ", animalDetails.data());
});
*/
​
// ZADANIE 9
/*
const animalsRef = collection(db, "zwierzeta");
const q = query(animalsRef, where("wymagane_pozwolenie", "==", true));
​
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    const animalId = doc.id;
    console.log(animalId, " => ", doc.data());
});
*/
​
// ZADANIE 10
/*
const animalsRef = collection(db, "zwierzeta");
const q = query(animalsRef, orderBy("cena", "desc"));
​
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    const animalId = doc.id;
    console.log(animalId, " => ", doc.data());
});
*/
​
// ZADANIE 11
/*
const data = {
    nazwa: 'piesek',
    cena: 500,
    wymagane_pozwolenie: false
}
await setDoc(doc(db, "zwierzeta", "5"), data);
​
const docRef = doc(db, "zwierzeta", "5");
const docSnap = await getDoc(docRef);
​
if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    console.log("No such document!");
}
*/
​
// ZADANIE 12
/*
const docRef = doc(db, "zwierzeta", "5");
let docSnap = await getDoc(docRef);
const price = docSnap.data().cena;
​
await updateDoc(docRef, {
  cena: price * 0.7
});
​
docSnap = await getDoc(docRef);
​
if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
} else {
    console.log("No such document!");
}
*/
​
// ZADANIE 13
/*
await deleteDoc(doc(db, "zwierzeta", "5"));
​
const animalsRef = collection(db, "zwierzeta");
const queryForAllAnimals = query(animalsRef);
​
const queryForAllAnimalsSnapshot = await getDocs(queryForAllAnimals);
queryForAllAnimalsSnapshot.forEach((animalDetails) => {
  console.log(animalDetails.data().nazwa);
});
*/