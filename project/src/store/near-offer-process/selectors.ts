import { RootState } from '..';
import { NameSpaceSlice } from '../../types/constants';
import { Offer, Offers } from '../../types/types';

export const getOffer = (state: RootState): Offer | null => state[NameSpaceSlice.NearOffers].offer;
export const getNearOffers = (state: RootState): Offers => state[NameSpaceSlice.NearOffers].nearOffers;
export const getLoadingState = (state: RootState): boolean => state[NameSpaceSlice.NearOffers].loadingState;
