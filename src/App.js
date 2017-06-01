import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

import logo from './logo.svg';
import './App.css';


import { converter, convertFloatToBinary, convertIntegerToBinary, convertIntegerToBinarySteps } from './converter/converter'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  state = { value: 100, conversionType: "d2b", steps: [] };
  
  decimalToBinary() {
   return convertIntegerToBinary(this.state.value);
  }
  decimalToBinarySteps() {
   return convertIntegerToBinarySteps(this.state.value)
  }
  
  binaryToDecimal() {
    return parseInt(this.state.value, 2);
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            title="Binary Converter"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <div>
            <Paper style={{width: 200, height: '100vh', float: 'left'}} zDepth={4} />
            <div>
              <InputBox
                state={this.state}
                radioHandler={conversionType => this.setState({ conversionType })}
                inputHandler={value => this.setState({ value })}
              />
              <ResultsBox
                value={this.state.conversionType == "d2b" ? this.decimalToBinary() : this.binaryToDecimal()} 
                steps={this.state.conversionType == "d2b" ? this.decimalToBinarySteps() : this.binaryToDecimalSteps()} 
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const InputBox = props => {
  return (
    <form className="text-center">
      <div className="form-group">
        <label className="radio-inline">
          <input type="radio" 
            onClick={() => props.radioHandler("d2b")} 
            checked={props.state.conversionType == "d2b"}
            />Base(10) to Binary
        </label>
        <label className="radio-inline">
          <input type="radio"
            onClick={() => props.radioHandler("b2d")} 
            checked={props.state.conversionType == "b2d"}
            />Binary to Base(10)
        </label>
      </div>
      <div className="form-group">
        <input type="number"
          onChange={ev => props.inputHandler(ev.target.value)}
          className="form-control text-center inputForm" 
          placeholder="Value to Convert"
          value={props.state.value}
          />
      </div>
    </form>
  );
}

const ResultsBox = props => { 
  const steps = props.steps;
  const value = props.value
  const listItems = steps.map((step) =>
    <li>{step}</li>
  );
    return (
      <ul style={{borderTop: '0.125rem solid #f0f0f0'}}>
      <h2>{value}</h2>
      {listItems}
      </ul>
    );
  
}

export default App;
