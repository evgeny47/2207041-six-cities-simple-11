import { FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector} from '../../hooks/useApp';
import { fetchOfferAction, loginAction } from '../../store/api-actions/api-actions';
import { AppRoute, AuthorizationStatus } from '../../types/constants';
import { AuthData } from '../../types/types';
import {toast} from 'react-toastify';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { CITIES } from '../../mocks/coordinates';

function LoginPage(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
  useEffect(() => {
    if (loginRef && passwordRef) {
      if (loginRef.current !== null && passwordRef.current !== null
        && loginRef.current.value !== '' && passwordRef.current.value !== '') {
        dispatch(loginAction({login: loginRef.current.value, password: passwordRef.current.value}));
      }
    }
    if(authorizationStatus === AuthorizationStatus.Auth){
      navigate(AppRoute.Main);
    }
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const pwdExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null
      && loginRef.current.value !== '' && passwordRef.current.value !== '') {
      if(pwdExp.test(passwordRef.current.value) === false){
        toast.error('Password must be more than 8 characters, one number and one capital letter');
      }else{
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      }
    }else{
      toast.error('Username or password field is not filled');
    }
  };

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    dispatch(fetchOfferAction(randomCity));
    navigate(AppRoute.Main);
  }

  return (
    <div className="page page--gray page--login">
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path>
          </symbol>
        </svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required={false} ref={loginRef} id="email"/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required={false} ref={passwordRef} id="password"/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" onClick={handleClick} to='#'>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
