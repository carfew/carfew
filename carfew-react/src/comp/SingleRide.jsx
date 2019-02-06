import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export default class SingleRide extends Component {
  constructor(props){
    super(props);

    this.state = {
      ride: null
    };
  }

  componentDidMount = async () => {
    const res = await axios.get(`/rides/${this.props.rideId}`);
    console.log(res.data.ride)
    this.setState({
      ride: res.data.ride,
    })
  }

  render() {
    return (
      <div>
        {this.state.ride && 
          <div>
            <Typography variant="h6">{this.state.ride.rider.firstName} {this.state.ride.rider.lastName}</Typography>
            <Typography variant="body2">{this.state.ride.origin.formatted_address}</Typography>
            <Typography variant="body1">to</Typography>
            <Typography variant="body2">{this.state.ride.destination.formatted_address}</Typography>
            <br/>
            <Typography variant="body1">{this.state.ride.driveDetails.distance}</Typography>
            <Typography variant="body1">{this.state.ride.driveDetails.duration}</Typography>
          </div>
        }
      </div>
    );
  }
}
