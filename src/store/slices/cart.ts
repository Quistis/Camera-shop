import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { NameSpace } from '../../const';

export type TCartItem = {
  id: number;
  quantity: number;
  price: number;
};

type CartState = {
  cart: {
    cartProducts: TCartItem[];
  };
};

const initialState: CartState = {
  cart: {
    cartProducts: [],
  }
};

const cartSlice = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<TCartItem>) => {
      // const existingItem = state.cart.cartProducts.find((item) => item.id === action.payload.id);
      // if (existingItem) {
      //   existingItem.quantity += action.payload.quantity;
      // } else {
      //   state.cart.cartProducts.push(action.payload);
      // }
      const existingItem = state.cart.cartProducts.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.cart.cartProducts.push(action.payload);
      }
    },
    setCartProducts: (state, action: PayloadAction<TCartItem[]>) => {
      state.cart.cartProducts = action.payload;
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      state.cart.cartProducts = state.cart.cartProducts.filter((item) => item.id !== action.payload);
    },
    updateProductQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const existingItem = state.cart.cartProducts.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
  },
});

export const selectCartItems = (state: State): TCartItem[] => state[NameSpace.Cart].cart.cartProducts;

export const { addProductToCart, setCartProducts, updateProductQuantity, removeProductFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
