import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import {saveToken, dropToken} from '../services/token';
import { AppDispatch, State } from '../types/state';
import { TCamerasCard } from '../types/cameras';
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
