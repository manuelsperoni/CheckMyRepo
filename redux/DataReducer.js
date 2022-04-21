export default DataReducer = (
  state = {
    user: "manuelsperoni",
    repo: "CheckMyRepo",
  },
  action
) => {
  let index;
  switch (action.type) {
    case "SET_USER":
      state.user = action.user;
      return { ...state };

    case "SET_REPO":
      state.repo = action.repo;
      return { ...state };

    default:
      return state;
  }
};
