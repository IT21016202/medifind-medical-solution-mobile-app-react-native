import React, { useEffect, useState } from 'react'
import { getDatabase, ref, get, push, set } from 'firebase/database';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ImageBackground, Linking } from 'react-native';
import { getUserSession } from '../SessionManager/SessionManager';
import moment from 'moment';

const OneMedicalCenter = ({route, navigation}) => {

  const { id } = route.params;
  const database = getDatabase();
  const [user, setUser] = useState(null);
  const [medicalCenter, setMedicalCenter] = useState("");
  const [reviews, setReviews] = useState([]); // Array of reviews
  const [review, setReview] = useState(""); 
  const [isChaged, setIsChanged] = useState(false);
  
  useEffect(() => {

    //Get user session
    const checkUserSession = async () => {
      const userSession = await getUserSession();
      setUser(userSession);
    };
    checkUserSession();


    //Get one medical center by id
    const medicalCenterRef = ref(database, 'Users/' + id)
    get(medicalCenterRef)
    .then((snapshot)=>{
        if(snapshot.exists()){
            // Data exists in the document
            const data = snapshot.val();
            setMedicalCenter(data);
        }
        else{
            console.log('Medical Center Data Not Found !');
        }
    })
    .catch((err)=>{
        console.error('Error retrieving Medical Center data:', err);
    })


    //Get all reviews of the medical center
    const reviewsRef = ref(database, 'Reviews/')
    get(reviewsRef)
    .then((snapshot)=>{
        if(snapshot.exists()){
            // Data exists in the document
            const data = snapshot.val();
            const reviews = Object.values(data).filter((review) => review.PharmacyID === id);
            if (reviews.length > 0) {
                // At this point, `reviews` contains the filtered data
                setReviews(reviews);
            }
            else {
                console.log('No reviews found.');
            }
        }
        else{
            console.log('No reviews found !');
        }
    })
    setIsChanged(false);
  },[isChaged]);

  const submitReview = () => {
    if(review === ""){
      Alert.alert("Invalid Input", "Please fill all the review field !");
      return;
    }

    const reviewRef = ref(database, 'Reviews/');
    const newReviewRef = push(reviewRef);

    const reviewData = {
      ID: newReviewRef.key,
      Review: review,
      PharmacyID: id,
      UserID: user.ID,
      UserName: user.Name,
      CreatedAt: JSON.stringify(new Date()),
    };

    set(newReviewRef, reviewData)
    .then(() => {
      console.log('Review data added to Realtime Database');
      setIsChanged(true);
    })
    .catch((error) => {
      console.error('Error adding review data to Realtime Database:', error);
    });
  };

  const handlePhoneCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred when trying to make the call:', err)
    );
  };

  return (
    <ScrollView style={styles.view}>
        <Text style={styles.title}>{medicalCenter.PharmacyName}</Text>

        {medicalCenter.Image != '' ? (
          <Image source={{uri: medicalCenter.Image}} style={styles.img} />
        ) : (
          <Text>No Image Found...</Text>
        )}
        
        <Text style={styles.detailsTitle}>Description</Text>
        <Text style={styles.details}>{medicalCenter.Description}</Text>

        <Text style={styles.detailsTitle}>Facilities</Text>
        <Text style={styles.details}>{medicalCenter.facilities}</Text>

        <Text style={styles.detailsTitle}>Address</Text>
        <Text style={styles.details}>{medicalCenter.Address}</Text>

        <Text style={styles.detailsTitle}>Mobile</Text>
        <Text style={styles.details} onPress={() => handlePhoneCall(medicalCenter.Mobile)}>{medicalCenter.Mobile}</Text>

        <View style={styles.inlineContainer}>
            <TouchableOpacity>
              <Text style={styles.appointment}>
                    Book Appointment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.order}>
                  Place Order
              </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine} />

        <Text style={styles.reviewTitle}>Reviews Section</Text>

          <TextInput style={styles.input} placeholder="Write your review here" onChangeText={(text) => setReview(text)}/>

          <TouchableOpacity onPress={submitReview}>
            <Text style={styles.submitReviewBtn}>
                  Submit Review
            </Text>
          </TouchableOpacity>
        
        {reviews.map((review, index) => {
          return (
            <View key={index}>
              <View style={styles.inlineContainerReview}>
                <Image source={require('../assets/images/user.png') } style={styles.userimg} />
                <Text style={styles.username}>{review.UserName}</Text>
              </View>
              
              <Text style={styles.review}>{review.Review}</Text>
              <View style={styles.horizontalLineReview} />
            </View>
          )
        }
        )}

    </ScrollView>
   
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
    color: '#000',
  },

  img: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },

  details: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },

  inlineContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center',  // Vertically align items in the center
    justifyContent: 'space-between', // Create space between the two elements
    marginVertical: 20,
  },

  appointment: {
    backgroundColor: '#13BC9E',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    elevation: 5,
    alignItems: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  order: {
    backgroundColor: '#13BC9E',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    elevation: 5,
    alignItems: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  horizontalLine: {
    borderBottomColor: 'lightgray',  // Color of the line
    borderBottomWidth: 1,        // Thickness of the line
  },

  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#000',
    marginBottom: 5,
  },

  input: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    elevation: 5,
    color: '#000',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
  },

  submitReviewBtn: {
    backgroundColor: '#13BC9E',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    elevation: 5,
    alignItems: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: 140,
    marginBottom: 20,
  },

  userimg: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    alignSelf: 'center',
  },

  inlineContainerReview: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center',  // Vertically align items in the center
    justifyContent: 'flex-start', // Create space between the two elements
    marginVertical: 10,
  },

  username: {
    fontSize: 14,
    marginLeft: 10,
  },

  review: {
    fontSize: 16,
    color: '#000',
  },

  horizontalLineReview: {
    borderBottomColor: 'lightgray',  // Color of the line
    borderBottomWidth: 1,        // Thickness of the line
    marginVertical: 10,
  },

})

export default OneMedicalCenter