import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                if (existingItem.quantity == 1) {
                    alert(`The item "${item.title}" is going to be removed from your cart`);
                }
                existingItem.quantity -= 1;
                if (existingItem.quantity == 0)
                    state.items = state.items.filter(i => i.id !== item.id);
            }
        },
        setCart(state, action) {
            state.items = action.payload;
        }
    }
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;