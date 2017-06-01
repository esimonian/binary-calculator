import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export const AnswerBox = props => {
  return (
    <TextField 
      className="form-control text-center inputForm" 
      label="Type Your Answer Here"
      onChange={ev => props.inputHandler(ev.target.value)}
      value={props.state.answer}
    />
  );
}