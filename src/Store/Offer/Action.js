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
import { api } from "../../Config/apiConfig";

// Action creators
export const createOfferRequest = () => ({
    type: CREATE_OFFER_REQUEST,
});

export const createOfferSuccess = (data) => ({
    type: CREATE_OFFER_SUCCESS,
    payload: data,
});

export const createOfferFailure = (error) => ({
    type: CREATE_OFFER_FAILURE,
    payload: error,
});

export const applyOfferRequest = () => ({
    type: APPLY_OFFER_REQUEST,
});

export const applyOfferSuccess = (data) => ({
    type: APPLY_OFFER_SUCCESS,
    payload: data,
});

export const applyOfferFailure = (error) => ({
    type: APPLY_OFFER_FAILURE,
    payload: error,
});

export const fetchOfferRequest = () => ({
    type: FETCH_OFFER_REQUEST,
});

export const fetchOfferSuccess = (data) => ({
    type: FETCH_OFFER_SUCCESS,
    payload: data,
});

export const fetchOfferFailure = (error) => ({
    type: FETCH_OFFER_FAILURE,
    payload: error,
});

export const deleteOfferRequest = () => ({
    type: DELETE_OFFER_REQUEST,
});

export const deleteOfferSuccess = (offerId) => ({
    type: DELETE_OFFER_SUCCESS,
    payload: offerId,
});

export const deleteOfferFailure = (error) => ({
    type: DELETE_OFFER_FAILURE,
    payload: error,
});

export const fetchOffersRequest = () => ({
    type: FETCH_OFFERS_REQUEST,
});

export const fetchOffersSuccess = (offers) => ({
    type: FETCH_OFFERS_SUCCESS,
    payload: offers,
});

export const fetchOffersFailure = (error) => ({
    type: FETCH_OFFERS_FAILURE,
    payload: error,
});

export const fetchUserOffersRequest = () => ({
    type: FETCH_USER_OFFERS_REQUEST,
});

export const fetchUserOffersSuccess = (offers) => ({
    type: FETCH_USER_OFFERS_SUCCESS,
    payload: offers,
});

export const fetchUserOffersFailure = (error) => ({
    type: FETCH_USER_OFFERS_FAILURE,
    payload: error,
});
export const checkOfferAppliedRequest = () => ({
    type: CHECK_OFFER_APPLIED_REQUEST,
});

export const checkOfferAppliedSuccess = (isApplied) => ({
    type: CHECK_OFFER_APPLIED_SUCCESS,
    payload: isApplied,
});

export const checkOfferAppliedFailure = (error) => ({
    type: CHECK_OFFER_APPLIED_FAILURE,
    payload: error,
});
// Thunk actions
export const createOffer = (offer) => {
    return async (dispatch) => {
        dispatch(createOfferRequest());
        try {
            const { data } = await api.post("/api/offers/create", offer);
           
            console.log("created twit ",data)
            dispatch(createOfferSuccess(data));
        } catch (error) {
            dispatch(createOfferFailure(error.message));
        }
    };
};

export const applyOffer = (offer) => {
    return async (dispatch) => {
        dispatch(applyOfferRequest());
        try {
            const { data } = await api.post("/api/offers/apply", offer);
            dispatch(applyOfferSuccess(data));
        } catch (error) {
            dispatch(applyOfferFailure(error.message));
        }
    };
};

export const fetchOfferById = (offerId) => {
    return async (dispatch) => {
        dispatch(fetchOfferRequest());
        try {
            const { data } = await api.get(`/api/offers/${offerId}`);
            dispatch(fetchOfferSuccess(data));
        } catch (error) {
            dispatch(fetchOfferFailure(error.message));
        }
    };
};

export const deleteOfferById = (offerId) => {
    return async (dispatch) => {
        dispatch(deleteOfferRequest());
        try {
            await api.delete(`/api/offer/${offerId}`);
            dispatch(deleteOfferSuccess(offerId));
        } catch (error) {
            dispatch(deleteOfferFailure(error.message));
        }
    };
};

export const fetchAllOffers = () => {
    return async (dispatch) => {
        dispatch(fetchOffersRequest());
        try {
            const response = await api.get('/api/offers/');
            console.log("all offers ",response.data)
            dispatch(fetchOffersSuccess(response.data));
        } catch (error) {
            dispatch(fetchOffersFailure(error.message));
        }
    };
};

export const fetchUserOffers = (userId) => {
    return async (dispatch) => {
        dispatch(fetchUserOffersRequest());
        try {
            const { data } = await api.get(`/api/user/${userId}`);
            dispatch(fetchUserOffersSuccess(data));
        } catch (error) {
            dispatch(fetchUserOffersFailure(error.message));
        }
    };
};
export const checkIfUserApplied = (offerId) => {
    return async (dispatch) => {
        dispatch(checkOfferAppliedRequest());
        try {
            const { data } = await api.get(`/api/offers/userapplied?offerId=${offerId}`);
            console.log("/userapplied ", data);
            dispatch(checkOfferAppliedSuccess(data));
            return data; 
        } catch (error) {
            console.log("/userapplied checkOfferAppliedFailure ", error.message);
            dispatch(checkOfferAppliedFailure(error.message));
            return false; 
        }
    };
};

