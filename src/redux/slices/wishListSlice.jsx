import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishList(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id == item.id);
            if (existingItem)
                alert(`The product ${item.title} is already in Wish List!`)
            else
                state.items.push(item);
        },
        removeFromWishList(state, action) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        setWishList(state, action) {
            state.items = action.payload;
        }
    }
})

export const { addToWishList, removeFromWishList, setWishList } = wishListSlice.actions;
export default wishListSlice.reducer;