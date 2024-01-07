import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

export default BloodDonationDashboard = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'Blood Request Feed',
      image: 'https://cdn-icons-png.flaticon.com/512/3787/3787085.png',
      count: 124.711,
    },
    {
      id: 2,
      name: 'Blood Donors',
      image: "https://w7.pngwing.com/pngs/631/219/png-transparent-donor-logo-blood-donation-world-blood-donor-day-american-red-cross-donate-miscellaneous-emblem-heart-thumbnail.png",
      count: 234.722,
    },
    {
      id: 3,
      name: 'Blood Donors Map View',
      image: 'https://cdn-icons-png.flaticon.com/512/235/235861.png',
      count: 324.723,
    },
    {
      id: 4,
      name: 'Add Blood Request',
      image: 'https://cdn-icons-png.flaticon.com/512/3063/3063077.png',
      count: 154.573,
    },
    {
      id: 5,
      name: 'Profile',
      image: 'https://cdn-icons-png.flaticon.com/512/2919/2919906.png',
      count: 124.678,
    },
  ];

  const [options, setOptions] = useState(data);

  const clickEventListener = item => {
    switch (item.id) {
      case 1:
        navigation.navigate('BloodRequestPage', {itemId: item.id});
        break;
      case 2:
        navigation.navigate('BloodDonorList', {itemId: item.id});
        break;
      case 3:
        navigation.navigate('DonorMapView', {itemId: item.id});
        break;
      case 4:
        navigation.navigate('RequestBlood', {itemId: item.id});
        break;
      case 5:
        navigation.navigate('Profile', {itemId: item.id});
        break;
      // Add more cases for other item numbers and corresponding screens
      default:
        // Handle the default case, e.g., show an error message or navigate to a default screen
        break;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={options}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => clickEventListener(item)}>
              <Image style={styles.image} source={{uri: item.image}} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                {/* <Text style={styles.count}>{item.count}</Text> */}
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => clickEventListener(item)}>
                  <Text style={styles.followButtonText}>Explore now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ebf0f7',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#6666ff',
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  followButtonText: {
    color: '#dcdcdc',
    fontSize: 12,
  },
});
