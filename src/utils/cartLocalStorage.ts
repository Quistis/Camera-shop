import { toast } from 'react-toastify';
import { TCartItem } from '../store/slices/cart';

export const loadCartState = (): TCartItem[] => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState) as TCartItem[];
  } catch (err) {
    toast.warn('Could not load cart state');
    return [];
  }
};

export const saveCartState = (state: TCartItem[]): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    toast.warn('Could not save cart state');
  }
};
