import React, { Component } from 'react';
import withStyles from 'react-jss';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
  }
}

class AllRides extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    const { classes } = this.props; 
    return (
      <div className={classes.root}>
        <Button variant="raised" color="primary" onClick={this.props.changeAppState}>New Ride</Button>
        {this.props.rides.map((ride) => {
          return (
            <div>
              <h4>{ride.origin.formatted_address}</h4>
              <h6>to</h6>
              <h4>{ride.destination.formatted_address}</h4>
            </div>
          )
        })}
      </div> 
    );
  }
}

export default withStyles(styles)(AllRides)