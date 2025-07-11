import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function UserDetailsPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setEmail(user.email);
            else navigate('/login');
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user) {
            alert("User not authenticated");
            return;
        }

        try {
            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email: user.email,
                phone,
                dob,
            });
            alert('Details saved successfully!');
            navigate('/');
        } catch (err) {
            console.error("Error saving user details:", err);
            alert("Failed to save details.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full bg-white rounded-lg shadow-xl p-8"
            >
                <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">User Details</h2>

                <div className="mb-4">
                    <label htmlFor="firstName" className="block mb-2 font-semibold text-gray-700">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block mb-2 font-semibold text-gray-700">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700">Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dob" className="block mb-2 font-semibold text-gray-700">Date of Birth</label>
                    <input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-200 border border-gray-300 rounded-md cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-md transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default UserDetailsPage;
