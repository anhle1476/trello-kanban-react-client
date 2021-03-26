import { SECURITY } from "../type";
import jwt_decode from "jwt-decode";
import axios from "axios";

const initialState = {
  token: "",
  user: {},
};

const isTokenNotExpired = (expire) => {
  const currentTime = Date.now() / 1000;
  return currentTime < expire;
};

const setAxiosHeader = (token) =>
  (axios.defaults.headers.common["Authorization"] = token);

const deleteAuthHeader = () =>
  delete axios.defaults.headers.common["Authorization"];

export default function securityReducer(state = initialState, action) {
  switch (action.type) {
    case SECURITY.LOAD_JWT_TOKEN:
      const token = action.payload;
      const tokenData = jwt_decode(token);
      setAxiosHeader(token);
      return {
        token: token,
        user: tokenData,
      };
    case SECURITY.UPDATE_TOKEN_STATUS:
      if (isTokenNotExpired(state.user.exp)) {
        setAxiosHeader(state.token);
        return state;
      } else {
        deleteAuthHeader();
        return initialState;
      }
    case SECURITY.DESTROY_JWT_TOKEN:
      deleteAuthHeader();
      return initialState;
    default:
      return state;
  }
}
