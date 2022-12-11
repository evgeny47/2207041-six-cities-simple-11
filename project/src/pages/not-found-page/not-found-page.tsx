import { Link } from 'react-router-dom';
import LocationList from '../../components/location-list/location-list';
import { useAppSelector } from '../../hooks/useApp';
import { getCity } from '../../store/offer-process/selectors';
import { AppRoute } from '../../types/constants';

function NotFoundPage(): JSX.Element {
  const selectedCity = useAppSelector(getCity);
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <LocationList selectedCity={selectedCity} />
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <div>
              <b className="places__found">404 Not found</b>
            </div>
            <Link to={AppRoute.Root}>Перейти на главную страницу</Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
