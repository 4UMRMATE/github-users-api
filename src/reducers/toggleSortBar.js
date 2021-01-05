const toggleSortBar = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_SORT_BAR":
      return !state;
    default:
      return state;
  }
};

export default toggleSortBar;
