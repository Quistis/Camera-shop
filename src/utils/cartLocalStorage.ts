import { toast } from 'react-toastify';

export const loadCartState = (): number[] => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState) as number[];
  } catch (err) {
    toast.warn('Could not load cart state');
    return [];
  }
};

export const saveCartState = (state: number[]): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    toast.warn('Could not save cart state');
  }
};
