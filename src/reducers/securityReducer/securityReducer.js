import { SECURITY } from "../type";
import jwt_decode from "jwt-decode";
import axios from "axios";
import store from "../../store";
import { finishLoading } from "../globalReducer/globalAction";

const initialState = {
  token: "",
  user: {},
};

const isTokenNotExpired = (expire) => {
  const currentTime = Date.now() / 1000;
  return currentTime < expire;
};

const setAxiosHeader = (token) => {
  console.log("Set token to header: " + token);
  axios.defaults.headers.common["Authorization"] = token;
  console.log(axios.defaults.headers);
};

const doDestroyToken = () => {
  delete axios.defaults.headers.common["Authorization"];
  return initialState;
};

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
      }
      if (state.token) {
        alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      }
      return doDestroyToken();
    case SECURITY.DESTROY_JWT_TOKEN:
      return doDestroyToken();
    default:
      return state;
  }
}
