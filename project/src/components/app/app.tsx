import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import LoginPage from '../../pages/login-page/login-page';
import PropertyPage from '../../pages/property-page/property-page';
import { AppRoute, AuthorizationStatus} from '../../types/constants';
import PropertyNotLoggedPage from '../../pages/property-not-logged-page/property-not-logged-page';
import MainEmptyPage from '../../pages/main-empty-page/main-empty-page';
import PrivateRoute from '../../private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import {useAppSelector} from '../../hooks/useApp';
import Spinner from '../../pages/spinner/spinner';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getOfferLoadingStatus } from '../../store/offer-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const offerLoadingStatus = useAppSelector(getOfferLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || offerLoadingStatus) {
    return (
      <Spinner />
    );
  }
  return(
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />} />
        <Route path={AppRoute.Main} element={<MainPage/>} />
        <Route index element={<MainPage/>} />
        <Route path={AppRoute.MainEmptyPage} element={<MainEmptyPage />} />
        <Route path={AppRoute.LoginPage}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Properties}>
          <Route path={AppRoute.PropertyPage} element={<PropertyPage />} />
        </Route>
        <Route path={AppRoute.PropertyNotLoggedPage} element={<PropertyNotLoggedPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
