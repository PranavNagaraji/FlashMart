import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishList } from '../redux/slices/wishListSLice';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../components/AddToCart';
import { HeartOff } from 'lucide-react';
import { removeWishItem } from '../firebase/firebaseHelpers';
import { getAuth } from 'firebase/auth';

function WishList() {
    const wishItems = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = authService.getCurrentUser();
    // const alerted = useRef(false);

    // if (!user && !alerted.current) {
    //     alert('Please login!');
    //     alerted.current = true;
    //     navigate('/login');
    // }
    if (wishItems.length === 0)
        return (
            <h1 className="text-red-600 text-center mt-10 text-xl font-semibold">
                Start adding items to your Wish List!
            </h1>
        );
    const handleClick = (product) => {
        navigate(`/products/${product.category}/${product.id}`);
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 p-8">
            <h2 className="text-slate-100 text-3xl font-bold text-center mb-8">
                Welcome to your Wish List!
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
                {wishItems.map(item => (
                    <div
                        key={item.id}
                        onClick={(e) => handleClick(item)}
                        className="bg-white rounded-xl shadow-md p-4 w-56 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col items-center"
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <h3 className="text-red-600 text-lg font-semibold mt-3 truncate text-center">
                            {item.title}
                        </h3>
                        <p className="text-gray-700 font-medium mt-1 text-center">${item.price}</p>
                        <div className="flex gap-4 mt-4">
                            <AddToCart alert={true} product={item} />
                            <button
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    dispatch(removeFromWishList(item.id));
                                    const auth = getAuth();
                                    const user = auth.currentUser;
                                    if (user) {
                                        await removeWishItem(user.uid, item.id);
                                    }
                                }}
                                aria-label="Remove from wishlist"
                                className="text-red-600 hover:text-red-800 transition-colors"
                            >
                                <HeartOff size={24} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default WishList;
