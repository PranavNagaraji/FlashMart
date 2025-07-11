import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { auth, db } from '../firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await authService.signUp(email, password);
            alert('Signup successful! Please fill out your details.');
            navigate('/userdetails');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        setError('');
        try {
            await authService.signInWithProvider();
            const uid = auth.currentUser.uid;
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                alert('Account already exists, redirecting to home.');
                navigate('/');
            } else {
                alert('Google signup successful, please fill out your details.');
                navigate('/userdetails');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full bg-white rounded-lg shadow-xl p-8"
            >
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Sign Up</h2>

                {error && (
                    <p className="text-red-500 mb-4 text-center font-semibold">
                        {error}
                    </p>
                )}

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-gray-700 font-semibold"
                    >
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
                    <label
                        htmlFor="password"
                        className="block mb-2 text-gray-700 font-semibold"
                    >
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
                        Sign Up
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition"
                    >
                        Sign Up with Google
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;