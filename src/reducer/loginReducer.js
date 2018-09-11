import { FETCH_USER_STARTED, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../action/login';

const initialState = {
    loading: false,
    authorized: false,
    error: null
}

function checkUser(users, username, password) {
    const authorizedUser = users.results.filter(people => {
        if (people.name.toString().toLowerCase() === username.toString().toLowerCase() && people.birth_year.toString().toLowerCase() === password.toString().toLowerCase()) {
            return true;
        } else {
            return false;
        }
    });
    if (authorizedUser.length > 0) {
        return true;
    } else {
        return false;
    }
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_STARTED: {
            return { ...state, loading: true };
        }
        case FETCH_USER_SUCCESS: {
            localStorage.setItem('authorized', 'true');
            const auth = checkUser(action.res.user, action.res.username, action.res.password);
            const authorized = auth ? true : false;
            const error = auth ? null : 'Invalid username or password';
            return { ...state, loading: false, authorized, error };
        }
        case FETCH_USER_FAILURE: {
            return { ...state, error: action.error };
        }
        default: {
            return state;
        }
    }
}

export default LoginReducer;