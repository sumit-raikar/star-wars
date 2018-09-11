import fetch from 'cross-fetch'
import { PEOPLE_URL } from '../utils/constants';

export const FETCH_USER_STARTED = 'FETCH_USER_STARTED';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';


export const loginService = (username, password) => (dispatch) => {
    dispatch({ type: FETCH_USER_STARTED });
    return fetch(`${PEOPLE_URL}/?search=${username}`)
        .then(resp => resp.json())
        .then(resp => { dispatch({ type: FETCH_USER_SUCCESS, res: { user: resp, username, password } });  })
        .catch((error) => dispatch({ type: FETCH_USER_FAILURE, error: 'Login Failed, Please concat admin' }))
}
