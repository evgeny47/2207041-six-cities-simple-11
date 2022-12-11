import {createSlice} from '@reduxjs/toolkit';
import { CITIES } from '../../mocks/coordinates';
import { NameSpaceSlice } from '../../types/constants';
import {OfferData} from '../../types/state';
import { sortOffersPriceHighLow, sortOffersPriceLowHigh, sortOffersTopRateFirst } from '../actions/actions';
import { fetchOfferAction } from '../api-actions/api-actions';

const initialState: OfferData = {
  city: CITIES[0],
  offers: [],
  offerLoadingStatus: false,
};

export const offerProcess = createSlice({
  name: NameSpaceSlice.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.offerLoadingStatus = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.city = action.meta.arg;
        state.offers = action.payload;
        state.offerLoadingStatus = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.offerLoadingStatus = false;
      })
      .addCase(sortOffersPriceLowHigh, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(sortOffersPriceHighLow, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(sortOffersTopRateFirst, (state, action) => {
        state.offers = action.payload;
      });
  }
});
