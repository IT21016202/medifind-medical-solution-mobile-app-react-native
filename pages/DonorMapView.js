// import React, {useState, useEffect} from 'react';
// import {View, StyleSheet, Text} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import {getDatabase, ref, onValue} from 'firebase/database';
// import {app} from './Firebase/FirebaseConfig'; // Import your Firebase configuration

// const database = getDatabase(app);

// const DonorMapView = () => {
//   const [donors, setDonors] = useState([]);

//   useEffect(() => {
//     const donorRef = ref(database, 'donors'); // Replace with your actual Firebase path
//     onValue(donorRef, snapshot => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const donorsArray = Object.values(data);
//         setDonors(donorsArray);
//       }
//     });
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 0, // Set an initial location or use the first donor's location
//           longitude: 0,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         {donors.map((donor, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: donor.latitude, // Replace with your donor data structure
//               longitude: donor.longitude,
//             }}
//             title={donor.name}
//             description={`Blood Type: ${donor.bloodType}`}
//           />
//         ))}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default DonorMapView;
