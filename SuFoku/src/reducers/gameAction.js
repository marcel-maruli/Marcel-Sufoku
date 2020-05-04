
const initialState = {
  name: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NAME':
      return { ...state, name: action.payload.name }
    default:
      return state
  }
}