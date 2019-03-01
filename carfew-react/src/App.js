/* global google */
import React, { Component } from 'react';
import withStyles from 'react-jss';
import classnames from 'classnames';
import { withScriptjs } from 'react-google-maps';
import axios from 'axios';
import indigo from '@material-ui/core/colors/indigo';
import _ from 'underscore';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import CarfewWindow from './comp/CarfewWindow.jsx';
import MapComponent from './comp/MapComponent.jsx';
import { Typography } from '@material-ui/core';
import './index.css';

window.API_URL = 'http://localhost:8081';

const styles = {
  root: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[300]
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();

    this.state = {
      origin: {},
      dest: {},
      route: null,
      rides: [],
      shownRides: [],
      allRides: false,
      myRides: [],
      newRide: false,
      directions: null,
      username: ''
    };
  }

  changeRoute = route => {
    this.setState({
      route
    });
  };

  getRides = async () => {
    const res = await axios.get(`${window.API_URL}/rides`);
    let rides;
    if (res.data.userRides.length > 0) {
      rides = res.data.rides.filter(x => {
        return x.rider !== res.data.userRides[0].rider;
      });
    } else {
      rides = res.data.rides;
    }
    this.setState({
      shownRides: rides.filter(t => t.status === 'posted'),
      rides,
      myRides: res.data.userRides,
      username: res.data.username
    });
  };

  componentDidMount = async () => {
    await this.getRides();
  };

  changeAppState = () => {
    this.setState({
      newRide: !this.state.newRide
    });
  };

  changeAddress = (addr, key) => {
    this.setState({
      [key]: addr
    });
  };

  toggleShowAll = () => {
    if (!this.state.allRides) {
      this.setState({
        shownRides: this.state.rides,
        allRides: true
      });
    } else {
      this.setState({
        shownRides: this.state.rides.filter(t => t.status === 'posted'),
        allRides: false
      });
    }
  };

  showRoute = (origin, dest, del = false) => {
    if (del) {
      this.setState({ directions: null });
      return;
    }
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(dest.lat, dest.lng),
        travelMode: google.maps.TravelMode.DRIVING
      },
      async (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          await this.changeRoute(result.routes[0].legs[0]);
          this.setState({
            directions: result
          });
        } else {
          // console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classnames(classes.root, 'App')}>
          <AppBar>
            <Toolbar>
              <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                <a href="/">
                  <Button color="inherit">Carfew</Button>
                </a>
              </Typography>
              <a href="/dashboard">
                <Button color="inherit">
                  {this.state.username}'s Dashboard
                </Button>
              </a>
              <a href="/logout">
                <Button color="inherit">Logout</Button>
              </a>
            </Toolbar>
          </AppBar>
          <CarfewWindow
            changeAddress={this.changeAddress}
            origin={this.state.origin}
            dest={this.state.dest}
            rides={this.state.shownRides}
            userRides={this.state.myRides}
            newRide={this.state.newRide}
            changeAppState={this.changeAppState}
            getRides={this.getRides}
            route={this.state.route}
            showRoute={this.showRoute}
            toggleShowAll={this.toggleShowAll}
            allRides={this.state.allRides}
          />
          } }
          <MapComponent
            mapRef={this.mapRef}
            origin={this.state.origin}
            dest={this.state.dest}
            googleMapURL={'/'}
            changeRoute={this.changeRoute}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className={classes.mapView} />}
            mapElement={<div style={{ height: `100%`, zIndex: 0 }} />}
            newRide={this.state.newRide}
            rides={this.state.shownRides}
            directions={this.state.directions}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
