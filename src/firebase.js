import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCLBBxCEHVYg1-Vx-Op1WfixETqSkjeG0I",
    authDomain: "diplomabachelor-ac814.firebaseapp.com",
    databaseURL: "https://diplomabachelor-ac814.firebaseio.com",
    projectId: "diplomabachelor-ac814",
    storageBucket: "diplomabachelor-ac814.appspot.com",
    messagingSenderId: "704738862486",
    appId: "1:704738862486:web:60ea3ecfc853762e38a9b7",
    measurementId: "G-9RQZX54GHV"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;