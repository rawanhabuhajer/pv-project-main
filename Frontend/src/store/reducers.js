import { combineReducers } from "redux";

import metaReducer from "./meta/reducer";
import authenticationReducer from "./authentication/reducer";

import blogsReducer from "./blogs/reducer";
import projectsReducer from "./projects/reducer";
import dashboardReducer from "./dashboard/reducer";

const rootReducer = combineReducers({
  meta: metaReducer,
  authentication: authenticationReducer,
 
  blogs: blogsReducer,
  projects: projectsReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
