import CartActionType from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionType.TOGGLE_CART_HIDDEN
});

export const addItem = item => ({
    type: CartActionType.Add_ITEM,
    payload: item
})