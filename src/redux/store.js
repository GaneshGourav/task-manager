import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import taskReducer from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  taskReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
