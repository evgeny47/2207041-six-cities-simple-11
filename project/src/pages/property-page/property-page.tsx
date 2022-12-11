import { useParams } from 'react-router-dom';
import ReviewPlace from '../../components/review-place/review-place';
import { CITIES } from '../../mocks/coordinates';
import Map from '../../components/map/map';
import OfferCardList from '../../components/offer-card-list/offer-card-list';
import { Point, TopOffer } from '../../types/types';
import { Fragment, useEffect } from 'react';
import { useAppSelector } from '../../hooks/useApp';
import HeaderNav from '../../components/header-nav/header-nav';
import { store } from '../../store';
import { fetchNearOffers, fetchOfferPropertyAction, fetchReviews } from '../../store/api-actions/api-actions';
import NotFoundPage from '../not-found-page/not-found-page';
import { getLoadingState, getNearOffers, getOffer } from '../../store/near-offer-process/selectors';

function PropertyPage(): JSX.Element {
  const params = useParams();
  const id: string = params.id ?? '';
  const offer = useAppSelector(getOffer);
  const loadingState = useAppSelector(getLoadingState);

  useEffect(() => {
    store.dispatch(fetchNearOffers(id));
    store.dispatch(fetchReviews(id));
  }, [id]);

  useEffect(() => {
    if(!offer) {
      store.dispatch(fetchOfferPropertyAction(id));
    }
  }, [offer, id]);

  const nearOffers = useAppSelector(getNearOffers);
  const city = offer ? offer.city : CITIES[0];
  const points: Point[] = [];
  if(nearOffers.length > 0){
    nearOffers.map((item) =>
      points.push({offerId:item.id, title:item.title, latitude: item.location.latitude, longitude: item.location.longitude})
    );
  }
  if(offer){
    points.push({offerId: offer.id, title:offer.title, latitude: offer.location.latitude, longitude: offer.location.longitude});
  }
  const topOffer: TopOffer = {cardsCount: nearOffers.length, offers: nearOffers};
  const currentPoint = points.find((point) => point.offerId === Number(id));
  const selectedPoint = (currentPoint ?? null);

  if(!loadingState && !offer){
    return <NotFoundPage/>;
  }

  return(
    <Fragment>
      <HeaderNav />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer?.images.map((item) => (
                <div className="property__image-wrapper" key={item}>
                  <img className="property__image" src={item} alt="Phоto studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name" title={`offer/${id}`}>
                  {offer?.title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${Math.round(offer?.rating || 0) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer?.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer?.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">{offer?.price}</b>
                <span className="property__price-text">&#47;&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer?.goods.map((item) => (
                    <li className="property__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper property__avatar-wrapper${offer?.host.isPro ? '--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer?.host.name}
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer?.description}
                  </p>
                  <p className="property__text">
                  </p>
                </div>
              </div>
              <ReviewPlace />
            </div>
          </div>
          <Map className="property__map map" city={city} points={points} selectedPoint={selectedPoint}></Map>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferCardList className="near-places__list places__list"
              classOfferPrefix="near-places"
              topOffer={topOffer}
              onItemOver={() => true}
              onItemLeave={() => true}
            />
          </section>
        </div>
      </main>
    </Fragment>
  );
}
export default PropertyPage;
