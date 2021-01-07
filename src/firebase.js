import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDvM13HPwa4rC6az5tMBWCsARZy6f2kN00",
    authDomain: "whatsapp-24799.firebaseapp.com",
    databaseURL: "https://whatsapp-24799.firebaseio.com",
    projectId: "whatsapp-24799",
    storageBucket: "whatsapp-24799.appspot.com",
    messagingSenderId: "610962840135",
    appId: "1:610962840135:web:6111be07a52342f7516f62"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

//const db =firebaseApp.firestore();
const auth=firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
//export default db;