import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TReview } from '../../types/reviews';
import { State } from '../../types/state';
import { fetchReviewsById, postReview } from '../api-actions';
import { NameSpace } from '../../const';

type ReviewsSliceType = {
  reviews: {
    data: TReview[];
    loadingStatus: boolean;
    errorStatus: boolean;
    postReviewLoadingStatus: boolean;
    postReviewErrorStatus: boolean;
  };
};

const initialState: ReviewsSliceType = {
  reviews: {
    data: [],
    loadingStatus: false,
    errorStatus: false,
    postReviewLoadingStatus: false,
    postReviewErrorStatus: false,
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
      })

      .addCase(postReview.pending, (state) => {
        state.reviews.postReviewLoadingStatus = true;
        state.reviews.postReviewErrorStatus = false;
      })
      .addCase(postReview.fulfilled, (state, action: PayloadAction<TReview>) => {
        state.reviews.postReviewLoadingStatus = false;
        state.reviews.postReviewErrorStatus = false;
        state.reviews.data.push(action.payload);
      })
      .addCase(postReview.rejected, (state) => {
        state.reviews.postReviewLoadingStatus = false;
        state.reviews.postReviewErrorStatus = true;
      });
  },
});

export const selectReviewsData = (state: State): TReview[] => state[NameSpace.Reviews].reviews.data;

export const selectPostReviewLoadingStatus = (state: State): boolean => state[NameSpace.Reviews].reviews.postReviewLoadingStatus;
export const selectPostReviewErrorStatus = (state: State): boolean => state[NameSpace.Reviews].reviews.postReviewErrorStatus;

export const reviewsReducer = ReviewsSlice.reducer;
