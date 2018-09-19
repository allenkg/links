export const LOGIN_USER = '@@ACCESS/LOGIN_USER';
export const LOGIN_USER_SUCCESS = '@@ACCESS/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = '@@ACCESS/LOGIN_USER_FAILURE';
export const SHOW_LOGIN_PAGE = '@@ACCESS/SHOW_LOGIN_PAGE';
export const SHOW_VALIDATION_CODE_INPUT = '@@ACCESS/SHOW_VALIDATION_CODE_INPUT';
export const HIDE_LOGIN_PAGE = '@@ACCESS/HIDE_LOGIN_PAGE';
export const VERIFY_TOKEN = '@@ACCESS/VERIFY_TOKEN';
export const SET_TOKEN = '@@ACCESS/SET_TOKEN';
export const CHANGE_VALIDATION_CODE = '@@ACCESS/CHANGE_VALIDATION_CODE';
export const LOAD_USER_INFO = '@@ACCESS/LOAD_USER_INFO';
export const SAVE_PHONE_NUMBER = '@@ACCESS/SAVE_PHONE_NUMBER';
export const SET_INITIAL_STATE = '@@ACCESS/SET_INITIAL_STATE';


export function showLoginPage() {
  return {type: SHOW_LOGIN_PAGE}
}

export function hideLoginPage() {
  return {type: HIDE_LOGIN_PAGE}
}

export function changeValidationCode(code) {
  return {type: CHANGE_VALIDATION_CODE, code}
}

export function enterPhoneNumber(phoneNumber) {
  return async (dispatch) => {
    dispatch({type: LOGIN_USER});
    try {
      const response = await fetch('/api/login/generate', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          phone_number: phoneNumber.match(/\d+/g).slice(1).join("")
        })
      });
      const authentication = await response.json();
      if (authentication === 'Ok') {
        dispatch({type: SHOW_VALIDATION_CODE_INPUT})
      }
    } catch (e) {

    }
  }
}

export function tokenVerification(phoneNumber) {
  return async (dispatch, getState) => {
    dispatch({type: VERIFY_TOKEN});
    try {
      const code = getState().accessReducer.code;
      const response = await fetch('/api/login/verify', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token: code,
          phone_number: phoneNumber.match(/\d+/g).slice(1).join(""),
        })
      });
      const authorization = await response.json();
      saveToStorage(authorization, phoneNumber);
      dispatch({type: SET_TOKEN, authorization});
      dispatch({type: SAVE_PHONE_NUMBER, phoneNumber});
      dispatch({type: HIDE_LOGIN_PAGE});
    } catch (e) {
      const errors = {validationCodeError: 'Не верный код'};
      dispatch({type: LOGIN_USER_FAILURE, errors})
    }
  }
}

function saveToStorage(authorization, phoneNumber) {
  localStorage.setItem('token', "Token " + authorization.token);
  localStorage.setItem('user', authorization.name);
  localStorage.setItem('phone', phoneNumber);
  localStorage.setItem('userId', authorization.id);
}

export function loadUserInfoFromStorage(data) {
  return {type: LOAD_USER_INFO, data}
}

export function setInitialState() {
  return { type: SET_INITIAL_STATE }
}
