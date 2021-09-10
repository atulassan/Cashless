import { combineReducers } from 'redux';
import { RootState } from './state';

export { RootState };
import auth from "./auth.reducer";
import message from "./message.reducer";
import common from "./common.reducer";
export const rootReducer = combineReducers({  //<RootState>
  client: auth,
  messages:message,
  common: common
});
