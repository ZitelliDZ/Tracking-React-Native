import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useLocation} from '../hooks/useLocation';
import {View} from 'react-native';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
  markers?: (typeof Marker)[];
}

const Map = ({markers}: Props) => {
  const {hasLocation, initialPosition, getCurrentLocation, followUserLocation, userLocation, stopFollowUser, routeLine} = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  const [showPoline, setShowPoline] = useState<boolean>(true)

  const centerPosition = async () => {
    following.current = true;

    const location = await getCurrentLocation();

    mapViewRef.current?.animateCamera({
        center: {
            latitude: location.latitude,
            longitude: location.longitude,
        }
    })
  }


  useEffect(() => {
    followUserLocation()

  
    return () => {
        stopFollowUser()
    }
  }, [])

  useEffect(() => {

    if(following) return;

    mapViewRef.current?.animateCamera({
        center: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
        }
    })
  
  }, [userLocation])

  
  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{
          flex: 1,
        }}
        showsUserLocation={true}
        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        
        onTouchStart={()=> following.current=false}
        >

        {/**
        <Marker
            //image={require('../assets/.png)}
            focusable={true}
          coordinate={{
            latitude: initialPosition!.latitude,
            longitude:  initialPosition!.longitude,
          }}
          title={'Posadas - Misiones'}
          description={'Centro'}
        /> */}
        {
            showPoline && (

                <Polyline
                    coordinates={routeLine}
                    strokeColor='black'
                    strokeWidth={4}
                />
            )
        }
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={() => centerPosition()}
        style={{position: 'absolute', bottom: 80, right: 20}}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPoline(value=>!value)}
        style={{position: 'absolute', bottom: 20, right: 20}}
        size={35}
      />
    </>
  );
};

export default Map;
