import types from './types';
import operators from './operators';

const calculate = (firstNumber, secondNumber, operator) => {
  switch (operator) {
    case operators.add:
      firstNumber += secondNumber;
      break;
    case operators.subtract:
      firstNumber -= secondNumber;
      break;
    case operators.multiply:
      firstNumber *= secondNumber;
      break;
    case operators.divide:
      firstNumber /= secondNumber;
      break;
    default:
      break;
  }
  return firstNumber;
}

const calculateTotal = (previousNumbers, previousOperators) => {
  let sum = 0;
  previousNumbers.forEach((number, index) => {
    if (index === 0) {
      sum = number;
      return;
    }
    sum = calculate(sum, number, previousOperators[index - 1]);
  });
  return String(trimLongNumber(sum));
}

const trimLongNumber = (number) => {
  return parseFloat(number.toFixed(10));
}

export const showTotal = (state) => {
  storeCurrentNumberInPreviousNumbers(state);
  return {
    type: types.SHOW_TOTAL,
    currentNumber: calculateTotal(state.previousNumbers, state.previousOperators),
    previousNumbers: [],
    previousOperators: []
  };
}

const storeCurrentNumberInPreviousNumbers = (state) => {
  state.previousNumbers.push(Number(state.currentNumber));
  state.currentNumber = '0';
}

const storeOperatorInPreviousOperators = (state, operator) => {
  state.previousOperators.push(operator);
}

const numberIsZero = (number) => {
  return Math.abs(Number(number)) === 0;
}

export const changeOperator = (operator, state) => {
  if (!numberIsZero(state.currentNumber)) {
    storeOperatorInPreviousOperators(state, operator);
    storeCurrentNumberInPreviousNumbers(state);
  }
  else if (previousOperatorsExist(state.previousOperators)) {
    replacePreviousOperator(state, operator);
  }

  return {
    type: types.CHANGE_OPERATOR,
    currentNumber: state.currentNumber,
    previousNumbers: state.previousNumbers,
    previousOperators: state.previousOperators
  };
}

const replacePreviousOperator = (state, operator) => {
  state.previousOperators.pop();
  state.previousOperators.push(operator);
}

const previousOperatorsExist = (previousOperators) => {
  return previousOperators.length > 0;
}

const hasDecimal = (number) => {
  return number.includes('.');
}

export const addDecimal = (number) => {
  if (!hasDecimal(number)) {
    number = number.concat('', '.');
  }
  return {
    type: types.ADD_DECIMAL,
    currentNumber: number
  };
}

const negativeZeroWithNoDecimal = (number) => {
  return number === "-0";
}

const positiveZeroWithNoDecimal = (number) => {
  return number === "0";
}

export const changeNumber = (number, currentNumber) => {
  if (positiveZeroWithNoDecimal(currentNumber)) {
    currentNumber = number;
  }
  else if (negativeZeroWithNoDecimal(currentNumber)) {
    currentNumber = "-" + number;
  }
  else if (!numberIsTooLong(currentNumber)) {
    currentNumber = currentNumber.concat('', number);
  }

  return { type: types.CHANGE_NUMBER, currentNumber: currentNumber };
}

const numberIsTooLong = (number) => {
  return number.length >= 14;
}

const isPositiveNumber = (number) => {
  return !number.includes('-');
}

export const changeNumberState = number => {
  number = isPositiveNumber(number) ? `-${number}` : number.replace('-', '');
  return { type: types.CHANGE_NUMBER_STATE, currentNumber: number };
}

export const removeDigit = (number) => {
  number = number.slice(0, -1);
  if (number.length === 0) {
    number = '0';
  }
  return { type: types.REMOVE_DIGIT, currentNumber: number };
}

export const resetCurrentNumber = () => {
  return { type: types.RESET_CURRENT_NUMBER, currentNumber: '0' };
}

export const resetCalculator = () => {
  return {
    type: types.RESET_CALCULATOR,
    currentNumber: '0',
    previousNumbers: [],
    previousOperators: []
  };
}




