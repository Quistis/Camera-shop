import { createSlice } from '@reduxjs/toolkit';
import { TReview } from '../../types/reviews';
import { State } from '../../types/state';
import { fetchReviewsById } from '../api-actions';
import { NameSpace } from '../../const';

type ReviewsSliceType = {
  reviews: {
    data: TReview[];
    loadingStatus: boolean;
    errorStatus: boolean;
  };
};

const initialState: ReviewsSliceType = {
  reviews: {
    data: [],
    loadingStatus: false,
    errorStatus: false,
  }
};

export const ReviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsById.pending, (state) => {
        state.reviews.errorStatus = false;
        state.reviews.loadingStatus = true;
      })
      .addCase(fetchReviewsById.fulfilled, (state, action) => {
        state.reviews.data = action.payload;
        state.reviews.loadingStatus = false;
      })
      .addCase(fetchReviewsById.rejected, (state) => {
        state.reviews.loadingStatus = false;
        state.reviews.errorStatus = true;
      });
  },
});

export const selectReviewsData = (state: State): TReview[] => state[NameSpace.Reviews].reviews.data;

export const reviewsReducer = ReviewsSlice.reducer;
