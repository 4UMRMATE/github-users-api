const byFollowersAsc = (state = false, action) => {
  switch (action.type) {
    case "BY_FOLLOWERS_ASC":
      return true;
    case "BY_FOLLOWERS_DESC":
      return false;
    case "BY_NAME_ASC":
      return false;
    case "BY_NAME_DESC":
      return false;
    default:
      return state;
  }
};

export default byFollowersAsc;
