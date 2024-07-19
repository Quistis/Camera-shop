import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

// type TCartItem = {
//   id: number;
//   quantity: number;
// };

type CartState = {
  cart: {
    cartProductIds: number[];
  };
};

const initialState: CartState = {
  cart: {
    cartProductIds: [],
  }
};

const cartSlice = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<number>) => {
      state.cart.cartProductIds.push(action.payload);
    },
    setCartProducts: (state, action: PayloadAction<number[]>) => {
      state.cart.cartProductIds = action.payload;
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const indexToRemove = state.cart.cartProductIds.indexOf(action.payload);
      if (indexToRemove !== -1) {
        state.cart.cartProductIds.splice(indexToRemove, 1);
      }
    },
  },
});

export const selectCartProductIds = (state: State): number[] => state[NameSpace.Cart].cart.cartProductIds;

export const { addProductToCart, setCartProducts, removeProductFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
