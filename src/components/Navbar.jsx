import { Link } from 'react-router-dom';
import Cart from './Cart.jsx';
import WishButton from './WishButton.jsx';
import LoginButton from './LoginButton.jsx';
import { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 hover:text-yellow-400 transition duration-200">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-yellow-400"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-2xl font-bold tracking-wide">FlashMart</span>
                </Link>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                            />
                        </svg>
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/login"><LoginButton /></Link>
                    <Link to="/wishlist"><WishButton /></Link>
                    <Link to="/cart"><Cart /></Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 flex flex-col items-start gap-4 px-4">
                    <Link to="/login" onClick={() => setIsOpen(false)}><LoginButton /></Link>
                    <Link to="/wishlist" onClick={() => setIsOpen(false)}><WishButton /></Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)}><Cart /></Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

