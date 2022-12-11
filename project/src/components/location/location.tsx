import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useApp';
import { fetchOfferAction } from '../../store/api-actions/api-actions';
import { City } from '../../types/types';

type LocationProps = {
  city: City;
  selectedCity: string;
}

function Location(item: LocationProps): JSX.Element {
  const dispatch = useAppDispatch();

  const changeCityHandler = (city:City) => {
    dispatch(fetchOfferAction(city));
  };

  return(
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item${(item.city.name === item.selectedCity) ? ' tabs__item--active' : ''}`}
        to='#'
        onClick={() => changeCityHandler(item.city)}
      >{item.city.name}
      </Link>
    </li>
  );
}

export default Location;
