import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToWishList } from '../redux/slices/wishListSLice';
import authService from '../services/authService';
import { Heart } from 'lucide-react';
import { saveWishItem } from '../firebase/firebaseHelpers';
import { getAuth } from 'firebase/auth';

function AddToWishList({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = authService.getCurrentUser();
    const alerted = useRef(false);

    const handleClick = async (e) => {
        e.stopPropagation();
        if (!user && !alerted.current) {
            alert('Please login!');
            alerted.current = true;
            navigate('/login');
            return;
        }
        dispatch(addToWishList(product));
        const auth=getAuth();
        const firebaseUser=auth.currentUser;
        if(firebaseUser){
            await saveWishItem(firebaseUser.uid, product);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-md transition-transform hover:scale-105"
            >
                <Heart size={16} className="text-white" />
            </button>
        </>
    );
}

export default AddToWishList;
