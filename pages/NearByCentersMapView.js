import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {getDatabase, ref, onValue} from 'firebase/database';

const NearByCentersMapView = () => {

    const database = getDatabase();
    const [medicalCenters, setMedicalCenters] = useState([]);
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        const usersRef = ref(database, 'Users'); // Replace with your actual Firebase path
        onValue(usersRef, snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const usersArray = Object.values(data);
            const donorUsers = usersArray.filter(user => user.Type === 'donor');
            //console.log('Donor Data:', donorUsers); // Filter users with type 'donor'
            setDonors(donorUsers);
          }
        });
      }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                latitude: 6.0329, // Set an initial location or use the first donor's location
                longitude: 80.2168,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>

            {donors.map((donor, index) => (
                <Marker
                key={index}
                coordinate={{
                  latitude: donor.Latitude,
                  longitude: donor.Longitude,
                }}
                title={donor.Name}
                description={'Blood Type: ' +donor.BloodType}
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