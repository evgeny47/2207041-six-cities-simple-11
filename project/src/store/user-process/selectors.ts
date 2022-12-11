import { RootState } from '..';
import { AuthorizationStatus, NameSpaceSlice } from '../../types/constants';
import { UserData } from '../../types/types';

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus => state[NameSpaceSlice.User].authorizationStatus;
export const getAuthCheckedStatus = (state: RootState): boolean => state[NameSpaceSlice.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: RootState): UserData | null => state[NameSpaceSlice.User].userData;
