import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

  let firebaseConfig = {
    apiKey: "AIzaSyBnpVFFXB9QFExduPYZWkNeFWI1UnTGYRY",
    authDomain: "projectreact-ca26b.firebaseapp.com",
    databaseURL: "https://projectreact-ca26b.firebaseio.com",
    projectId: "projectreact-ca26b",
    storageBucket: "projectreact-ca26b.appspot.com",
    messagingSenderId: "454501770674",
    appId: "1:454501770674:web:96af80ca841847def1f0ab",
    measurementId: "G-89YTD1LR4G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;

export default firebase;