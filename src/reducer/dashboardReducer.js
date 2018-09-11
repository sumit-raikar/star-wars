import { SEARCH_START, SEARCH_FINISH, SEARCH_FAILED } from '../action/dashboard';

const initialState = {
    loading: false,
    planets: [],
    next: null,
    previous: null,
    error: null
}

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_START: {
            return { ...state, loading: true };
        }
        case SEARCH_FINISH: {
            return { ...state, planets: action.resp.results, loading: false, next: action.resp.next, previous: action.resp.previous };
        }
        case SEARCH_FAILED: {
            return { ...state, error: action.error, loading: false };
        }
        default: {
            return state;
        }
    }
}

export default DashboardReducer;