import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

import {
    getDatabase,
    set,
    ref,
    get,
    onValue,
    /*update,
    remove,
    onChildAdded*/
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDK2vzFmPthj9gTtR6NU5jttMm-KTztYuA",
    authDomain: "realtimemajka.firebaseapp.com",
    databaseURL: "https://realtimemajka-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "realtimemajka",
    storageBucket: "realtimemajka.appspot.com",
    messagingSenderId: "925274368549",
    appId: "1:925274368549:web:8a93f0e3400e54b33aadcc",
    measurementId: "G-R46CH7JEBG"
  };
  
  const app = initializeApp(firebaseConfig);
  set(ref(database, 'products/firebase-course'), {
    title: 'Firebase Course',
    duration: 32,
    students: [
      "John",
      "Kate",
      "Steven"
      ]
  });

  
  set(ref(database, 'products/react-course'), {
    title: 'React Course',
    duration: 48,
    students: [
      "John",
      "Susan",
      ]
  });

  update(ref(database, )) 



  