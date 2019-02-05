/* global google */
import React, { Component } from 'react';
import withStyles from 'react-jss';
import classnames from 'classnames';
import { withScriptjs } from 'react-google-maps';
import indigo from '@material-ui/core/colors/indigo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import './index.css'

import CarfewWindow from './comp/CarfewWindow.jsx';
import MapComponent from './comp/MapComponent.jsx';

const styles = {
  root: {
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
  }, 
  mapView: {
    position: 'absolute',
    top:0,
    left:0,
    width: '100vw',
    height: '100vh',
    zIndex: 0
  }
}

const theme = createMuiTheme({
  palette: {
    primary: indigo
  }
})


class App extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();

    this.state = {
      origin: {},
      dest: {},
      route: null,
    }
  }

  changeRoute = (route) => {
    this.setState({
      route
    })
  }

  changeAddress = ( addr, key ) => {
    // if(!this.state.origin.lat && key === 'dest') {
    //   this.mapRef.node.panTo(new google.maps.LatLng(addr.lat, addr.lng))
    // }
    // else if(!this.state.dest.lat && key === 'origin') {
    //   this.mapRef.node.panTo(new google.maps.LatLng(addr.lat, addr.lng))
    // } else if(this.state.origin.lat && this.state.dest.lat) {
    //   console.log(addr)
    //   this.mapRef.node.panToBounds(new google.maps.LatLngBounds([new google.maps.LatLng(this.state.origin.lat, this.state.origin.lng),new google.maps.LatLng(this.state.dest.lat, this.state.dest.lng)]))
    // }
    this.setState({
      [key]: addr
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classnames(classes.root, 'App')}>
          <CarfewWindow 
          changeAddress={this.changeAddress} 
          origin={this.state.origin} 
          dest={this.state.dest}
          route={this.state.route}
           />
          }
          <MapComponent
          mapRef={this.mapRef}
          origin={this.state.origin}
          dest={this.state.dest}
          googleMapURL={'/'}
          changeRoute={this.changeRoute}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className={classes.mapView} />}
          mapElement={<div style={{ height: `100%`, zIndex: 0 }} />}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
