import { createSlice } from '@reduxjs/toolkit';
import { TCamerasCard } from '../../types/cameras';
import { State } from '../../types/state';
import { fetchCameras } from '../api-actions';
import { NameSpace } from '../../const';

type CamerasSliceType = {
  cards: {
    cardsData: TCamerasCard[];
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
      });
  }
});

export const selectCameraCards = (state: State): TCamerasCard[] => state[NameSpace.Cameras].cards.cardsData;

export const selectCardsLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].cards.loadingStatus;

export const camerasReducer = CamerasSlice.reducer;
