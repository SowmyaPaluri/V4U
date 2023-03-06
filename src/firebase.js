// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDFXL9cEOvhYP0cX4s-U8SbUBGDN26DF18",
//   authDomain: "we4you-22e0f.firebaseapp.com",
//   projectId: "we4you-22e0f",
//   storageBucket: "we4you-22e0f.appspot.com",
//   messagingSenderId: "894114212892",
//   appId: "1:894114212892:web:6db13f93ae923bf13243d9"
// };
// {
//   "type": "service_account",
//   "project_id": "weforyou2-2abd5",
//   "private_key_id": "da02f3c3f2798bb822fc94d74274301a8f69f7e5",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDY7lya/Wu3tAJa\nBEcaV/J9pxTCgAV05sU7yJncn7PiZZu8CCUEcZgZmDSnwWYr0aIngu+iP5QJpt8Z\nbNLkil1lk8TIXNlvtoLP3He2caYsekU+2KMgKNkmKNbAJ6MOiEYaJndnctYd3Cfi\nhloloCAAtEbZnZFRUy2Q1AffhSHHvkxhUZD0U7uWO3llHZduaPiemFOjG5Y4lGKN\nWCRSLpZut2U6hLxOE7dwM2g06SasCnN8EgJ6q39ZVIa0rnAs8WpIY2A+7sl2s7yD\ntUgpfelGZdrBCp7n3zS/wmW0xNajpIN76vTjPuLEdGp4NrIVzhwf7h6QjF2n5xYT\n3kM0SbIfAgMBAAECggEAYQY7ZRbzlrZsVtaS9rVfP9P69QNNbXvJu3N9XbAQRLIt\ndWwvIk2sOcZZxq45hF++pu1pQKgvDiIUpsqFiLJaE5SD7xmYJt76ov14jaFHMZ1+\nWx2J2FhsxyR86HTR+S36LLgHr70tBy3wqOBucWWs6qO3DJ3s4PLS7nPnEZH6Cdu/\n4oNsT9gmtI/ROv+Ef9LsY+4Ls40n4cqK86FPFQPyxcO6pC2dPFVloxyKJu2Gcy/t\ngHXE+/OsQImaTm6b14B57prL6zYgXBzUeQc91mdLKC4jzi+lbGWYVfFWGiSLIesF\nmghJgy/W6yAfrfPo+1LaXM+4GhI3Kq7cc7m8tdycAQKBgQD+YKg5f7xLsnuKmT6w\nyCPSD7bYQlzZVfiTwh4AiZSzc2C/qtZpSlcaXmtOr+VGRTokooWjD5fXdq3atTWE\nuUV44iuOFiBzNwNlVE3ypAHptB2k8P+yOBLGy+zYy8PKo6SZmi0iXPp/jwdDDa+t\ngiFqNdZmqugm4Rj++Aj1fgAH/QKBgQDaUJAPLq7+3s1MDAEAXfXzxfx0YIcpeIa8\nXUk1MhOrj4svRhtOvE7DJMRZxM7wU1WcrjNzqk1viL+XG1eShm2/PcrfhZL8qDzF\nqrCi9PNSKUH1AZ6YmVggTBBqJ6dJ/LtgVeHYA4fK8DHPiahazUh0A2/ZoMzd7iiU\nAwuoZ9A3SwKBgDTtX5M3JLKLXHEmGYkm220ln+G3TSJbZPE5foyWE76SzxqSLTKT\nKTRvWNxydL3+QW7F8hBPekR2iQ3sjkojUnUoee+CYxYV6Dr5I47M2SkLNO/QxSML\nz7xVSd6B5ycOjXz4O1PfDK/lzpkBDACKBvHWadnKzarpQw4qBZMuuErxAoGBAKp4\nGeUhCNhPVXM6NFX7CKBvSq/8583EJUFUfmOhVKa0EXS6g3w5oi7SuNd3zDbwe3s6\ns0ZwBsM+vovZd8ocWfno4E8lWB8dp0aaAA9ewdi4Cp6rwxFZO+0MOA0MJZ6qUA3r\nQcyRBSm74Mkzrlgoz5h3TpFa9F2fJ+RbdHDtjzJ9AoGAVY2HKvKRShuCuHXBd2Wj\n9f8nf3ANbRym1AqdUv5JTbsYT2y28vRdem6J8tYYwCxbrvRaok5wZzUdyZDUWilO\nv6AckKpYJqfffNva68TmfxRlxkkpp8vDMhZ1NZ9teYLZJAtDYyyxy+UiqchOIIy3\nIHHUNijjBMQqL4Z7dMosrok=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-yqs09@weforyou2-2abd5.iam.gserviceaccount.com",
//   "client_id": "109268452704670633494",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yqs09%40weforyou2-2abd5.iam.gserviceaccount.com"
// }

// Initialize Firebasenpm install firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// export {auth, db};

import { initializeApp } from "firebase/app";


import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "da02f3c3f2798bb822fc94d74274301a8f69f7e5",
//   authDomain: "weforyou2-2abd5.firebaseapp.com",
//   projectId: "weforyou2-2abd5",
//   storageBucket: "weforyou2-2abd5.appspot.com",
//   messagingSenderId: "109268452704670633494",
//   appId: "1:894114212892:web:6db13f93ae923bf13243d9"
// }
// import firebase from 'firebase./app'
const firebaseConfig = {
  apiKey: "AIzaSyCg2ptw2ZuvBu0qE9Jlq4pmxrT0HyasBvo",
  authDomain: "weforyou2-2abd5.firebaseapp.com",
  projectId: "weforyou2-2abd5",
  storageBucket: "weforyou2-2abd5.appspot.com",
  messagingSenderId: "995928750727",
  appId: "1:995928750727:web:6c73915899d75258c71622",
  measurementId: "G-7THYK46YH0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
export default app;