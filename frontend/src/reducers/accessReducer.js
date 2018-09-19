import merge from 'xtend';
import createReducer from './create-reducer';

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SHOW_LOGIN_PAGE,
  HIDE_LOGIN_PAGE,
  SHOW_VALIDATION_CODE_INPUT,
  SET_TOKEN,
  CHANGE_VALIDATION_CODE,
  LOAD_USER_INFO,
  SAVE_PHONE_NUMBER,
  SET_INITIAL_STATE
} from '../actions/access';

const INITIAL_STATE = {
  showLoginPage: false,
  validationCodeInput: false,
  code: '',
  token: '',
  userName: '',
  phoneNumber: '',
  errors: {}
};

export default createReducer({
  [SHOW_LOGIN_PAGE]: (state) => merge(state, {
    showLoginPage: true
  }),
  [HIDE_LOGIN_PAGE]: (state) => merge(state, {
    showLoginPage: false
  }),
  [SHOW_VALIDATION_CODE_INPUT]: (state) => merge(state, {
    validationCodeInput: true
  }),
  [CHANGE_VALIDATION_CODE]: (state, action) => merge(state, {
    code: action.code
  }),
  [SET_TOKEN]: (state, action) =>merge(state, {
    token: action.authorization.token,
    userName: action.authorization.name
  }),
  [LOAD_USER_INFO]: (state, action) => merge(state, {
    userName: action.data.user,
    phoneNumber: action.data.phoneNumber
  }),
  [SAVE_PHONE_NUMBER]: (state, action) => merge(state, {
    phoneNumber: action.phoneNumber
  }),
  [SET_INITIAL_STATE]: (state) => merge(state, INITIAL_STATE),
  [LOGIN_USER_FAILURE]: (state, action) => merge(state, {
    errors: action.errors
  })
}, INITIAL_STATE)