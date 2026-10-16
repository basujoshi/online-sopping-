
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnhrwURi_QBoYcJBAeSdhd38DOXp6V6zk",
  authDomain: "online-shoping-71415.firebaseapp.com",
  databaseURL: "https://online-shoping-71415-default-rtdb.firebaseio.com",
  projectId: "online-shoping-71415",
  storageBucket: "online-shoping-71415.firebasestorage.app",
  messagingSenderId: "310608576293",
  appId: "1:310608576293:web:23b2e1e41c4e6b1166a4cc",
  measurementId: "G-CKG27QE8L3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

let analytics = null;
isSupported()
  .then((supported) => {
    if (supported) analytics = getAnalytics(app);
  })
  .catch(console.error);

export { app, auth, googleProvider, database, analytics };
export default app;
