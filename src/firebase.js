import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBv_GrZfJav69GZU6-2ibvAG88Kj6yyVeQ",
    authDomain: "mayo-2022-latam.firebaseapp.com",
    projectId: "mayo-2022-latam",
    storageBucket: "mayo-2022-latam.appspot.com",
    messagingSenderId: "734618055301",
    appId: "1:734618055301:web:92be31c64f716b0fa4afec",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
