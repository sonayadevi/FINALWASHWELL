// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVzd6F2by5J5HLVZBGodTMYQrkLAJSFdY",
  authDomain: "washmate-3437f.firebaseapp.com",
  projectId: "washmate-3437f",
  storageBucket: "washmate-3437f.appspot.com",
  messagingSenderId: "847853767794",
  appId: "1:847853767794:web:8f4598887e1101999646eb",
  measurementId: "G-GZ5X23XLS1"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app();
}

const auth = firebase.auth();

const db = app.firestore();

export { auth, db };