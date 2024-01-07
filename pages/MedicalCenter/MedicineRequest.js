import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import {get, getDatabase, ref} from 'firebase/database';
import call from 'react-native-phone-call';

const MedicineRequest = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const medicineRequests = ref(database, 'MedicineRequests');

    get(medicineRequests).then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataArray = Object.values(data);

        setData(dataArray);
      }
    });
  }, []);

  const pressCall = number => {
    const args = {
      number: number, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };

    call(args).catch(console.error);
  };

  return (
    <ScrollView style={{backgroundColor: '#046352'}}>
      <View
        style={{
          backgroundColor: 'white',
          margin: 10,
          padding: 15,
          borderRadius: 25,
          height: 750,
        }}>
        {data &&
          data.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/images/icons/user.jpg')}
                  style={{height: 60, width: 60, borderRadius: 30}}
                />
                <Text style={{color: '#046352', margin: 10, fontSize: 20}}>
                  {item.userame}
                </Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: '#046352', margin: 10, fontSize: 20}}>
                  {item.Medicine_Name}
                </Text>

                <TouchableOpacity onPress={() => pressCall(item.mobileNumber)}>
                  <Image
                    source={require('../../assets/images/icons/Call.png')}
                    style={{height: 40, width: 40}}
                  />
                </TouchableOpacity>
              </View>

              <Button
                title="View"
                onPress={() =>
                  navigation.navigate('OneMedicineRequest', {
                    id: item.requestID,
                  })
                }
              />
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 20,
  },
});

export default MedicineRequest;
