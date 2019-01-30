import React, { Component } from 'react';
import withStyles from 'react-jss';
import classnames from 'classnames';

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


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classnames(classes.root, 'App')}>
        <CarfewWindow />
        <MapComponent
        googleMapURL={'/'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div className={classes.mapView} />}
        mapElement={<div style={{ height: `100%`, zIndex: 0 }} />}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
