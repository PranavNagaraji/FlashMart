import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setCart } from '../redux/slices/cartSlice';
import { setWishList } from '../redux/slices/wishListSlice';
import { signOut } from 'firebase/auth';

function LoginButton() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login');
    };
    // We define an async function here inside the callback because:
    // 1. Fetching user name depends on the currentUser, which can change on each login.
    // 2. Making the callback itself async would return a Promise, which the observer might not handle properly.
    // Defining and calling an inner async function keeps the callback synchronous
    // and allows us to perform async Firestore fetch safely.
    useEffect(() => {
        const unsubscribe = authService.observeAuth((currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const docRef = doc(db, 'users', currentUser.uid);
                getDoc(docRef).then((docSnap) => {
                    if (docSnap.exists()) {
                        setName(docSnap.data().firstName);
                    }
                }).catch((error) => {
                    console.error("Error fetching user name:", error);
                });
            } else {
                setName('');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        authService.logOut();
        setUser(null);
        dispatch(setCart([]));        // 🔥 Clear cart
        dispatch(setWishList([]));    // 🔥 Clear wishlist
        navigate('/');
    };

    const avatarIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
            stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
        </svg>
    );

    if (!user || !name) {
        return (
            <button
                onClick={handleLogin}
                className="flex flex-col items-center px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-lg transition-all"
            >
                {avatarIcon}
                <p className="text-sm mt-1">Login/Signup</p>
            </button>
        );
    }

    return (
        <button
            onClick={handleLogout}
            className="flex flex-col items-center px-3 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-lg transition-all"
        >
            {avatarIcon}
            <p className="text-sm mt-1">
                {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
            </p>
        </button>
    );
}

export default LoginButton;
