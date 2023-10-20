// import React, {useState, useEffect} from 'react';
// import {SearchBar, Card} from '@rneui/themed';
// //import {ref, getDatabase, onValue} from 'firebase/database';
// import {app} from '../Firebase/FirebaseConfing.js';
// import {getUserSession} from '../SessionManager/SessionManager';
// import {getDatabase, ref, get, set} from 'firebase/database';
// import {
//   Text,
//   TextInput,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Button,
//   View,
// } from 'react-native';

// const BloodDonorList = ({navigation}) => {
//   const database = getDatabase();
//   const [userData, setUserData] = React.useState({});

//   const [search, setSearch] = useState('');

//   const updateSearch = text => {
//     setSearch(text);
//   };

//   useEffect(() => {
//     const checkUserSession = async () => {
//       const userSession = await getUserSession();

//       // Create a reference to the specific document.
//       const userRef = ref(database, 'Users/' + userSession.uid);

//       // Retrieve data from the specific user's document
//       get(userRef)
//         .then(snapshot => {
//           if (snapshot.exists()) {
//             // Data exists in the document
//             const data = snapshot.val();
//             setUserData(data);
//             console.log(data);
//           } else {
//             console.log('User Data Not Found !');
//           }
//         })
//         .catch(err => {
//           console.error('Error retrieving user data:', err);
//         });
//     };
//     checkUserSession();
//   }, []);

//   return (
//     <ScrollView style={styles.view}>
//       <Text style={styles.topic}>Blood Donor List</Text>

//       <View style={styles.SearchViewContainer}>
//         <SearchBar
//           placeholder="Type Here..."
//           onChangeText={updateSearch}
//           value={search}
//           round
//           searchIcon
//         />
//       </View>

//       <Card>
//         <View style={styles.cardContent}>
//           <Card.Image
//             style={{borderRadius: 100, width: 80, height: 80}}
//             source={{
//               uri: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
//             }}
//           />
//           <View style={styles.textContainer}>
//             <Text style={styles.text}>{userData.Name}</Text>
//             <Text style={styles.text2}>Location</Text>
//             <Text style={styles.text2}>Last donated date</Text>
//           </View>
//           <View style={styles.textContainer2}>
//             <Card.Image
//               style={{borderRadius: 100, width: 40, height: 40}}
//               source={require('../assets/images/icons/bloodIcon.png')}
//             />
//             <Text style={styles.text3}>Blood Type</Text>
//           </View>
//         </View>
//       </Card>
//     </ScrollView>
//   );
// };

import React, {useState, useEffect} from 'react';
import {SearchBar, Card} from '@rneui/themed';
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';
import {Text, Image, StyleSheet, ScrollView, View} from 'react-native';

const BloodDonorList = ({navigation}) => {
  const database = getDatabase();
  const [donorList, setDonorList] = useState([]);
  const [search, setSearch] = useState('');

  const updateSearch = text => {
    setSearch(text);
  };

  useEffect(() => {
    // Create a reference to the "Users" node in the database
    const usersRef = ref(database, 'Users');

    // Create a query to filter users by the "Type" field with the value "donor"
    const donorQuery = query(usersRef, orderByChild('Type'), equalTo('donor'));

    get(donorQuery)
      .then(snapshot => {
        if (snapshot.exists()) {
          // Convert the snapshot to an array of donors
          const donorArray = [];
          snapshot.forEach(childSnapshot => {
            const donorData = childSnapshot.val();
            donorArray.push(donorData);
          });
          setDonorList(donorArray);
        } else {
          console.log('No donors found');
        }
      })
      .catch(error => {
        console.error('Error fetching donors:', error);
      });
  }, []);

  return (
    <ScrollView style={styles.view}>
      <Text style={styles.topic}>Blood Donor List</Text>

      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        round
        searchIcon
      />

      {donorList.map((donor, index) => (
        <Card key={index}>
          <Card.Image
            style={{borderRadius: 100, width: 80, height: 80}}
            source={{
              uri: 'https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp',
            }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{donor.Name}</Text>
            <Text style={styles.text2}>{donor.Location}</Text>
            <Text style={styles.text2}>{donor.LastDonatedDate}</Text>
          </View>
          <View style={styles.textContainer2}>
            <Card.Image
              style={{borderRadius: 100, width: 40, height: 40}}
              source={require('../assets/images/icons/bloodIcon.png')}
            />
            <Text style={styles.text3}>Blood Type: {donor.BloodType}</Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },

  topic: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
    marginBottom: 10,
  },

  //   image: {
  //     marginLeft: 15,
  //   },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#13BC9E',
  },

  text2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#13BC9E',
  },

  text3: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#13BC9E',
  },

  input: {
    marginTop: 20,
    borderColor: '#13BC9E',
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },

  SearchViewContainer: {
    marginTop: 20,
    borderRadius: 10,
    // Add other styles here if needed
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    marginLeft: 10, // Add margin as needed
  },

  textContainer2: {
    marginLeft: 20, // Add margin as needed
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // Add margin as needed
  },

  declinebutton: {
    marginTop: 20,
    width: '40%',
    backgroundColor: '#F21B1B',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  declinebuttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  acceptbutton: {
    marginTop: 20,
    width: '40%',
    backgroundColor: '#13BC9E',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
});

export default BloodDonorList;
