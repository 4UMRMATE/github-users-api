export const toggleResults = (state) => {
  return {
    type: "TOGGLE_RESULTS",
    payload: state,
  };
};

export const changeView = () => {
  return {
    type: "CHANGE_VIEW",
  };
};

export const toggleSortBar = () => {
  return {
    type: "TOGGLE_SORT_BAR",
  };
};

export const sortByNameAsc = () => {
  return {
    type: "BY_NAME_ASC",
  };
};

export const sortByNameDesc = () => {
  return {
    type: "BY_NAME_DESC",
  };
};

export const sortByFollowersAsc = () => {
  return {
    type: "BY_FOLLOWERS_ASC",
  };
};

export const sortByFollowersDesc = () => {
  return {
    type: "BY_FOLLOWERS_DESC",
  };
};
