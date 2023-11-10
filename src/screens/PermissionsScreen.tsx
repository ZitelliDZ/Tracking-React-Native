import React, {useContext} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PermissionsContext} from '../context/PermissionsContext';
import BlackButton from '../components/BlackButton';

const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Icon name="map-outline" size={50} />
      <Text>Es necesario el uso del GPS</Text>
      <BlackButton
        title="Permiso"
        style={{marginTop: 20}}
        onPress={() => askLocationPermission()}
      />

      <Text>{JSON.stringify(permissions, null, 2)}</Text>
    </View>
  );
};

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
