import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '../store/reducers/root-reducer';
import {createAPI} from '../services/api';
import { redirect } from '../middlewares/redirect';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect)
});
