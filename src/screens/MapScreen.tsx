import React from 'react';
import {Text, View} from 'react-native';
import MapView from 'react-native-maps';
import Map from '../components/Map';

const MapScreen = () => {
  return (
    <View
    style={{
      flex: 1,
    }}>
      <Map />
    </View>
  );
};

export default MapScreen;
