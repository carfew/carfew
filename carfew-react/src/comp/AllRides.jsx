import React, { Component } from 'react';
import withStyles from 'react-jss';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import geolib from 'geolib';

import PersonPin from '@material-ui/icons/PersonPin';
import SingleRide from './SingleRide';

const styles = {
  root: {
    display: 'flex',
    flexFlow: 'column',
  },
  ride: {
    display: 'flex',
    padding: 10,
    margin: 10,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)',
    borderRadius: 5,
    background: '#fff',
    transition: '0.2s',
    cursor:'pointer',
    '&:hover': {
      background: '#f9f9f9'
    }
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
      showOne: false,
      rideId: null
    }
  }

  getFrom = (ride) => {
    const ri = ride.origin.address_components.find((r) => {
      return r.types.indexOf('locality') > -1;
    })
    if(ri){
      return ri.short_name;
    } else {
      return ride.origin.address_components[3].short_name
    }
  }
  getTo = (ride) => {
    const ri = ride.destination.address_components.find((r) => {
      return r.types.indexOf('locality') > -1;
    })
    if(ri){
      return ri.short_name;
    } else {
      return ride.origin.address_components[3].short_name
    }
  }

  clickRide = (rideId) => {
    this.setState({
      rideId: rideId,
      showOne: true,
    })
  }

  handleBack = async () => {
    await this.props.showRoute(null, null, true)
    this.setState({
      showOne: false,
      rideId: null,
    })
  }


  render() {
    const { classes } = this.props; 
    if (this.state.showOne) {
      return(
        <div className={classes.root}>
          <SingleRide rideId={this.state.rideId} showRoute={this.props.showRoute} />
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <Button onClick={this.handleBack} color="secondary">Back</Button>
            <Button variant="contained" color="primary">Pick Up!</Button>
          </div>
        </div>)
    } else {
      return (
        <div className={classes.root}>
          <Typography variant="h4">Rides</Typography>
            <div style={{display:'flex',flexFlow:'column', overflow: 'scroll', maxHeight: '80vh'}}>
              {this.props.rides.map((ride) => {
                console.log(ride)
                return (
                  <div className={classes.ride} onClick={() =>{this.clickRide(ride._id)}}>
                    <div className={classes.userImage}>
                      <PersonPin style={{height: '100%', fontSize:'3em'}} />
                    </div>
                    <div className={classes.userInfo}>
                      <Typography variant="h6" noWrap={true} color="primary" style={{margin:0}}>{ride.rider.firstName} {ride.rider.lastName}</Typography>
                      <Typography variant="subtitle" noWrap={true} style={{margin:0, width: 230}}><i>{this.getFrom(ride)}</i> to <i>{this.getTo(ride)}</i></Typography>
                    </div>
                    <div className={classes.rideInfo}>
                      <Typography variant="subtitle2" noWrap={true}>{ride.driveDetails.distance}</Typography>
                      <Typography variant="caption" noWrap={true}>{ride.driveDetails.duration}</Typography>
                    </div>
                    {/*
                    <h4>{ride.origin.formatted_address}</h4>
                    <h6>to</h6>
                    <h4>{ride.destination.formatted_address}</h4>*/}
                  </div>
                )
              })}
          </div>
          <Button style={{marginTop:30, width: 'fit-content', alignSelf: 'flex-end'}} variant="contained" color="primary" onClick={this.props.changeAppState}>New Ride</Button>
        </div> 
      )
    }
  }
}

export default withStyles(styles)(AllRides)