import { GLOBAL } from "../type";

export const startLoading = () => (dispatch) => {
  dispatch({ type: GLOBAL.START_LOADING });
};

export const finishLoading = () => (dispatch) => {
  dispatch({ type: GLOBAL.FINISH_LOADING });
};
