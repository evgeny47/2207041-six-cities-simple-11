import { AuthorizationStatus } from './constants';
import { City, Offer, Offers, Reviews, UserData } from './types';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type OfferData = {
  city: City;
  offers: Offers;
  offerLoadingStatus: boolean;
};

export type NearOfferData = {
  offer: Offer | null;
  nearOffers: Offers;
  loadingState: boolean;
};

export type ReviewData = {
  error: string | null;
  reviews: Reviews;
  stateReview: boolean;
};
