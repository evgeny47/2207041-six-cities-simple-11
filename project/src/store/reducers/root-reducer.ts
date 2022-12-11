import {combineReducers} from '@reduxjs/toolkit';
import { NameSpaceSlice } from '../../types/constants';
import { offerProcess } from '../offer-process/offer-process';
import { userProcess } from '../user-process/user-process';
import { reviewProcess } from '../review-process/review-process';
import { nearOffersProcess } from '../near-offer-process/near-offer-process';

export const rootReducer = combineReducers({
  [NameSpaceSlice.User]: userProcess.reducer,
  [NameSpaceSlice.Offer]: offerProcess.reducer,
  [NameSpaceSlice.NearOffers]: nearOffersProcess.reducer,
  [NameSpaceSlice.Review]: reviewProcess.reducer,
});
