import { createSlice } from '@reduxjs/toolkit';
import { TImagePreview } from '../../types/banners';
import { State } from '../../types/state';
import { fetchPromos } from '../api-actions';
import { NameSpace } from '../../const';

type PromosSliceType = {
  promos: {
    data: TImagePreview[];
    loadingStatus: boolean;
    errorStatus: boolean;
  };
};

const initialState: PromosSliceType = {
  promos: {
    data: [],
    loadingStatus: false,
    errorStatus: false,
  },
};

export const PromosSlice = createSlice({
  name: NameSpace.Promos,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromos.pending, (state) => {
        state.promos.errorStatus = false;
        state.promos.loadingStatus = true;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.promos.data = action.payload;
        state.promos.loadingStatus = false;
      })
      .addCase(fetchPromos.rejected, (state) => {
        state.promos.loadingStatus = false;
        state.promos.errorStatus = true;
      });
  }
});

export const selectPromosData = (state: State): TImagePreview[] => state[NameSpace.Promos].promos.data;
export const selectPromosLoadingStatus = (state: State): boolean => state[NameSpace.Promos].promos.loadingStatus;

export const promosReducer = PromosSlice.reducer;
