import React, { useEffect, useState } from 'react'
import { getDatabase, ref, get } from 'firebase/database';
import { ScrollView, Text, View, StyleSheet, Touchable, TouchableOpacity, Button, Linking } from 'react-native';
import { getUserSession } from '../SessionManager/SessionManager';

const NearByMedicalCenters = ({navigation}) => {

    const database = getDatabase();
    const [medicalCenters, setMedicalCenters] = useState(null); // Array of medical centers
    let userData = {};

    useEffect(() => {

        const checkUserSession = async () => {
            const userSession = await getUserSession();
            // setUserData(userSession);
            // console.log('User Data : ', userData);
            userData = userSession;
            console.log(userData)
        };
        checkUserSession();

        // Get all medical centers
        const medicalCentersRef = ref(database, 'Users/')
        get(medicalCentersRef)
        .then((snapshot)=>{
            if(snapshot.exists()){
                // Data exists in the document
                const data = snapshot.val();
                const medicalUsers = Object.values(data).filter((user) => user.Type === 'medical' && user.City === userData.City);
                
                if (medicalUsers.length > 0) {
                    // At this point, `medicalUsers` contains the filtered user data
                    setMedicalCenters(medicalUsers);
                }
                else {
                    console.log('No medical users found.');
                }
                //setMedicalCenters(data);  
            }
            else{
                console.log('User Data Not Found !');
            }
        })
        .catch((err)=>{
            console.error('Error retrieving user data:', err);
        })
    }, []);

    // function goToMedicalCenter(id) {
    //     navigation.navigate('OneMedicalCenter', {id: id})
    // }

    const handlePhoneCall = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
        Linking.openURL(url).catch((err) =>
          console.error('An error occurred when trying to make the call:', err)
        );
      };

  return (
    <ScrollView>
        <Text style={styles.title}>Nearby Medical Centers To You</Text>

        {/* <TouchableOpacity style={styles.showMapBtn} onPress={() => navigation.navigate("NearByCentersMapView")}>
            <Text style={styles.showMaptxt} >Show on Map</Text>
        </TouchableOpacity> */}

        {medicalCenters ? (
            // Data is available, map over the medicalCenters and render them
            medicalCenters.map((medicalCenter, index) => (
                <View key={index} style={styles.card}>
                <Text style={styles.name}>{medicalCenter.PharmacyName}</Text>
                <Text style={styles.address}>{medicalCenter.Address}</Text>
                <Text style={styles.mobile}>{medicalCenter.Mobile}</Text>

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
                </View>
            ))
            ) : (
            // Data is not available, display a loading message
            <Text style={styles.loading}>Loading... Please Wait..</Text>
            )}

        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('AllMedicalCenters')}>
            <Text style={styles.btntxt}>Show All Centers</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
        color: '#13BC9E',
        marginBottom: 20,
        color: 'black',
    },

    showMapBtn:{
        backgroundColor: '#13BC9E',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
        alignItems: 'center',
    },

    showMaptxt:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    card:{
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
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
    },

    view:{
        fontSize: 16,
        color: '#13BC9E',
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 10,
    },

    btn:{
        backgroundColor: '#13BC9E',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        elevation: 5,
        alignItems: 'center',
    },

    btntxt:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    loading:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: 'black',
        marginBottom: 20,
    }
});

export default NearByMedicalCenters