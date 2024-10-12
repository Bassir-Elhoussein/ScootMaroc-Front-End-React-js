import {
    CREATE_OFFER_REQUEST,
    CREATE_OFFER_SUCCESS,
    CREATE_OFFER_FAILURE,
    APPLY_OFFER_REQUEST,
    APPLY_OFFER_SUCCESS,
    APPLY_OFFER_FAILURE,
    FETCH_OFFER_REQUEST,
    FETCH_OFFER_SUCCESS,
    FETCH_OFFER_FAILURE,
    DELETE_OFFER_REQUEST,
    DELETE_OFFER_SUCCESS,
    DELETE_OFFER_FAILURE,
    FETCH_OFFERS_REQUEST,
    FETCH_OFFERS_SUCCESS,
    FETCH_OFFERS_FAILURE,
    FETCH_USER_OFFERS_REQUEST,
    FETCH_USER_OFFERS_SUCCESS,
    FETCH_USER_OFFERS_FAILURE,
    CHECK_OFFER_APPLIED_REQUEST,
    CHECK_OFFER_APPLIED_SUCCESS,
    CHECK_OFFER_APPLIED_FAILURE,
} from './ActionType';

const initialState = {
    offer: null,
    offers: [],
    userOffers: [],
    isApplied: null, // New property to track if user applied
    loading: false,
    error: null
};

const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_OFFER_REQUEST:
        case APPLY_OFFER_REQUEST:
        case FETCH_OFFER_REQUEST:
        case DELETE_OFFER_REQUEST:
        case FETCH_OFFERS_REQUEST:
            case 'CHECK_OFFER_APPLIED_REQUEST':
                return {
                    ...state,
                    loading: true,
                    error: null
                };
            case 'CHECK_OFFER_APPLIED_SUCCESS':
                return {
                    ...state,
                    loading: false,
                    isApplied: action.payload
                };
            case 'CHECK_OFFER_APPLIED_FAILURE':
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };

        case FETCH_USER_OFFERS_REQUEST:
            return { ...state, loading: true, error: null };
        
        case CREATE_OFFER_SUCCESS:
            return { ...state, loading: false, offer: action.payload };
        
        case APPLY_OFFER_SUCCESS:
            return { ...state, loading: false, offer: action.payload };
        
        case FETCH_OFFER_SUCCESS:
            return { ...state, loading: false, offer: action.payload };
        
        case DELETE_OFFER_SUCCESS:
            return {
                ...state,
                loading: false,
                offers: state.offers.filter(offer => offer.id !== action.payload)
            };
        
        case FETCH_OFFERS_SUCCESS:
            return { ...state, loading: false, offers: action.payload };
        
        case FETCH_USER_OFFERS_SUCCESS:
            return { ...state, loading: false, userOffers: action.payload };

        case CREATE_OFFER_FAILURE:
        case APPLY_OFFER_FAILURE:
        case FETCH_OFFER_FAILURE:
        case DELETE_OFFER_FAILURE:
        case FETCH_OFFERS_FAILURE:
        case FETCH_USER_OFFERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default offerReducer;
