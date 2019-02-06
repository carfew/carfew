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
  },
  userInfo: {
    marginLeft: 5,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start',
    flex: 1,
    borderRight: '1px solid #ccc'
  },
  rideInfo: {
    padding: 5,
    width: 60
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
    console.log(this.props.rides)
    return (
      <div className={classes.root}>
        {this.props.rides.map((ride) => {
          return (
            <div className={classes.user}>
              <div className={classes.userImage}>
                <PersonPin style={{height: '100%', fontSize:'3em'}} />
              </div>
              <div className={classes.userInfo}>
                <Typography variant="h6" noWrap={true} color="primary" style={{margin:0}}>Bob Incredible</Typography>
                <Typography variant="subtitle" noWrap={true} style={{margin:0, width: 230}}><i>{ride.origin.address_components[3].long_name}</i> to <i>{ride.destination.address_components[3].long_name}</i></Typography>
              </div>
              <div className={classes.rideInfo}>
                <Typography variant="subtitle2" noWrap={true}>{ride.driveDetails.distance}</Typography>
                <Typography variant="caption" noWrap={true}>away</Typography>
              </div>
              {/*
              <h4>{ride.origin.formatted_address}</h4>
              <h6>to</h6>
              <h4>{ride.destination.formatted_address}</h4>*/}
            </div>
          )
        })}
        <Button style={{marginTop:30, width: 'fit-content', alignSelf: 'flex-end'}} variant="contained" color="primary" onClick={this.props.changeAppState}>New Ride</Button>

      </div> 
    );
  }
}

export default withStyles(styles)(AllRides)