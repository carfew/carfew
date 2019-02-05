import React, { Component } from 'react';
import withStyles from 'react-jss';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import axios from 'axios';

import LocationSearchInput from './LocationSearchInput.jsx';

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start',
  },
  fab: {
    marginLeft:'auto'
  },
  rideInfoContainer: {
    width: '100%',
    background: '#eee',
    padding: 20,
    boxSizing: 'border-box',
    marginTop:20,
    borderRadius: 5,
  },
  grid: {
    alignSelf: 'flex-start'
  }
}

class CarfewWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      origin: this.props.origin,
      dest: this.props.dest,
      pickupStart: new Date(),
    }
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  submitRide = async () => {
    const res = await axios.post('/rides', {
      origin: this.props.origin,
      destination: this.props.dest,
      pickupStart: this.state.pickupStart,
    })

    this.props.changeAppState();
  }


  render() {
    const { classes } = this.props; 
    const { pickupStart, toDate } = this.state;
    return (
      <div bordered={false} className={classes.root}>
        <Typography variant="h4">Schedule a Ride</Typography>
        <LocationSearchInput origin changeAddress={this.props.changeAddress}/>
        <LocationSearchInput dest changeAddress={this.props.changeAddress}/>
        <MuiPickersUtilsProvider utils={MomentUtils} >
          <Grid container className={classes.grid} justify="space-around">
            <TimePicker
              margin="normal"
              label="Pick Up Time"
              value={pickupStart}
              onChange={this.handleDateChange}
              style={{marginRight: 'auto'}}
            />{/*
            <TimePicker
              margin="normal"
              label="Ends"
              value={toDate}
              onChange={this.handleDateChange}
            />*/}
          </Grid>
        </MuiPickersUtilsProvider>
        {this.props.route && 
        <div className={classes.rideInfoContainer}>
          <Typography variant="subtitle2">Ride Distance: {this.props.route.distance.text}</Typography>
          <Typography variant="subtitle2">Ride Length: {this.props.route.duration.text}</Typography>
        </div>}
        <div style={{display:'flex', width: '100%', marginTop: 20}}>
          <Button color="secondary">Cancel</Button>
          <Button onClick={this.submitRide} variant="contained" color="primary" className={classes.fab} disabled={!(this.props.origin.hasOwnProperty('lat') && this.props.dest.hasOwnProperty('lat'))}>
            Submit
          </Button>
        </div>
      </div> 
    );
  }
}

export default withStyles(styles)(CarfewWindow)