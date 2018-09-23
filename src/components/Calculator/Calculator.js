import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/calculatorActions';
import operators from '../../actions/operators';
import './Calculator.css';

const Buttons = (props) => (
  <div className="calculator__btn-wrapper">
    <button className="calculator__btn-operator" onClick={props.resetCurrentNumber}>CE</button>
    <button className="calculator__btn-operator" onClick={props.resetCalculator}>C</button>
    <button className="calculator__btn-operator calculator__btn-operator--remove-digit" onClick={props.removeDigit}>&#x279C;</button>
    <button className="calculator__btn-operator" onClick={props.changeOperator.bind(this, operators.divide)}>&divide;</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '7')}>7</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '8')}>8</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '9')}>9</button>
    <button className="calculator__btn-operator" onClick={props.changeOperator.bind(this, operators.multiply)}>&times;</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '4')}>4</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '5')}>5</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '6')}>6</button>
    <button className="calculator__btn-operator" onClick={props.changeOperator.bind(this, operators.subtract)}>&minus;</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '1')}>1</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '2')}>2</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '3')}>3</button>
    <button className="calculator__btn-operator" onClick={props.changeOperator.bind(this, operators.add)}>+</button>
    <button className="calculator__btn-operator" onClick={props.changeNumberState}>&plusmn;</button>
    <button className="calculator__btn-number" onClick={props.changeNumber.bind(this, '0')}>0</button>
    <button className="calculator__btn-operator" onClick={props.addDecimal}>&sdot;</button>
    <button className="calculator__btn-operator" onClick={props.showTotal}>=</button>
  </div>
);

const Calculator = (props) => (
  <div className="calculator">
    <div className="calculator__previous-input">{props.previousInput}</div>
    <div className="calculator__current-input">{props.currentInput}</div>
    <Buttons {...props} />
  </div>
);

const previousInput = (previousNumbers, previousOperators) => {
  let text = '';
  previousNumbers.forEach((number, index) => {
    text += `${number} `;
    if (index < previousOperators.length) {
      text += `${previousOperators[index]} `;
    }
  });
  return text;
}

const numberWithCommas = (number) => {
  var fragments = number.toString().split(".");
  fragments[0] = fragments[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fragments.join(".");
}

const mapStateToProps = state => ({
  state: state.calculator
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

const mergeProps = function (propsFromState, propsFromDispatch) {
  const dispatch = propsFromDispatch.dispatch;
  const state = propsFromState.state;
  return {
    currentInput: numberWithCommas(state.currentNumber),
    previousInput: previousInput(state.previousNumbers, state.previousOperators),
    removeDigit: () => {
      dispatch(actions.removeDigit(state.currentNumber));
    },
    resetCurrentNumber: () => {
      dispatch(actions.resetCurrentNumber());
    },
    resetCalculator: () => {
      dispatch(actions.resetCalculator());
    },
    changeNumber: (number) => {
      dispatch(actions.changeNumber(number, state.currentNumber));
    },
    changeOperator: (operator) => {
      dispatch(actions.changeOperator(operator, state));
    },
    changeNumberState: () => {
      dispatch(actions.changeNumberState(state.currentNumber));
    },
    addDecimal: () => {
      dispatch(actions.addDecimal(state.currentNumber));
    },
    showTotal: () => {
      dispatch(actions.showTotal(state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Calculator);