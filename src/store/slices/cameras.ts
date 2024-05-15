import { createSlice } from '@reduxjs/toolkit';
import { TCamerasCard } from '../../types/cameras';
import { State } from '../../types/state';
import { fetchCameras, fetchCameraById } from '../api-actions';
import { NameSpace } from '../../const';

type CamerasSliceType = {
  cards: {
    cardsData: TCamerasCard[];
    loadingStatus: boolean;
    errorStatus: boolean;
  };
  currentProduct: {
    data: TCamerasCard | null;
    loadingStatus: boolean;
    errorStatus: boolean;
  };
};

const initialState: CamerasSliceType = {
  cards: {
    cardsData: [],
    loadingStatus: false,
    errorStatus: false,
  },
  currentProduct: {
    data: null,
    loadingStatus: false,
    errorStatus: false,
  }
};

export const CamerasSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCameras.pending, (state) => {
        state.cards.errorStatus = false;
        state.cards.loadingStatus = true;
      })
      .addCase(fetchCameras.fulfilled, (state, action) => {
        state.cards.cardsData = action.payload;
        state.cards.loadingStatus = false;
      })
      .addCase(fetchCameras.rejected, (state) => {
        state.cards.loadingStatus = false;
        state.cards.errorStatus = true;
      })

      .addCase(fetchCameraById.pending, (state) => {
        state.currentProduct.errorStatus = false;
        state.currentProduct.loadingStatus = true;
      })
      .addCase(fetchCameraById.fulfilled, (state, action) => {
        state.currentProduct.data = action.payload;
        state.currentProduct.loadingStatus = false;
      })
      .addCase(fetchCameraById.rejected, (state) => {
        state.currentProduct.loadingStatus = false;
        state.currentProduct.errorStatus = true;
      });
  }
});

export const selectCameraCards = (state: State): TCamerasCard[] => state[NameSpace.Cameras].cards.cardsData;
export const selectCurrentProduct = (state: State): TCamerasCard | null => state[NameSpace.Cameras].currentProduct.data;

export const selectCardsLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].cards.loadingStatus;
export const selectCurrentProductLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].currentProduct.loadingStatus;


export const camerasReducer = CamerasSlice.reducer;
