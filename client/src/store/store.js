import {createStore, combineReducers} from "redux";
import tema from "./reducers/tema";

export default createStore(combineReducers({tema}));
