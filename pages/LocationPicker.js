import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationPicker = ({navigation}) => {

  const [region, setRegion] = useState({
    latitude: 6.0329, // Set an initial location 
    longitude: 80.2168,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onMapPress = (e) => {
    setRegion(e.nativeEvent.coordinate);
  };

  const onSaveLocation = () => {
    const { latitude, longitude } = region;
    //console.log(latitude, longitude);
    navigation.navigate('MedicalCenterRegistration', {latitude: latitude, longitude: longitude});
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={(e) => onMapPress(e)}
      >
        <Marker coordinate={region} />
      </MapView>
      <Button title="Save Location" onPress={onSaveLocation} />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LocationPicker;