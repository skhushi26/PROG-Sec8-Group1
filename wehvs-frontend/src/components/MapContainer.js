import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        // Other Map properties and components go here
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY', // Replace with your Google Maps API key
})(MapContainer);