import merge from 'xtend';
import createReducer from './create-reducer';
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from '../actions/main-page';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
};

export default createReducer({
  [FETCH_DATA]: (state, action) => merge(state, {isLoading: true}),
  [FETCH_DATA_SUCCESS]: (state, action) => merge(state, {
    data: action.data,
    isLoading: false
  })
}, INITIAL_STATE)