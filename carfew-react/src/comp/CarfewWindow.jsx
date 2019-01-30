import React, { Component } from 'react';
import withStyles from 'react-jss';
import PlacesAutocomplete from 'react-places-autocomplete';

import LocationSearchInput from './LocationSearchInput.jsx';

const styles = {
  root: {
    margin: 20,
    width: 450,
    height: '95%',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    background: '#fff',
    borderRadius: 10,
    zIndex: 10,
    position: 'absolute',
    padding: 30
  }
}

class CarfewWindow extends Component {
  render() {
    const { classes } = this.props; 
    return (
      <div bordered={false} className={classes.root}>
        <LocationSearchInput origin />
        <LocationSearchInput dest />
      </div> 
    );
  }
}

export default withStyles(styles)(CarfewWindow)