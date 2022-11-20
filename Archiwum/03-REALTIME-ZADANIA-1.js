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

// Zadanie 2
set(ref(database, 'products/firebase-course'), {
    title: "Firebase Course",
    duration: 32,
    students: [
        "John",
        "Kate",
        "Steven"
    ]
});

// Zadanie 3
set(ref(database, 'products/react-course'), {
    title: "React Course",
    duration: 48,
    students: [
        "John",
        "Susan"
    ]
});

// Zadanie 4
update(ref(database, 'products/firebase-course'), {
    discount: 0
})

update(ref(database, 'products/react-course'), {
    discount: 0
})

// Zadanie 5
onValue(ref(database, 'products/react-course'), (snapshot) => {
    console.log(snapshot.val())
});

// Zadanie 6
update(ref(database, 'products/react-course'), {
    discount: 30
})

// Zadanie 7
const allCourses = await get(ref(database, 'products'));
Object.values(allCourses.val()).forEach((course) => {
    console.log(course.title);
});

// Zadanie 8
Object.values(allCourses.val()).forEach((course) => {
    console.log(`${course.title}: ${course.students.length}`);
});

// Zadanie 9
const showNumberOfCoursesButton = document.querySelector("#showNumberOfCourses");
const numberOfCoursesDiv = document.querySelector("#numberOfCourses");

showNumberOfCoursesButton.addEventListener("click", async () => {
    const allCoursesSnapshot = await get(ref(database, 'products'));
    if (allCoursesSnapshot.val() === null) {
        numberOfCoursesDiv.innerHTML = 0;
    } else {
        numberOfCoursesDiv.innerHTML = Object.keys(allCoursesSnapshot.val()).length;
    }
});

// Zadanie 10
// remove(ref(database, 'products/react-course'));

// Zadanie 12
const coursesDetailsDiv = document.querySelector("#coursesDetails");
onValue(ref(database, 'products'), (snapshot) => {
    let coursesDescriptions = "";
    Object.values(snapshot.val()).forEach((courseProperties) => {
        coursesDescriptions += `${courseProperties.title}<br/>`
        coursesDescriptions += '<ul>'
        coursesDescriptions += `<li>Duration: ${courseProperties.duration}<br/>`
        coursesDescriptions += `<li>Students: ${courseProperties.students.length}<br/>`
        coursesDescriptions += `<li>Discount: ${courseProperties.discount}<br/>`
        coursesDescriptions += '</ul>'
    });
    coursesDetailsDiv.innerHTML = coursesDescriptions;
});













