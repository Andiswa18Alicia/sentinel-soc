const firebaseConfig = {
  apiKey: "AIzaSyAXsAXojw3yGnsys4PDTI28k4A-WaxBn9k",
  authDomain: "soc-dashboard-e3b9b.firebaseapp.com",
  projectId: "soc-dashboard-e3b9b",
  storageBucket: "soc-dashboard-e3b9b.firebasestorage.app",
  messagingSenderId: "2801008006",
  appId: "1:2801008006:web:1c3644bdedd1b6e7698007"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const DEMO_MODE = false;
