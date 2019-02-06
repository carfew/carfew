import React, { Component } from 'react';
import withStyles from 'react-jss';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import PlacesAutocomplete from 'react-places-autocomplete';


import NewRide from './NewRide.jsx';
import AllRides from './AllRides.jsx';

import LocationSearchInput from './LocationSearchInput.jsx';

const styles = {
  root: {
    margin: 20,
    width: 450,
    // height: '95%',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    background: '#fff',
    borderRadius: 10,
    zIndex: 10,
    position: 'absolute',
    padding: 30
  }
}

class CarfewWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: this.props.origin,
      dest: this.props.dest,
      rides: [],
      mount: false
    }
  }

  componentDidMount = () => {
    this.setState({
      mount: true
    })
  }

  render() {
    const { classes } = this.props; 
    return (
      <Slide direction="up" in={this.state.mount}>
        <div className={classes.root}>
          { this.props.newRide ?
            <NewRide 
              origin={this.props.origin} 
              dest={this.props.dest} 
              changeAddress={this.props.changeAddress} 
              route={this.props.route}
              changeAppState={this.props.changeAppState}
            /> :
            <AllRides 
              changeAppState={this.props.changeAppState}
              rides={this.props.rides}
             />
          } 
        </div> 
      </Slide>
    );
  }
}

export default withStyles(styles)(CarfewWindow)