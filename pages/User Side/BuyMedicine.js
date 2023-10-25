import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native';
import {get, getDatabase, set, ref, push} from 'firebase/database';
import call from 'react-native-phone-call';

const BuyMedicine = ({route, navigation}) => {
  const {id, pharmacyID} = route.params;
  const [quantity, setQuantity] = useState(1);

  const [data, setData] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    //Get one medical center by id
    const database = getDatabase();
    const medicineReq = ref(database, 'AccpectedMedicineRequests/' + id);
    get(medicineReq)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setData(data);
        } else {
          console.log('Data Not Found !');
        }
      })
      .catch(err => {
        console.error('Error retrieving user data:', err);
      });

    const pharmacyReviews = ref(database, 'Reviews/');

    get(pharmacyReviews).then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const dataArray = Object.values(data);

        const filteredReviews = dataArray.filter(
          review => review.PharmacyID === pharmacyID,
        );

        setReviews(filteredReviews);
      }
    });
  }, []);

  const pressCall = () => {
    const args = {
      number: data.pharmacyNo, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };

    call(args).catch(console.error);
  };

  const incrementQuantity = () => {
    console.log(quantity);
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          height: 60,
          backgroundColor: '#046352',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 25,
            textAlign: 'center',
            margin: 10,
          }}>
          {data.Medicine_Name}
        </Text>
      </View>

      <View style={{height: 250, backgroundColor: 'red', margin: 20}}>
        <Text>Map</Text>
      </View>

      <View style={{margin: 20}}>
        <View style={styles.view}>
          <Text style={{color: '#046352', fontSize: 25}}>
            {data.pharmacyName}
          </Text>
          <Text style={{color: '#046352', fontSize: 23}}>
            Rs {data.medicinePrice * quantity}.00
          </Text>
        </View>

        <View style={[styles.view, {marginTop: 30}]}>
          <Text style={{color: '#046352', fontSize: 20}}>Quantity</Text>

          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.btn} onPress={decrementQuantity}>
              <Text>-</Text>
            </TouchableOpacity>

            <Text style={{color: '#046352', fontSize: 23}}>{quantity}</Text>

            <TouchableOpacity style={styles.btn} onPress={incrementQuantity}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.view, {marginTop: 30}]}>
          <Text style={{color: '#046352', fontSize: 20}}>
            {data.Medicine_Name}
          </Text>

          <Text style={{color: 'gray', fontSize: 14, width: 200}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>

        <View style={[styles.view, {marginTop: 30}]}>
          <TouchableOpacity onPress={() => pressCall()}>
            <Image
              source={require('../../assets/images/icons/Call.png')}
              style={{height: 40, width: 40}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#046352',
              width: 150,
              height: 50,
              justifyContent: 'center', // Center vertically
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() =>
              navigation.navigate('OrderConfirmation', {
                id: data.requestID,
                quantity: quantity,
                price: data.medicinePrice,
              })
            }>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>
              BUY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#046352',
          padding: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Text style={{fontSize: 18, color: 'white', margin: 8}}>Reviews</Text>
        {reviews.map((review, index) => (
          <View
            key={index}
            style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                source={require('../../assets/images/icons/user.jpg')}
                style={{height: 40, width: 40, borderRadius: 30}}
              />
              <Text style={{color: 'black', margin: 10, fontSize: 20}}>
                {review.UserName}
              </Text>

              <Text style={{color: 'black', margin: 10, fontSize: 10}}>
                {review.CreatedAt}
              </Text>
            </View>

            <Text style={{color: 'black', fontSize: 18}}>{review.Review}</Text>
            {/* Add more properties you want to display */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#046352',
    width: 30,
    height: 30,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BuyMedicine;
