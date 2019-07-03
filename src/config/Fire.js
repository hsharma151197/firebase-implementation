import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAclA2hiYzECC1t6GRVN4fqXMlxQmrryQY",
  authDomain: "calendar-4e5d5.firebaseapp.com",
  databaseURL: "https://calendar-4e5d5.firebaseio.com",
  projectId: "calendar-4e5d5",
  storageBucket: "calendar-4e5d5.appspot.com",
  messagingSenderId: "718010153455",
  appId: "1:718010153455:web:2ce4cfdd30f6a9c6"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
