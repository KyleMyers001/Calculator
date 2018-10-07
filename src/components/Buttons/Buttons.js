import React from 'react';
import PropTypes from 'prop-types';
import operators from '../../actions/operators';
import './Buttons.css';

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

Buttons.propTypes = {
  addDecimal: PropTypes.func,
  changeNumber: PropTypes.func,
  changeNumberState: PropTypes.func,
  changeOperator: PropTypes.func,
  resetCurrentNumber: PropTypes.func,
  resetCalculator: PropTypes.func,
  removeDigit: PropTypes.func,
  showTotal: PropTypes.func,
}

export default Buttons;