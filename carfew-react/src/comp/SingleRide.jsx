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
    // console.log(res.data.ride)
    await this.setState({
      ride: res.data.ride,
    })
    this.props.showRoute(res.data.ride.origin, res.data.ride.destination);
  }

  render() {
    return (
      <div>
        {this.state.ride && 
          <div>
            {this.state.ride.rider && <Typography variant="h6">{this.state.ride.rider.firstName} {this.state.ride.rider.lastName}</Typography>}
            <Typography variant="body2">{this.state.ride.origin.formatted_address}</Typography>
            <Typography variant="body1">to</Typography>
            <Typography variant="body2">{this.state.ride.destination.formatted_address}</Typography>
            <Typography style={{padding:10, background:"#eee", borderRadius: 2}} variant="body1">{this.state.ride.description}</Typography>
            <br/>
            <Typography variant="caption">{this.state.ride.pickupStart}</Typography>
            <Typography variant="body1">{this.state.ride.driveDetails.distance}</Typography>
            <Typography variant="body1">{this.state.ride.driveDetails.duration}</Typography>
          </div>
        }
      </div>
    );
  }
}
