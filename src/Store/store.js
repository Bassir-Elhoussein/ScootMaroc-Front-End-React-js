import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./Auth/Reducer";
import tweetReducer from "./Tweet/Reducer";
import offerReducer from "./Offer/Reducer";
import { themeReducer } from "./Theme/Reducer";

const rootReducers=combineReducers({
auth:authReducer,
twit:tweetReducer,
theme:themeReducer,
offer:offerReducer,
})
export const store=legacy_createStore(rootReducers,applyMiddleware(thunk))