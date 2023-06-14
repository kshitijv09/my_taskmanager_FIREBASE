// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");

firebase.initializeApp({
  // Add your Firebase configuration here
  apiKey: "AIzaSyD4CDDgsrfRI1clr0BGXXe8Oz5OuR_9k9k",
  /*authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,*/
  authDomain: "taskmaanager-ba7fd.firebaseapp.com",
  /* projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, */
  projectId: "taskmaanager-ba7fd",
  /* storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, */
  storageBucket: "taskmaanager-ba7fd.appspot.com",
  /* messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, */
  messagingSenderId: "30671024178",
  /* appId: process.env.REACT_APP_FIREBASE_APP_ID, */
  appId: "1:30671024178:web:eb0c05839382d332348c2b",
});

firebase.messaging();
