import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../services/authService';
import { auth, db } from '../firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { setCart } from '../redux/slices/cartSlice';
import { setWishList } from '../redux/slices/wishListSlice';    
import {fetchCartItems, fetchWishItems } from '../firebase/firebaseHelpers';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    const loadUserData= async (uid)=>{
        const cart=await fetchCartItems(uid);
        const wish=await fetchWishItems(uid);

        dispatch(setCart(cart));
        dispatch(setWishList(wish));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.logIn(email, password);
            const uid=auth.currentUser.uid;
            await loadUserData(uid);
            alert('Login Successful!');
            navigate('/');
            setEmail('');
            setPassword('');
        }
        catch (err) {
            if (err.code === 'auth/user-not-found') {
                alert('No account found with this email, Redirecting to sign up Page');
                navigate('/signup');
            }
            else {
                setError(err.message);
            }
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        try {
            await authService.signInWithProvider();
            const uid = auth.currentUser.uid;
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                await loadUserData(uid);
                alert("Login successful");
                navigate("/");
            } else {
                await signOut(auth);
                alert('No account found with this email, Redirecting to sign up Page');
                navigate('/signup');
            }
        }
        catch (err) {
            setError(err.message);
        }
    };

    const goToSignUp = () => navigate('/signup');

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full bg-white rounded-lg shadow-xl p-8"
            >
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Login</h2>

                {error && <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>}

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-gray-700 font-semibold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-gray-700 font-semibold">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md transition"
                    >
                        Log In
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition"
                    >
                        Log In with Google
                    </button>
                </div>

                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{' '}
                    <button
                        type="button"
                        onClick={goToSignUp}
                        className="text-teal-600 hover:underline focus:outline-none"
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
}

export default LoginPage; 