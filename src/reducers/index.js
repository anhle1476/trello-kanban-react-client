import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import securityReducer from "./securityReducer/securityReducer";
import globalReducer from "./globalReducer/globalReducer";
//import boardReducer from "./boardReducer/boardReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["security"],
};

const rootReducer = combineReducers({
  security: securityReducer,
  global: globalReducer,
  //board: boardReducer,
});

export default persistReducer(persistConfig, rootReducer);
