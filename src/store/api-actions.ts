import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { TCamerasCard } from '../types/cameras';
import { TReview } from '../types/reviews';
import { APIRoute } from '../const';
import { TImagePreview } from '../types/banners';

type TOrder = {
  camerasIds: number[];
  coupon: string | null;
};

type TReviewWithoutId = Omit<TReview, 'id' | 'createAt'>;

export const fetchCameras = createAsyncThunk<TCamerasCard[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchCameras',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TCamerasCard[]>(APIRoute.Cameras);

    return data;
  }
);

export const fetchCameraById = createAsyncThunk<TCamerasCard, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchCameraById',
  async (id, {extra: api}) => {
    const {data} = await api.get<TCamerasCard>(`${APIRoute.Cameras}/${id}`);
    return data;
  }
);

export const fetchSimilarProductsById = createAsyncThunk<TCamerasCard[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchSimilarProductsById',
  async (id, {extra: api}) => {
    const {data} = await api.get<TCamerasCard[]>(`${APIRoute.Cameras}/${id}/similar`);
    return data;
  }
);

export const fetchReviewsById = createAsyncThunk<TReview[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cameras/fetchReviewsById',
  async (id, {extra: api}) => {
    const {data} = await api.get<TReview[]>(`${APIRoute.Cameras}/${id}/reviews`);
    return data;
  }
);

export const postReview = createAsyncThunk<TReview, TReviewWithoutId, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/postReview',
  async (formData, {extra: api}) => {

    const {data} = await api.post<TReview>(APIRoute.Reviews, formData);
    return data;

  }
);

export const fetchPromos = createAsyncThunk<TImagePreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'promo/fetchPromos',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TImagePreview[]>(APIRoute.Promo);

    return data;
  }
);

export const postOrder = createAsyncThunk<void, TOrder, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'orders/postOrder',
  async({camerasIds, coupon}, {extra: api}) => {

    await api.post<void>(APIRoute.Order, {camerasIds, coupon});

  }
);

export const postCoupon = createAsyncThunk<number, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'orders/postCoupon',
  async (coupon, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Coupon, { coupon });
    return data;
  }
);
