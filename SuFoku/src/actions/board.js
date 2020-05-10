import axios from 'axios'

const api = axios.create({ baseURL: "https://sugoku.herokuapp.com" });

export const fetchBoardCompleted = (board, value, difficulty) => ({
  type: "FETCHING_BOARD",
  payload: {
    board,
    value,
    difficulty
  }
})

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = params => {
  return Object.keys(params)
    .map(key => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");
};

export const getBoard = difficulty => {
  return dispatch => {
    api
      .get(`/board?difficulty=${difficulty}`)
      .then(({ data }) => {

        const board = data.board
        const boardCoordinate = board.map(row => {
          return row.map(col => {
            if (col == 0) {
              return { val: 0, canChange: true }
            } else {
              return {
                val: String(col), canChange: false
              }
            }
          })
        });
        dispatch(fetchBoardCompleted(boardCoordinate, board, difficulty))
      })
      .catch(({ response }) => {
        console.log(response);
      })
  }
}
export const solve = (data) => {
  return dispatch => {
    api
      .post(`/solve`, encodeParams(data),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      .then(({ data }) => {
        const solvedBoardProgress = data.solution
        const solvedBoard = solvedBoardProgress.map(row => {
          return row.map(col => {
            return { val: String(col), canChange: false }
          })
        })
        dispatch(fetchBoardCompleted(solvedBoard, data.solution, data.difficulty))
        dispatch(validate(data.status))

      })
      .catch(({ response }) => {
        console.log(response);
      })
  }
}

export const getName = (name) => ({
  type: "GET_NAME",
  payload: {
    name
  }
})

export const validate = (validation) => ({
  type: "VALIDATE_DATA",
  payload: {
    validation
  }
})

export const submit = (data) => {
  return dispatch => {
    api
      .post('/validate', encodeParams(data),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      .then(({ data }) => {
        const validation = data
        dispatch(validate(validation.status))
      })
      .catch(({ response }) => {
        console.log(response);
      })
  }
}

export const changeBoard = (board, value) => ({
  type: "CHANGE_BOARD",
  payload: {
    board,
    value
  }
})

