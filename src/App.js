import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = { number: null, inputValue: '' };

    this.buttonClicked = this.buttonClicked.bind(this);
    this.updateNumberInputValue = this.updateNumberInputValue.bind(this);
  }

  buttonClicked = async () => {
    try {
      const { data: { result } } = await axios.get('http://localhost:10010/translate/' + this.state.inputValue);
      this.setState({ number: result });
    } catch (e) {
      const { request: { response } } = e;
      const parsedResponse = JSON.parse(response);
      return this.setState({ number: parsedResponse.message });
    }
  };

  updateNumberInputValue(evt) {
    this.setState({ inputValue: evt.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Translate my number!</h1>
        </header>
        <div className="App-intro">
          <div>
            <input type="text" placeholder="100" value={this.state.inputValue}
                   onChange={evt => this.updateNumberInputValue(evt)}/>
          </div>
          <div>
            <span>{this.state.number || 'Give me a number'}</span>
          </div>
          <button onClick={this.buttonClicked}>Translate!</button>
        </div>
      </div>
    );
  }
}

export default App;
