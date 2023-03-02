import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA55HDqBlapiQEzUgGjMU9mW1Dg31990BM",
  authDomain: "my-wallet-8d771.firebaseapp.com",
  projectId: "my-wallet-8d771",
  storageBucket: "my-wallet-8d771.appspot.com",
  messagingSenderId: "553345586039",
  appId: "1:553345586039:web:778de95fec223f53368772",
  measurementId: "G-TF1435JFWS"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db 