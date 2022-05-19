import './styles.css'
import React from 'react'
import Button from './Button'

class Calculator extends React.Component {
  state = {
    expression: '',
    buttons: [
      [ { label: 7 }, { label: 8 }, { label: 9 }, { label: 'DEL', value: 'del' } ],
      [ { label: 4 }, { label: 5 }, { label: 6 }, { label: '+' } ],
      [ { label: 1 }, { label: 2 }, { label: 3 }, { label: '-' } ],
      [ { label: '.' }, { label: 0 }, { label: '/' }, { label: 'x', value: '*' } ]
    ],
    validKeys: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '+', '/', '*', '=', 'Backspace', 'Enter' ]
  }

  changeTheme = (e) => {
    const range = e.target.value
    let theme

    if (range == 0) {
      theme = 'default'
    }
    else if (range == 50) {
      theme = 'light'
    }
    else {
      theme = 'dark'
    }

    this.props.changeTheme(theme)
  }

  onButtonPressed = (btn) => {
    if (btn.value === 'del') {
      let expression = this.state.expression

      if (expression.length === 0) {
        return
      }

      expression = expression.substring(0, expression.length - 1)
      this.setState({ expression })
      return
    }

    this.prepareExpression(btn.value || btn.label)
  }

  keyPressed = (event) => {
    if (!this.state.validKeys.includes(event.key)) {
      return
    }

    if (event.key === 'Backspace') {
      let expression = this.state.expression

      if (expression.length === 0) {
        return
      }

      expression = expression.substring(0, expression.length - 1)
      this.setState({ expression })
      return
    }

    if (event.key === 'Enter' || event.key === '=') {
      this.evalExpression()
      return
    }

    this.prepareExpression(event.key)
  }

  prepareExpression = (val) => {
    let expression = this.state.expression
    expression += val

    this.setState({ expression })
  }

  evalExpression = () => {
    const result = eval(this.state.expression)
    this.setState({ expression: `${result}` })
  }

  render() {
    return (
        <div className="calculator">
          <div className="calc-header">
            <span className="title">calc</span>
            <div className="themes" id="themes">
              <span className="text">THEMES</span>
              <input type="range" className="range" onChange={this.changeTheme} defaultValue="0" name="range" step="50"/>
            </div>
          </div>

          <div className="calc-expression">
            <input autoFocus value={this.state.expression} onKeyUp={this.keyPressed}/>
          </div>
          <div className="calc-body">
            <div className="calc-buttons">
              {this.state.buttons.map((row, i) => (
                  <div className="calc-btn-row" key={i}>
                    {row.map((btn, j) => (
                        <Button key={j} button={btn} pressedKey={this.onButtonPressed}/>
                    ))}
                  </div>
              ))}
              <div>
                <button type="button" onClick={() => this.setState({expression: ''})} className="reset-btn">RESET</button>
                <button type="button" onClick={this.evalExpression} className="equal-btn">=</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Calculator
