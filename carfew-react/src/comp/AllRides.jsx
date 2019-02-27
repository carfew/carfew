import React, { Component } from "react";
import withStyles from "react-jss";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";

import geolib from "geolib";

import SingleRide from "./SingleRide";
import Ride from "./Ride";
import { runInThisContext } from "vm";

const styles = {
  root: {
    display: "flex",
    flexFlow: "column"
  },
  paper: {
    position: "absolute",
    width: 300,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
    padding: 30,
    outline: "none"
  },
  ride: {
    display: "flex",
    padding: 10,
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
  },
  noRides: {
    height: 100,
    borderRadius: 10,
    margin: 10,
    boxSizing: "border-box",
    color: "#ccc",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#eee"
  }
};

class AllRides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOne: false,
      rideId: null,
      isSelf: false,
      modalOpen: false,
      allToggled: false
    };
  }

  getFrom = ride => {
    const ri = ride.origin.address_components.find(r => {
      return r.types.indexOf("locality") > -1;
    });
    if (ri) {
      return ri.short_name;
    } else {
      return ride.origin.address_components[3].short_name;
    }
  };
  getTo = ride => {
    const ri = ride.destination.address_components.find(r => {
      return r.types.indexOf("locality") > -1;
    });
    if (ri) {
      return ri.short_name;
    } else {
      return ride.origin.address_components[3].short_name;
    }
  };

  clickRide = (rideId, isUsers = false) => {
    this.setState({
      rideId: rideId,
      showOne: true,
      isUsers
    });
  };

  handleBack = async () => {
    await this.props.showRoute(null, null, true);
    this.setState({
      showOne: false,
      rideId: null,
      isUsers: null
    });
  };

  getIfDelete = isDelete => {
    this.setState({
      isSelf: true
    });
  };

  deleteRide = async rideId => {
    const res = await axios.delete(
      `${window.API_URL}/rides/${this.state.rideId}`
    );
    // window.location.reload();
    this.handleClose();
    this.handleBack();
  };

  handleOpen = () => {
    this.setState({
      modalOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      modalOpen: false
    });
  };

  handlePickup = async () => {
    const res = await axios.post(
      `${window.API_URL}/rides/accept/${this.state.rideId}`
    );

    this.handleClose();
    this.handleBack();
  };

  render() {
    const { classes } = this.props;
    if (this.state.showOne) {
      return (
        <div className={classes.root}>
          <SingleRide
            rideId={this.state.rideId}
            showRoute={this.props.showRoute}
            isUsers={this.state.isUsers}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={this.handleBack} color="secondary">
              Back
            </Button>
            {this.state.isUsers ? (
              <Button
                variant="contained"
                color="warning"
                onClick={this.handleOpen}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handlePickup}
              >
                Pick Up!
              </Button>
            )}
            <Modal open={this.state.modalOpen} onClose={this.handleClose}>
              <div className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                  Delete Ride
                </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                  Are you sure you want to delete this ride?
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    this.deleteRide(this.state.rideId);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Typography variant="h4">Rides</Typography>
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              overflow: "scroll",
              maxHeight: "80vh",
              paddingTop: 30
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Typography variant="caption">
                Available Rides to Pick Up
              </Typography>
              <Typography
                variant="caption"
                onClick={this.props.toggleShowAll}
                style={{
                  opacity: this.props.allRides ? 1 : 0.3,
                  cursor: "pointer"
                }}
              >
                Show All
              </Typography>
            </div>

            {this.props.rides.map(ride => {
              return (
                <Ride
                  key={ride._id}
                  ride={ride}
                  getTo={this.getTo}
                  getFrom={this.getFrom}
                  clickRide={this.clickRide}
                />
              );
            })}
            <Typography variant="caption">
              My Rides (requested and accepted)
            </Typography>
            {this.props.userRides.length > 0 ? (
              this.props.userRides.map(ride => {
                return (
                  <Ride
                    key={ride._id}
                    ride={ride}
                    getTo={this.getTo}
                    getFrom={this.getFrom}
                    clickRide={this.clickRide}
                    isUsers={true}
                  />
                );
              })
            ) : (
              <div className={classes.noRides}>
                <Typography variant="body1">You have no rides yet!</Typography>
              </div>
            )}
          </div>
          <Button
            style={{
              marginTop: 30,
              width: "fit-content",
              alignSelf: "flex-end"
            }}
            variant="contained"
            color="primary"
            onClick={this.props.changeAppState}
          >
            New Ride
          </Button>
        </div>
      );
    }
  }
}

export default withStyles(styles)(AllRides);
