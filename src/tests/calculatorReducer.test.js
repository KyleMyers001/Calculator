import * as actions from '../actions/calculatorActions';
import reducer from '../reducers/calculatorReducer';
import types from '../actions/types';
import operators from '../actions/operators';

const initialState = {
  currentNumber: 0,
  previousNumbers: [],
  previousOperators: []
}

describe('Change number', () => {
  it('Should add numbers after decimal', () => {
    const currentNumber = '1.';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '1.2' };
    const action = actions.changeNumber('2', currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should change current number from positive 0 to 1', () => {
    const currentNumber = '0';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '1' };
    const action = actions.changeNumber('1', currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should change current number from negative 0 to -1', () => {
    const currentNumber = '-0';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '-1' };
    const action = actions.changeNumber('1', currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should change current number from 1 to 12', () => {
    const currentNumber = '1';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '12' };
    const action = actions.changeNumber('2', currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });
});

describe('Change number state', () => {
  it('Should change current number from 12 to -12', () => {
    const currentNumber = '12';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '-12' };
    const action = actions.changeNumberState(currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should change current number from -12 to 12', () => {
    const currentNumber = '-12';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '12' };
    const action = actions.changeNumberState(currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });
});

describe('Remove digit', () => {
  it('Should remove a digit from 12 to 1', () => {
    const currentNumber = '12';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '1' };
    const action = actions.removeDigit(currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should remove a digit from 1 to 0', () => {
    const currentNumber = '1';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '0' };
    const action = actions.removeDigit(currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });
});

describe('Add decimal', () => {
  it('Should add decimal', () => {
    const currentNumber = '1';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: '1.' };
    const action = actions.addDecimal(currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should not add more than 1 decimal', () => {
    const currentNumber = '1.5';
    const originalState = { ...initialState, currentNumber: currentNumber };
    const expectedState = { ...initialState, currentNumber: currentNumber };
    const action = actions.addDecimal(currentNumber);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });
});

describe('Show total', () => {
  it('Should add 2 and 8 to equal 10', () => {
    const originalState = {
      currentNumber: '8',
      previousNumbers: [2],
      previousOperators: [operators.add]
    };
    const expectedState = { ...initialState, currentNumber: '10' };
    const action = actions.showTotal(originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should subtract 9 from 10 to equal 1', () => {
    const originalState = {
      currentNumber: '9',
      previousNumbers: [10],
      previousOperators: [operators.subtract]
    };
    const expectedState = { ...initialState, currentNumber: '1' };
    const action = actions.showTotal(originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should multiply 1 by 2 and equal 2', () => {
    const originalState = {
      currentNumber: '2',
      previousNumbers: [1],
      previousOperators: [operators.multiply]
    };
    const expectedState = { ...initialState, currentNumber: '2' };
    const action = actions.showTotal(originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should divide 2 by 4 to equal 0.5', () => {
    const originalState = {
      currentNumber: '4',
      previousNumbers: [2],
      previousOperators: [operators.divide]
    };
    const expectedState = { ...initialState, currentNumber: '0.5' };
    const action = actions.showTotal(originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should divide 1 by 50000 to equal 0.00002', () => {
    const originalState = {
      currentNumber: '50000',
      previousNumbers: [1],
      previousOperators: [operators.divide]
    };
    const expectedState = { ...initialState, currentNumber: '0.00002' };
    const action = actions.showTotal(originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should calculate total with all operators', () => {
    const originalState = {
      currentNumber: '4',
      previousNumbers: [1, 10, 2, 4],
      previousOperators: [operators.add, operators.multiply, operators.subtract, operators.divide]
    };
    const expectedState = { ...initialState, currentNumber: '4.5' };
    const action = actions.showTotal(originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });
});

describe('Change operator', () => {
  it('Should store current number and operator, and reset current number', () => {
    const operator = operators.add;
    const originalState = { currentNumber: '1', previousNumbers: [], previousOperators: [] };
    const expectedState = { currentNumber: '0', previousNumbers: [1], previousOperators: [operator] };
    const action = actions.changeOperator(operator, originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });

  it('Should replace previous operator', () => {
    const operator = operators.add;
    const originalState = { currentNumber: '0', previousNumbers: [], previousOperators: [operators.subtract] };
    const expectedState = { currentNumber: '0', previousNumbers: [], previousOperators: [operator] };
    const action = actions.changeOperator(operator, originalState);
    expect(reducer(originalState, action)).toEqual(expectedState);
  });
});
