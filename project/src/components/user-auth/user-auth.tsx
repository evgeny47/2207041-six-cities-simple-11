import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { logoutAction } from '../../store/api-actions/api-actions';
import { getUserData } from '../../store/user-process/selectors';

function UserAuth(): JSX.Element {

  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <Fragment>
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
            <img className="user__avatar"
              src={userData?.avatarUrl}
              width="20"
              height="20"
              alt={userData?.name}
            />
          </div>
          <span className="header__user-name user__name">{userData?.email}</span>
        </div>
      </li>
      <li className="header__nav-item">
        <Link className="header__nav-link" to="/" onClick={handleLogout}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </Fragment>
  );
}

export default UserAuth;
