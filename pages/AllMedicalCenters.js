import React, { useEffect, useState } from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Button, FlatList, TextInput, Linking, ImageBackground } from 'react-native';

const AllMedicalCenters = ({navigation}) => {

    const database = getDatabase();
    const [medicalCenters, setMedicalCenters] = useState([]); // Array of medical centers
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Get all medical centers
        const medicalCentersRef = ref(database, 'Users/')
        get(medicalCentersRef)
        .then((snapshot)=>{
            if(snapshot.exists()){
                // Data exists in the document
                const data = snapshot.val();
                const medicalUsers = Object.values(data).filter((user) => user.Type === 'medical');
                if (medicalUsers.length > 0) {
                    // At this point, `medicalUsers` contains the filtered user data
                    setMedicalCenters(medicalUsers);
                }
                else {
                    console.log('No medical users found.');
                }
            }
            else{
                console.log('User Data Not Found !');
            }
        })
        .catch((err)=>{
            console.error('Error retrieving user data:', err);
        })
    }, []);


    // Filter the medical centers based on the search text
    const filteredMedicalCenters = medicalCenters.filter((center) =>
        center.Name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handlePhoneCall = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch((err) =>
          console.error('An error occurred when trying to make the call:', err)
        );
      };

    return (
        <ScrollView>
            <Text style={styles.title}>All Medical Centers</Text>
            <TextInput style={styles.searchbox} placeholder="Search Here" onChangeText={(text) => setSearchText(text)} value={searchText}/>

            {filteredMedicalCenters.map((medicalCenter, index) => {
                return (
                    <ImageBackground
                        source={require('../assets/images/card.png')} 
                        key={index} style={styles.card} 
                    >
                        <Text style={styles.name}>{medicalCenter.PharmacyName}</Text>
                        <Text style={styles.address}>{medicalCenter.Address}</Text>
                        <Text style={styles.mobile}>{medicalCenter.Mobile}</Text>
                        <Text style={styles.city}>{medicalCenter.City}</Text>

                        <View style={styles.inlineContainer}>
                            <TouchableOpacity>
                            <Text
                                style={styles.call}
                                onPress={() => handlePhoneCall(medicalCenter.Mobile)}
                            >
                                Make a Call
                            </Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                            <Text
                                style={styles.view}
                                onPress={() =>
                                navigation.navigate('OneMedicalCenter', { id: medicalCenter.ID })
                                }
                            >
                                View Details
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
        color: '#000'
    },

    searchbox: {
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 16,
        textAlign: 'left',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
        overflow: 'hidden',
    },

    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        paddingBottom: 5,
    },

    address:{
        fontSize: 16,
        color: 'black',
    },

    mobile:{
        fontSize: 16,
        color: 'black',
    },

    city:{
        fontSize: 16,
        color: 'black',
    },

    inlineContainer: {
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center',  // Vertically align items in the center
        justifyContent: 'space-between', // Create space between the two elements

    },

    call:{
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
        backgroundColor: '#13BC9E',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
    },

    view:{
        fontSize: 16,
        color: '#13BC9E',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10,
        shadowColor: '#000',
    },

    btn: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },

    btntxt: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    // backgroundImage: {
    //     flex: 1,
    //     resizeMode: 'fill', 
    //     borderRadius: 10,
    // },
})

export default AllMedicalCenters