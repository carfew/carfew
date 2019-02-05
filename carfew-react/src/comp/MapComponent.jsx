/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, } from "react-google-maps";


const mapStyle = [
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

class MapComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  makeRoute() {
    const props = this.props;
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: new google.maps.LatLng(props.origin.lat, props.origin.lng),
      destination: new google.maps.LatLng(props.dest.lat, props.dest.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, async (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        await this.props.changeRoute(result.routes[0].legs[0]);
        this.setState({
          directions: result,
        });
      } else {
        // console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    const props = this.props;
    if (props.dest.lat && props.origin.lat) {
      this.makeRoute();
    }
    return (
      <GoogleMap
        defaultZoom={11}
        center={ { lat:  37.8791998, lng: -122.4203375 } }
        defaultOptions={{ styles: mapStyle, fullscreenControl: false, mapTypeControl: false, streetViewControl: false }}
        >
        {this.state.directions ? <DirectionsRenderer directions={this.state.directions} /> : null}
        {props.origin && !this.state.directions && <Marker position={{ lat: props.origin.lat, lng: props.origin.lng }} />}
        {props.dest && !this.state.directions &&<Marker position={{ lat: props.dest.lat, lng: props.dest.lng }} />}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(MapComponent));