import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import mainPage from './main-page';
import accessReducer from "./accessReducer";

export default combineReducers({
  routing,
  mainPage,
  accessReducer
})