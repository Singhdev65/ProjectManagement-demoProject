import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCIq6h9s3FwV4XruNfzbKueTT4_QegVjxY",
  authDomain: "fir-project-dashboard.firebaseapp.com",
  projectId: "fir-project-dashboard",
  storageBucket: "fir-project-dashboard.appspot.com",
  messagingSenderId: "47633692799",
  appId: "1:47633692799:web:753e0034f9a70c81fee74a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default db;
