import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { ShoppingCart } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import { saveCartItem } from '../firebase/firebaseHelpers';

function AddToCart({ product, alert: showAlert }) {
    const dispatch = useDispatch();
    return (
        <button
            onClick={async (e) => {
                e.stopPropagation();
                dispatch(addToCart(product));
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const quantity = (product.quantity || 0) + 1;
                    await saveCartItem(user.uid, { ...product, quantity });
                }
                if (showAlert)
                    alert(`You have succesfully added a "${product.title}" into your cart!`);
            }}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-md transition-transform hover:scale-105"
        >
            <ShoppingCart size={16} className="text-white" />
        </button>
    );
}

export default AddToCart;
