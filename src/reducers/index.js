import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import securityReducer from "./securityReducer/securityReducer";
import globalReducer from "./globalReducer/globalReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["security"],
};

const rootReducer = combineReducers({
  security: securityReducer,
  global: globalReducer,
});

export default persistReducer(persistConfig, rootReducer);
