importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDFgt1PILuOB7EVGIN8Vs_u1Il-DrKl8pE",
    authDomain: "stb-c54bc.firebaseapp.com",
    databaseURL: "https://stb-c54bc-default-rtdb.firebaseio.com",
    projectId: "stb-c54bc",
    storageBucket: "stb-c54bc.appspot.com",
    messagingSenderId: "555909967171",
    appId: "1:555909967171:web:067241dd6d3e5b520713f6",
    measurementId: "G-YSB145TE7E"
});
const messaging = firebase.messaging();