import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { withStyles } from "@material-ui/core";
import PersonPin from "@material-ui/icons/PersonPin";
import { classnames } from "classnames";

const styles = {
  ride: {
    display: "flex",
    padding: 10,
    minHeight: 75,
    margin: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14)",
    borderRadius: 5,
    background: "#fff",
    transition: "0.2s",
    cursor: "pointer",
    "&:hover": {
      background: "#f9f9f9"
    }
  },
  userInfo: {
    marginLeft: 5,
    display: "flex",
    flexFlow: "column",
    alignItems: "flex-start",
    flex: 1,
    borderRight: "1px solid #ccc"
  },
  rideInfo: {
    padding: 5,
    width: 60
  }
};

class Ride extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ride: null
    };
  }

  componentDidMount = async () => {};

  getType = () => {
    let border;
    switch (this.props.ride.status) {
      case "proposed":
        border = "2px solid #69B053";
        break;
      default:
        border = "";
    }
    return border;
  };

  render() {
    const { ride, classes } = this.props;

    return (
      <div
        className={classes.ride}
        style={{
          border: this.getType()
        }}
        onClick={() => {
          this.props.clickRide(ride._id, this.props.isUsers);
        }}
      >
        <div className={classes.userImage}>
          <PersonPin style={{ height: "100%", fontSize: "3em" }} />
        </div>
        <div className={classes.userInfo}>
          {ride.rider && (
            <Typography
              variant="h6"
              noWrap={true}
              color="primary"
              style={{ margin: 0 }}
            >
              {ride.rider.firstName} {ride.rider.lastName}
            </Typography>
          )}
          <Typography
            variant="subtitle1"
            noWrap={true}
            style={{ margin: 0, width: 230 }}
          >
            <i>{this.props.getFrom(ride)}</i> to <i>{this.props.getTo(ride)}</i>
          </Typography>
        </div>
        <div className={classes.rideInfo}>
          <Typography variant="subtitle2" noWrap={true}>
            {ride.driveDetails.distance}
          </Typography>
          <Typography variant="caption" noWrap={true}>
            {ride.driveDetails.duration}
          </Typography>
        </div>
        {/*
        <h4>{ride.origin.formatted_address}</h4>
        <h6>to</h6>
        <h4>{ride.destination.formatted_address}</h4>*/}
      </div>
    );
  }
}

export default withStyles(styles)(Ride);
