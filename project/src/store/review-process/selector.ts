import { RootState } from '..';
import { NameSpaceSlice } from '../../types/constants';
import { Reviews } from '../../types/types';


export const getReviews = (state: RootState): Reviews => state[NameSpaceSlice.Review].reviews
  .slice().sort((a, b) => {
    if(a.date > b.date)
    {
      return -1;
    }
    if(a.date < b.date)
    {
      return 1;
    }
    return 0;}).slice(0, 10);
export const getStateReview = (state: RootState): boolean => state[NameSpaceSlice.Review].stateReview;
export const getError = (state: RootState): string | null => state[NameSpaceSlice.Review].error;
