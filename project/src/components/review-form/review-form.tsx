import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { fetchAddReview } from '../../store/api-actions/api-actions';
import { Review } from '../../types/types';
import {toast} from 'react-toastify';
import { getUserData } from '../../store/user-process/selectors';
import { getError, getStateReview } from '../../store/review-process/selector';

function ReviewForm(): JSX.Element {
  const MIN_TEXT_LENGTH = 50;
  const MAX_TEXT_LENGTH = 300;
  const stateReview = useAppSelector(getStateReview);
  const stateError = useAppSelector(getError);
  const params = useParams();
  const id: string = params.id ?? '';
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const fieldTextChangeHandle: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const fieldInputChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const onSubmit = (review: Review) => {
    dispatch(fetchAddReview(review));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (formData.rating !== null && formData.review !== null) {
      onSubmit({
        comment: formData.review,
        id: Number(id),
        rating: Number(formData.rating),
        user: {avatarUrl: userData ? userData.avatarUrl : '',
          id: userData ? userData.id : 0,
          isPro: userData ? userData.isPro : false,
          name: userData ? userData.name : ''
        },
        date: new Date().toISOString()
      });
      if(stateError){
        toast.error(stateError);
      }else{
        formData.rating = '';
        formData.review = '';
      }
    }
  };

  return(
    <form className="reviews__form form" action="" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={fieldInputChangeHandle} checked={'5' === formData.rating} disabled={stateReview} className="form__rating-input visually-hidden" name="rating" value='5' id="5-stars" type="radio"/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldInputChangeHandle} checked={'4' === formData.rating} disabled={stateReview} className="form__rating-input visually-hidden" name="rating" value='4' id="4-stars" type="radio"/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldInputChangeHandle} checked={'3' === formData.rating} disabled={stateReview} className="form__rating-input visually-hidden" name="rating" value='3' id="3-stars" type="radio"/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldInputChangeHandle} checked={'2' === formData.rating} disabled={stateReview} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={fieldInputChangeHandle} checked={'1' === formData.rating} disabled={stateReview} className="form__rating-input visually-hidden" name="rating" value='1' id="1-star" type="radio"/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea onChange={fieldTextChangeHandle} value={formData.review} disabled={stateReview} maxLength={MAX_TEXT_LENGTH} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_TEXT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!(formData.review.length >= MIN_TEXT_LENGTH && formData.rating) || stateReview}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
