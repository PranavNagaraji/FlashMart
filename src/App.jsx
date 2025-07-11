// Routes is a container that holds all your route definitions.
// It’s like a manager that looks at the current URL and decides which Route to show.
// Route defines a single route — it maps a URL path to a React component to render.

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Navbar from './components/Navbar.jsx';
import CartPage from './pages/CartPage.jsx';
import WishList from './pages/WishList.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import UserDetails from './pages/UserDetails.jsx';
import useSyncUserData from './hooks/useSyncUserData.jsx';

function App() {
    useSyncUserData();
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products/:category' element={<ProductList />} />
                <Route path='/products/:category/:productId' element={<ProductDetails />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/wishlist' element={<WishList />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/userdetails' element={<UserDetails />} />
            </Routes>
        </>
    );
}

export default App;