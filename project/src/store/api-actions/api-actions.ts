import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute} from '../../types/constants';
import {AuthData, City, Offer, Offers, Review, Reviews, UserData} from '../../types/types';
import { AppDispatch, RootState } from '..';
import { /*loadNearOffers,*/ /*loadOfferProperty,*/ /*loadOffers,*/ /*loadReviews,*/ redirectToRoute, /*requireAuthorization,*/ setError, /*setOffersDataLoadingStatus,*/ setStateReview/*, setUserData,*/ /*sortReviews*/ } from '../actions/actions';
import { dropToken, saveToken } from '../../services/token';

export const fetchOfferAction = createAsyncThunk<Offers, City, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (city, {dispatch, extra: api}) => {
    //dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    //dispatch(loadOffers(data));
    //dispatch(setOffersDataLoadingStatus(false));
    return data.filter((i) => i.city.name === city.name);
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {

    const {data} = await api.get<UserData>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchOfferPropertyAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferProperty',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.HotelId}${id}`);
    return data;
  }
);

export const fetchNearOffers = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchNearOffers',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.HotelId}${id}/nearby`);
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}${id}`);
    return data;
  },
);

export const fetchAddReview = createAsyncThunk<void, Review, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchAddReview',
  async({id, comment, rating}, {dispatch, extra: api}) => {
    try{
      dispatch(setError(''));
      dispatch(setStateReview(true));
      await api.post(`${APIRoute.Comments}${id}`, {comment, rating});
      dispatch(fetchReviews(id.toString()));
    }
    catch(error){
      if (typeof error === 'string') {
        dispatch(setError(error));
      } else if (error instanceof Error) {
        dispatch(setError(error.message));
      }
    }finally{
      dispatch(setStateReview(false));
    }
  }
);
