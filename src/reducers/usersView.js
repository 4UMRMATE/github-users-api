const usersViewReducer = (state = false, action) => {
  switch (action.type) {
    case "CHANGE_VIEW":
      return !state;
    default:
      return state;
  }
};

export default usersViewReducer;
