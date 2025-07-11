import { auth } from '../firebase/firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
const logOut = () => signOut(auth);
const observeAuth = callback => onAuthStateChanged(auth, callback);
const getCurrentUser = () => auth.currentUser;

const googleProvider = new GoogleAuthProvider();
const signInWithProvider = () => signInWithPopup(auth, googleProvider);

export default {
    signUp,
    logIn,
    logOut,
    observeAuth,
    getCurrentUser,
    signInWithProvider
};