import firebase from 'firebase/compat/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBMbD2hyMnjtL3vhmkjmpNZwdX4BicZqjs",
    authDomain: "weforyou-c02ba.firebaseapp.com",
    projectId: "weforyou-c02ba",
    storageBucket: "weforyou-c02ba.appspot.com",
    messagingSenderId: "290764153007",
    appId: "1:290764153007:web:ffc0727c8b894e8fbd345a",
    measurementId: "G-WSPWNQE93H"
};

firebase.initializeApp(firebaseConfig);
export default firebase;