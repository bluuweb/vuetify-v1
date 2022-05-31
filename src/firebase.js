import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB3CisQ4RXjEpQ2lLrUyGIJFDWz4eAESEg",
    authDomain: "mayo-2022-latam-4ee39.firebaseapp.com",
    projectId: "mayo-2022-latam-4ee39",
    storageBucket: "mayo-2022-latam-4ee39.appspot.com",
    messagingSenderId: "82662286039",
    appId: "1:82662286039:web:2a1e89afe41f6b01e60692",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const currentUserPromise = () =>
    new Promise((resolve, reject) => {
        onAuthStateChanged(
            auth,
            (user) => {
                resolve(user);
            },
            (e) => reject(e)
        );
    });

export { auth, currentUserPromise };
