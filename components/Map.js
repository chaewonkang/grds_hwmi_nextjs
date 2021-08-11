import React, { Component } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
const lib = ['places'];
const id = ['3fbeff094553dbdc'];
const key = 'AIzaSyC7xOPXC-xex5fB-Ho_x-Jp8lkTxUz_BDo';

class Map extends React.Component {
  render() {
    const { location } = this.props;

    const locationString = '{' + location + '}';
    const locationToObj = JSON.parse(locationString);

    return (
      <div>
        <LoadScript googleMapsApiKey={key} libraries={lib} mapIds={id}>
          {locationToObj && locationToObj.location && (
            <GoogleMap
              center={{
                lat: parseFloat(locationToObj.location.lat),
                lng: parseFloat(locationToObj.location.lang),
              }}
              zoom={5}
              options={{ mapId: id, disableDefaultUI: true }}
              mapContainerStyle={{ height: '100%', width: '100%' }}
            />
          )}
        </LoadScript>
      </div>
    );
  }
}

export default Map;
