
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA8jHjXXFI7_MWGzPZei9SJCLkWmWJBngI",
  authDomain: "whatsapp-clone-6fe31.firebaseapp.com",
  projectId: "whatsapp-clone-6fe31",
  storageBucket: "whatsapp-clone-6fe31.appspot.com",
  messagingSenderId: "18664184",
  appId: "1:18664184:web:26396231ebab60ab34890d",
  measurementId: "G-YX93VX5P7N"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth,provider};
export default db;