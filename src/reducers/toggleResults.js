const toggleResults = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_RESULTS":
      return action.payload;
    default:
      return state;
  }
};

export default toggleResults;
