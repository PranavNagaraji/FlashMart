import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react'; // Lucide icon

function Cart() {
    const cartItems = useSelector(state => state.cart.items);
    const uniqueItemsInCart = cartItems.length;

    return (
        <button className="flex flex-col items-center text-sm text-white hover:text-lime-400 transition-all">
            <ShoppingCart className="h-[30px] w-[30px]" />
            <p className="text-base">
                Cart ({uniqueItemsInCart})
            </p>
        </button>
    );
}

export default Cart;
