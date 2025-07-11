import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { fetchCartItems, fetchWishItems } from '../firebase/firebaseHelpers';
import { setCart } from '../redux/slices/cartSlice';
import { setWishList } from '../redux/slices/wishListSlice';

const useSyncUserData = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const cart = await fetchCartItems(user.uid);
                const wish = await fetchWishItems(user.uid);
                dispatch(setCart(cart));
                dispatch(setWishList(wish));
            }
        });

        return () => unsubscribe();
    }, []);
};

export default useSyncUserData;