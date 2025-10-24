import { combineReducers } from "redux";

// Authentication
import authentication from "./authentication/reducer";
import blogs from "./blogs/reducer";

import admins from "./admins/reducer";



const rootReducer = combineReducers({
  authentication,
  blogs,

  admins,


});

export default rootReducer;
