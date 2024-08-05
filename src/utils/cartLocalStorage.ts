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

export const loadCouponState = (): { couponCode: string; discount: number } => {
  try {
    const couponCode = localStorage.getItem('couponCode');
    const discount = localStorage.getItem('discount');
    return {
      couponCode: couponCode ? couponCode : '',
      discount: discount ? Number(discount) : 0
    };
  } catch (err) {
    toast.warn('Could not load coupon state');
    return { couponCode: '', discount: 0 };
  }
};

export const saveCouponState = (couponCode: string, discount: number): void => {
  try {
    localStorage.setItem('couponCode', couponCode);
    localStorage.setItem('discount', discount.toString());
  } catch (err) {
    toast.warn('Could not save coupon state');
  }
};
