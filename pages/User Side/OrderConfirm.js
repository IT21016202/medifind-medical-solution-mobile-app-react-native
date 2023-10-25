import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';

const OrderConfirm = ({route, navigation}) => {
  const {quantity, price} = route.params;

  const [userName, setUserName] = useState('');

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {label: 'Cash on Delivery', value: 'cashon'},
    {label: 'Digital Payment', value: 'digital'},
  ];

  const handleOptionPress = value => {
    setSelectedOption(value);
  };

  return (
    <ScrollView>
      <View
        style={{
          height: 20,
          backgroundColor: '#046352',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}></View>
      <View
        style={{
          backgroundColor: '#046352',
          margin: 10,
          padding: 12,
          height: 70,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 23}}>Total Order</Text>
        <Text style={{color: 'white', fontSize: 23}}>
          Rs {quantity * price}.00
        </Text>
      </View>

      <View>
        <Text style={styles.title}>Personal Information</Text>

        <Text style={styles.texts}>Your Name</Text>
        <TextInput
          style={styles.txtInput}
          value={userName}
          onChangeText={text => setUserName(text)}></TextInput>

        <Text style={styles.texts}>Your Address</Text>
        <TextInput
          style={styles.txtInput}
          value={userName}
          onChangeText={text => setUserName(text)}></TextInput>
      </View>

      <View>
        <Text style={styles.title}>Payment Method</Text>

        <View style={{flexDirection: 'row', margin: 10}}>
          {options.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.radioButton}
              onPress={() => handleOptionPress(option.value)}>
              <Text style={styles.label}>{option.label}</Text>
              {selectedOption === option.value && (
                <View style={styles.radioDot} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {selectedOption == 'digital' && (
          <View>
            <TextInput
              style={styles.txtInput}
              //   value={userName}
              placeholder="CARDHOLDER’S NAME"
              placeholderTextColor="gray"
              //   onChangeText={text => setUserName(text)}
            ></TextInput>

            <TextInput
              style={styles.txtInput}
              //   value={userName}
              placeholder="CARD NUMBER"
              placeholderTextColor="gray"
              //
            ></TextInput>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                style={styles.txtInput}
                //   value={userName}
                placeholder="EXP DATE"
                placeholderTextColor="gray"
                //
              ></TextInput>
              <TextInput
                style={styles.txtInput}
                //   value={userName}
                placeholder="CVC"
                placeholderTextColor="gray"
                //
              ></TextInput>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: '#046352',
            margin: 40,
            alignItems: 'center',
            padding: 10,
            height: 60,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Confrim Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#046352',
    fontSize: 22,
    margin: 10,
  },

  txtInput: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    color: 'gray',
    margin: 8,
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 10,

    borderColor: 'gray',
  },

  texts: {
    color: '#046352',
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    margin: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    color: '#046352',
    margin: 10,
  },
  radioDot: {
    width: 15,
    height: 15,
    borderRadius: 6,
    backgroundColor: '#046352',
  },
});

export default OrderConfirm;
