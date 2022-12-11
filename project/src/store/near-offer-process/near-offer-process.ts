import {createSlice} from '@reduxjs/toolkit';
import {NameSpaceSlice} from '../../types/constants';
import {NearOfferData} from '../../types/state';
import {fetchNearOffers, fetchOfferPropertyAction} from '../api-actions/api-actions';

const initialState: NearOfferData = {
  offer: null,
  nearOffers: [],
  loadingState: true
};

export const nearOffersProcess = createSlice({
  name: NameSpaceSlice.NearOffers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferPropertyAction.pending, (state, action) => {
        state.loadingState = true;
      })
      .addCase(fetchOfferPropertyAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.loadingState = false;
      })
      .addCase(fetchOfferPropertyAction.rejected, (state, action) => {
        state.loadingState = false;
      })
      .addCase(fetchNearOffers.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      });
  }
});
