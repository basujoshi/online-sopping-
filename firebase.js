
import { initializeApp, getApp, getApps } from
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

import { firebaseConfig } from "./firebase-config.js";

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

export {
  firebaseConfig,
  app,
  auth,
  googleProvider,
  database
};

export default app;
