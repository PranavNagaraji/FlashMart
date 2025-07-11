import { db } from './firebaseConfig';
import { doc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';

export const saveCartItem = async (uid, item) => {
    await setDoc(doc(db, `users/${uid}/cartItems`, item.id.toString()), item);
};

export const removeCartItem = async (uid, itemId) => {
    await deleteDoc(doc(db, `users/${uid}/cartItems`, itemId.toString()));
};

export const fetchCartItems = async (uid) => {
    const snapshot = await getDocs(collection(db, `users/${uid}/cartItems`));
    return snapshot.docs.map(doc => doc.data());
};

export const saveWishItem = async (uid, item) => {
    await setDoc(doc(db, `users/${uid}/wishlistItems`, item.id.toString()), item);
};

export const removeWishItem = async (uid, itemId) => {
    await deleteDoc(doc(db, `users/${uid}/wishlistItems`, itemId.toString()));
};

export const fetchWishItems = async (uid) => {
    const snapshot = await getDocs(collection(db, `users/${uid}/wishlistItems`));
    return snapshot.docs.map(doc => doc.data());
};
