import { useAppSelector } from '../../hooks/useApp';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../types/constants';
import UserAuth from '../user-auth/user-auth';
import UserGuest from '../user-guest/user-guest';

function HeaderNav(): JSX.Element{
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {(authorizationStatus === AuthorizationStatus.Auth)
                ? <UserAuth />
                : <UserGuest />}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderNav;
