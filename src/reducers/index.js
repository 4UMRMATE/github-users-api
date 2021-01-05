import toggleResults from "./toggleResults";
import usersViewReducer from "./usersView";
import toggleSortBar from "./toggleSortBar";
import sortByNameAsc from "./byNameAsc";
import sortByNameDesc from "./byNameDesc";
import sortByFollowersAsc from "./byFollowersAsc";
import sortByFollowersDesc from "./byFollowersDesc";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  toggleResults: toggleResults,
  sortBarDisplay: toggleSortBar,
  sortByNameAsc: sortByNameAsc,
  sortByNameDesc: sortByNameDesc,
  sortByFollowersAsc: sortByFollowersAsc,
  sortByFollowersDesc: sortByFollowersDesc,
  usersView: usersViewReducer,
});

export default allReducers;
