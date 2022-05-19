import "./styles.css";
import React from 'react'
import Calculator from './Calculator'

class App extends React.Component {
  state = {
    theme: 'default'
  }

  onChangeTheme = (newTheme) => {
    this.setState({theme: newTheme})
  }

  render() {
    return (
        <div className={'app theme-' + this.state.theme}>
          <Calculator changeTheme={this.onChangeTheme}></Calculator>
        </div>
    );
  }
}

export default App;
