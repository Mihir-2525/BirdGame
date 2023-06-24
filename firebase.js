// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1kHLeOTGefsXcvSLO-VTbUUdJasXGWPs",
    authDomain: "birdkiller-1.firebaseapp.com",
    databaseURL: "https://birdkiller-1-default-rtdb.firebaseio.com",
    projectId: "birdkiller-1",
    storageBucket: "birdkiller-1.appspot.com",
    messagingSenderId: "35131037798",
    appId: "1:35131037798:web:b1d93baf15eb3258fb75a7",
    measurementId: "G-FJQXJ8TCSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

var datadb = firebase.database().ref('BirdKiller');