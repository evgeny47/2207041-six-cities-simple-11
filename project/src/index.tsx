import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import { fetchOfferAction, checkAuthAction } from './store/api-actions/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CITIES } from './mocks/coordinates';

store.dispatch(fetchOfferAction(CITIES[0]));
store.dispatch(checkAuthAction());

const elRoot = document.getElementById('root');

if(elRoot) {
  const root = ReactDOM.createRoot(elRoot);

  root.render(
    <React.StrictMode>
      <Provider store = {store}>
        <App/>
        <ToastContainer />
      </Provider>
    </React.StrictMode>,
  );
}
