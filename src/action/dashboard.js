import fetch from 'cross-fetch';
import { PLANET_URL } from '../utils/constants';
export const SEARCH_START = "SEARCH_START";
export const SEARCH_FINISH = "SEARCH_FINISH";
export const SEARCH_FAILED = "SEARCH_FAILED";

export const searchPlanets = (searchText, url) => (dispatch) => {
    dispatch({ type: SEARCH_START });
    return fetch(url)
        .then(resp => resp.json())
        .then(resp => dispatch({ type: SEARCH_FINISH, resp }))
        .catch((error) => dispatch({ type: SEARCH_FAILED, error: 'Search Failed, Please concat admin' }))
}