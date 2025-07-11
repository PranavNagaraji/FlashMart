import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { saveCartItem, removeCartItem } from '../firebase/firebaseHelpers';

function CartPage() {
    const auth = getAuth();
    const user = auth.currentUser;
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (product) => {
        navigate(`/products/${product.category}/${product.id}`);
    };

    const subTotal = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    const tax = subTotal * 0.08;
    const discount = (subTotal + tax) * 0.05;
    const total = subTotal + tax - discount;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-red-600 text-3xl font-semibold">Your Cart is empty!</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
                Your Shopping Cart
            </h2>

            <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
                {/* Summary Box */}
                <aside className="sticky top-20 self-start bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-sm text-gray-800">
                    <h3 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">Summary</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-lg">
                            <span>Sub-Total</span>
                            <span>${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span>Tax (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg text-green-600 font-semibold">
                            <span>Discount (5%)</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-2xl font-extrabold border-t border-gray-300 pt-4">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </aside>

                {/* Cart Items */}
                <section className="flex flex-wrap justify-center gap-8 flex-1">
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => handleClick(item)}
                            className="cursor-pointer w-64 bg-white rounded-xl shadow-md p-5 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-44 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl text-red-600 font-semibold mb-2 text-center truncate">
                                {item.title}
                            </h3>
                            <p className="text-gray-700 font-semibold mb-3">${item.price}</p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        dispatch(removeFromCart(item));

                                        if (user) {
                                            const updatedItem = cartItems.find(i => i.id === item.id);
                                            if (!updatedItem || updatedItem.quantity <= 1) {
                                                await removeCartItem(user.uid, item.id);
                                            } else {
                                                await saveCartItem(user.uid, { ...item, quantity: updatedItem.quantity - 1 });
                                            }
                                        }
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-full font-bold flex items-center justify-center shadow-md transition"
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>

                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-12 h-9 bg-gray-100 border border-gray-300 rounded flex items-center justify-center font-semibold text-lg select-none"
                                >
                                    {item.quantity}
                                </div>

                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        dispatch(addToCart(item));
                                        if (user) {
                                            const quantity = item.quantity + 1;
                                            await saveCartItem(user.uid, { ...item, quantity });
                                        }
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white w-9 h-9 rounded-full font-bold flex items-center justify-center shadow-md transition"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default CartPage;
