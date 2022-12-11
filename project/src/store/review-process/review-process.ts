import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpaceSlice } from '../../types/constants';
import { ReviewData } from '../../types/state';
import { Reviews } from '../../types/types';
import { fetchReviews } from '../api-actions/api-actions';

const initialState: ReviewData = {
  error: null,
  reviews: [],
  stateReview: false
};

export const reviewProcess = createSlice({
  name: NameSpaceSlice.Review,
  initialState,
  reducers: {sortReviews: (state, action: PayloadAction<Reviews>) => {
    state.reviews = action.payload;
  },},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.stateReview = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.stateReview = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.stateReview = false;
      });
  }
});
