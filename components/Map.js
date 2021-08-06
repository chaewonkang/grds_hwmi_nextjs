import React, { Component } from 'react';

import { GoogleMap, LoadScript } from '@react-google-maps/api';
const lib = ['places'];
const id = ['3fbeff094553dbdc'];
const key = 'AIzaSyC7xOPXC-xex5fB-Ho_x-Jp8lkTxUz_BDo';
const defaultLocation = { lat: 41.366851, lng: -8.19769 };

class Map extends React.Component {
  render() {
    return (
      <div>
        <LoadScript googleMapsApiKey={key} libraries={lib} mapIds={id}>
          <GoogleMap
            center={defaultLocation}
            zoom={5}
            options={{ mapId: id, disableDefaultUI: true }}
            mapContainerStyle={{ height: '100%', width: '100%' }}
          />
        </LoadScript>
      </div>
    );
  }
}

export default Map;
