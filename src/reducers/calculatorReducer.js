import types from '../actions/types';

const initialState = {
  currentNumber: '0',
  previousNumbers: [],
  previousOperators: []
}

export default(state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_NUMBER:
    case types.ADD_DECIMAL:
    case types.CHANGE_NUMBER_STATE:
    case types.RESET_CURRENT_NUMBER:
    case types.REMOVE_DIGIT:
      return {
        ...state,
        currentNumber: action.currentNumber
      }
    case types.SHOW_TOTAL:
    case types.CHANGE_OPERATOR:
    case types.RESET_CALCULATOR:
      return {currentNumber: action.currentNumber, previousNumbers: action.previousNumbers, previousOperators: action.previousOperators}
    default:
      return state;
  }
}
