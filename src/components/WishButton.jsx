import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react'; // Lucide wishlist icon

function WishButton() {
    const wishItems = useSelector(state => state.wishlist.items);
    const itemCount = wishItems.length;

    return (
        <button className="flex flex-col items-center text-sm text-white hover:text-pink-400 transition-all">
            <Heart className="h-[30px] w-[30px]" />
            <p className="text-base">
                Wishlist ({itemCount})
            </p>
        </button>
    );
}

export default WishButton;
