import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer.js";
import coinReducer from "./coinReducer.js";

const rootReducer = combineReducers({
  authReducer,
  coinReducer,
});

let storeEnhancer;

if (process.env.NODE_ENV !== "production") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
  storeEnhancer = applyMiddleware(thunk);
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, storeEnhancer);
}
