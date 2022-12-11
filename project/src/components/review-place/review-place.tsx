import { useAppSelector } from '../../hooks/useApp';
import { getReviews } from '../../store/review-process/selector';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../types/constants';
import ReviewForm from '../review-form/review-form';
import ReviewItem from '../review-item/review-item';

function ReviewPlace():JSX.Element {
  const offerReviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return(
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span></h2>
      <ul className="reviews__list">
        {offerReviews &&
          offerReviews.map((item) => (
            <ReviewItem
              key={item.id}
              item={item}
            />
          ))}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
    </section>
  );
}

export default ReviewPlace;
