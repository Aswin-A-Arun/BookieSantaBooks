import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyACrRfvUvRfd0lkZ6XUfXRqZuU2BNlH6dE",
    authDomain: "booksanta-39a3e.firebaseapp.com",
    databaseURL: "https://booksanta-39a3e.firebaseio.com",
    projectId: "booksanta-39a3e",
    storageBucket: "booksanta-39a3e.appspot.com",
    messagingSenderId: "932232330857",
    appId: "1:932232330857:web:99a5e3f2b732bdfb032cf8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();