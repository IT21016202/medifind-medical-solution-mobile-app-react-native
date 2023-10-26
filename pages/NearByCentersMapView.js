import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {getDatabase, ref, onValue} from 'firebase/database';

const NearByCentersMapView = ({navigation}) => {

    const database = getDatabase();
    const [medicalCenters, setMedicalCenters] = useState([]);

    useEffect(() => {
        const usersRef = ref(database, 'Users'); // Replace with your actual Firebase path
        onValue(usersRef, snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const usersArray = Object.values(data);
            const centers = usersArray.filter(user => user.Type === 'medical');
            setMedicalCenters(centers);
          }
        });
      }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                latitude: 6.0329, // Set an initial location
                longitude: 80.2168,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>

            {medicalCenters.map((medicalCenter, index) => (
                <Marker
                key={index}
                coordinate={{
                  latitude: medicalCenter.Latitude,
                  longitude: medicalCenter.Longitude,
                }}
                title={medicalCenter.PharmacyName}
                description={'Contact: ' +medicalCenter.Mobile}
              />
               
            ))}   
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });

export default NearByCentersMapView