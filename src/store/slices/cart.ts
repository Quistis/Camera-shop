import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postOrder } from '../api-actions';
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
    postOrderLoadingStatus: boolean;
    postOrderErrorStatus: boolean;
  };
};

const initialState: CartState = {
  cart: {
    cartProducts: [],
    postOrderLoadingStatus: false,
    postOrderErrorStatus: false,
  }
};

const cartSlice = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<TCartItem>) => {
      const existingItem = state.cart.cartProducts.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // existingItem.quantity += action.payload.quantity;
        existingItem.quantity += 1;
      }
      // else {
      //   state.cart.cartProducts.push(action.payload);
      // }
      // const existingItem = state.cart.cartProducts.find((item) => item.id === action.payload.id);
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
  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state) => {
        state.cart.postOrderErrorStatus = false;
        state.cart.postOrderLoadingStatus = true;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.cart.postOrderLoadingStatus = false;
      })
      .addCase(postOrder.rejected, (state) => {
        state.cart.postOrderErrorStatus = true;
        state.cart.postOrderLoadingStatus = false;
      });
  }
});

export const selectCartItems = (state: State): TCartItem[] => state[NameSpace.Cart].cart.cartProducts;

export const selectPostOrderLoadingStatus = (state: State): boolean => state[NameSpace.Cart].cart.postOrderLoadingStatus;
export const selectPostOrderErrorStatus = (state: State): boolean => state[NameSpace.Cart].cart.postOrderErrorStatus;

export const { addProductToCart, setCartProducts, updateProductQuantity, removeProductFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
