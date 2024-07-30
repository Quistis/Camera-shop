import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCamerasCard } from '../../types/cameras';
import { TReview } from '../../types/reviews';
import { State } from '../../types/state';
import { fetchCameras, fetchCameraById, fetchSimilarProductsById, postReview } from '../api-actions';
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
  similarProducts: {
    data: TCamerasCard[] | null;
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
  },
  similarProducts: {
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
      })

      .addCase(fetchSimilarProductsById.pending, (state) => {
        state.similarProducts.errorStatus = false;
        state.similarProducts.loadingStatus = true;
      })
      .addCase(fetchSimilarProductsById.fulfilled, (state, action) => {
        state.similarProducts.data = action.payload;
        state.similarProducts.loadingStatus = false;
      })
      .addCase(fetchSimilarProductsById.rejected, (state) => {
        state.similarProducts.loadingStatus = false;
        state.similarProducts.errorStatus = true;
      })

      .addCase(postReview.fulfilled, (state, action: PayloadAction<TReview>) => {
        // Обновляем reviewsCount и добавляем отзыв в массив отзывов текущего продукта
        if (state.currentProduct.data && state.currentProduct.data.id === action.payload.cameraId) {
          state.currentProduct.data.reviewCount += 1;
        }

        const product = state.cards.cardsData.find((card) => card.id === action.payload.cameraId);

        if (product) {
          product.reviewCount += 1;
        }
      });
  }
});

export const selectCameraCards = (state: State): TCamerasCard[] => state[NameSpace.Cameras].cards.cardsData;
export const selectCurrentProduct = (state: State): TCamerasCard | null => state[NameSpace.Cameras].currentProduct.data;
export const selectSimilarProducts = (state: State): TCamerasCard[] | null => state[NameSpace.Cameras].similarProducts.data;

export const selectCardsLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].cards.loadingStatus;
export const selectCurrentProductLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].currentProduct.loadingStatus;
export const selectSimilarProductsLoadingStatus = (state: State): boolean => state[NameSpace.Cameras].similarProducts.loadingStatus;

export const selectCardsErrorStatus = (state: State): boolean => state[NameSpace.Cameras].cards.errorStatus;
export const selectCurrentProductErrorStatus = (state: State): boolean => state[NameSpace.Cameras].currentProduct.errorStatus;

export const camerasReducer = CamerasSlice.reducer;
