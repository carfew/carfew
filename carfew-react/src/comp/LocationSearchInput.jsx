import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import withStyles from 'react-jss';
import TextField from '@material-ui/core/TextField';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const styles = {
  suggestions: {
    position:'absolute',
    top:75,
    left:0,
    zIndex: 20,
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
  }
}




class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: '', 
      menuOpen: false,
      anchorEl: null,
     };
  }

  handleChange = address => {
    this.setState({ address, menuOpen: true, });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => this.setState({address:results[0].formatted_address, menuOpen: false}))
      .then(latLng => {console.log('Success', latLng)})
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{position:'relative'}}>
            <TextField
              id="outlined-full-width"
              label={this.props.origin ? 'origin' : 'destination'}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className={this.props.classes.suggestions}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: 10 }
                  : { backgroundColor: '#ffffff', cursor: 'pointer', padding: 10 };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  ><span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default withStyles(styles)(LocationSearchInput);