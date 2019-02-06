import React, { Component } from 'react';
import withStyles from 'react-jss';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import PersonPin from '@material-ui/icons/PersonPin';

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'column',
  },
  user: {
    display: 'flex',
    padding: 10,
    margin: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    borderRadius: 5,
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
        {this.props.rides.map((ride) => {
          return (
            <div className={classes.user}>
              <div className={classes.userImage}>
                <PersonPin style={{height: '100%', fontSize:'3em'}} />
              </div>
              <div className={classes.userInfo}>
                <Typography variant="h6" noWrap={true}>Bob Incredible</Typography>
              </div>{/*
              <h4>{ride.origin.formatted_address}</h4>
              <h6>to</h6>
              <h4>{ride.destination.formatted_address}</h4>*/}
            </div>
          )
        })}
        <Button variant="contained" color="primary" onClick={this.props.changeAppState}>New Ride</Button>

      </div> 
    );
  }
}

export default withStyles(styles)(AllRides)