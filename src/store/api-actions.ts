import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import {saveToken, dropToken} from '../services/token';
import { AppDispatch, State } from '../types/state';
import { TCamerasCard } from '../types/cameras';
import { TReview } from '../types/reviews';
import { APIRoute } from '../const';

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

export const postOrderPhoneNumber = createAsyncThunk<void, {tel: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'orders/postOrderPhoneNumber',
  async({tel}, {extra: api}) => {

    await api.post<void>(APIRoute.Order, {tel});

  }
);
