import { RootState } from '..';
import { NameSpaceSlice } from '../../types/constants';
import { City, Offers } from '../../types/types';

export const getCity = (state: RootState): City => state[NameSpaceSlice.Offer].city;
export const getOffers = (state: RootState): Offers => state[NameSpaceSlice.Offer].offers;
export const getOfferLoadingStatus = (state: RootState): boolean => state[NameSpaceSlice.Offer].offerLoadingStatus;
