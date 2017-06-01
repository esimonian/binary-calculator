import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Radio from 'material-ui/Radio';
import Button from 'material-ui/Button';

import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import { AnswerBox } from './components/answerbox'
import { converter, convertFloatToBinary, convertIntegerToBinary, convertIntegerToBinarySteps } from './converter/converter'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: 100, 
      conversionType: "base2binary", 
      correctAnswer: 1100100, 
      answer: null,
      showAnswer: false };
  }
  
  decimalToBinary() {
   return convertIntegerToBinary(this.state.value);
  }
  decimalToBinarySteps() {
   return convertIntegerToBinarySteps(this.state.value)
  }
  
  binaryToDecimal() {
    return parseInt(this.state.value, 2);
  }

  binaryToDecimalSteps() {
    return parseInt(this.state.value, 2);
  }

  inputHandler(value) {
    this.setState({value: value})
    this.setState({correctAnswer: this.decimalToBinary})
  }

  checkAnswer(){
    if (this.state.correctAnswer === this.state.answer){
      alert('Correct answer')
    } else {
      alert('wrong answer')
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <Grid container style={{background: '#F0F0F0'}}>
          <Header />
          <Grid item xs={3}>
            <Paper style={{width: '100%', height: '100vh', float: 'left'}} zDepth={4} />
          </Grid> 
          <Grid item xs={9}>
            <div style={{margin: '2em', padding: '2em', textAlign: 'center', background: '#fff'}}>
               <InputBox
                state={this.state}
                radioHandler={conversionType => this.setState({ conversionType })}
                inputHandler={value => this.inputHandler(value)}
              />
              <div style={{borderTop: '0.125rem solid #f0f0f0'}}>
                <AnswerBox 
                  state={this.state}
                  inputHandler={answer => this.setState({ answer: parseInt(answer) })}
                />                
                <Button raised primary style={{width: '100%'}} onClick={() => this.checkAnswer()}>Answer</Button>
                <ResultsBox
                  value={this.state.conversionType == "base2binary" ? this.decimalToBinary() : this.binaryToDecimal()} 
                  steps={this.state.conversionType == "base2binary" ? this.decimalToBinarySteps() : this.decimalToBinarySteps()} 
                />
              </div>
              
            </div>
           
          </Grid>
          
        </Grid>
      </MuiThemeProvider>
    );
  }
}



const InputBox = props => {
  return (
    <form className="text-center">
      <div className="form-group">
        <label className="radio-inline">
          <Radio type="radio" 
            onClick={() => props.radioHandler("base2binary")} 
            checked={props.state.conversionType == "base2binary"}
            />Base(10) to Binary
        </label>
        <label className="radio-inline">
          <Radio type="radio"
            onClick={() => props.radioHandler("binary2base")} 
            checked={props.state.conversionType == "binary2base"}
            />Binary to Base(10)
        </label>
      </div>
      <div className="form-group">
        <TextField 
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
      <ul>
      <h2>{value}</h2>
      {listItems}
      </ul>
    );
  
}

export default App;
