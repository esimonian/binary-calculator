import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { LabelRadio, RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl } from 'material-ui/Form';

const styleSheet = createStyleSheet('Switcher', theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0`,
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));

class Switcher extends Component {
  state = {
    selectedValue: undefined,
  };

  handleChange = (event, value) => {
    this.setState({ selectedValue: value });
  };

  render() {
    const classes = this.props.classes;

    return (
      <FormControl>
        <RadioGroup
          className={classes.group}
          selectedValue={this.state.selectedValue}
          onChange={this.handleChange}
        >
          <LabelRadio label="Base(10) to Binary" value="base2binary" />
          <LabelRadio label="Binary to Base(10)" value="binary2base" />
        </RadioGroup>
      </FormControl>
    );
  }
}

Switcher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(Switcher);