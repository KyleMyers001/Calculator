import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Buttons from '../Buttons/Buttons';
import * as actions from '../../actions/calculatorActions';
import './Calculator.css';

const Calculator = (props) => (
  <div className="calculator">
    <div className="calculator__previous-input">{props.previousInput}</div>
    <div className="calculator__current-input">{props.currentInput}</div>
    <Buttons {...props} />
  </div>
);

Calculator.propTypes = {
  previousInput: PropTypes.string,
  currentInput: PropTypes.string
}

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
  var fragments = number.toString().split('.');
  fragments[0] = fragments[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return fragments.join('.');
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
