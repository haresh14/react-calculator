import "./styles.css";
import React from 'react'
import Calculator from './Calculator'

class Button extends React.Component {
  render() {
    return (
        <button type="button" onClick={() => this.props.pressedKey(this.props.button)}>{this.props.button.label}</button>
    );
  }
}

export default Button;
