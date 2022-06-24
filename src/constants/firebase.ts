import firebase from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const configuration = {
  apiKey: "AIzaSyAYw0qXkU58JTMTYkJ2-3mC9x1Uz2hkf4A",
  authDomain: "kc-deliveriers.firebaseapp.com",
  projectId: "kc-deliveriers",
  storageBucket: "kc-deliveriers.appspot.com",
  messagingSenderId: "892848806633",
  appId: "1:892848806633:web:31911dfa0096b48c32ae78",
  measurementId: "G-09T09C89CT",
};

const app = firebase.initializeApp(configuration);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
