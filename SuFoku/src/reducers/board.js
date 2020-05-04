const initialState = {
  board: [],
  value: [],
  difficulty: "",
  status: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCHING_BOARD":
      return { ...state, board: action.payload.board, value: action.payload.value, difficulty: action.payload.difficulty };
    case 'VALIDATE_DATA':
      return { ...state, status: action.payload.validation }
    case "CHANGE_BOARD":
      return { ...state, board: action.payload.board, value: action.payload.value };
    default:
      return state;
  }
};
