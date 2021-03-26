import { GLOBAL, SECURITY } from "../type";

export const loginSuccess = (token) => (dispatch) => {
  dispatch({
    type: SECURITY.LOAD_JWT_TOKEN,
    payload: token,
  });
};

export const updateTokenStatus = () => (dispatch) => {
  dispatch({ type: SECURITY.UPDATE_TOKEN_STATUS });
  dispatch({ type: GLOBAL.FINISH_LOADING });
};

export const destroyToken = () => (dispatch) => {
  dispatch({ type: SECURITY.DESTROY_JWT_TOKEN });
};
