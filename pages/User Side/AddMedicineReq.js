import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {storage, storageRef} from '../../Firebase/FirebaseConfing';
import {useFocusEffect} from '@react-navigation/native';
import {uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {getDatabase, ref, set, push} from 'firebase/database';
import {getUserSession} from '../../SessionManager/SessionManager';

const AddMedicineReq = ({navigation}) => {
  const [image, setImages] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [medicinName, setMedicineName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');

  const [message, setMessage] = useState('');

  useFocusEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();

      setUserName(userSession.Name);
      setUserID(userSession.uid);
    };
    checkUserSession();
  });

  const database = getDatabase();

  // const handleSubmit = async () => {
  //   const databasePath = 'MedicineRequests';

  //   // Generate a new unique key for the item using the push method
  //   const newKey = push(ref(database, databasePath));

  //   console.log(newKey.key);

  //   const reqData = {
  //     userame: userName,
  //     userID: userID,
  //     Medicine_Name: medicinName,
  //     userAge: age,
  //     location: location,
  //     image: imageUrl,
  //     requestID: newKey.key,
  //     CreatedAt: new Date(),
  //     UpdatedAt: new Date(),
  //   };

  //   //const requestRef = ref(database, 'MedicineRequests/' +  );
  //   set(newKey, reqData)
  //     .then(() => {
  //       console.log('data added to Realtime Database');

  //       alert('Request Submited Successfuly');
  //     })
  //     .catch(error => {
  //       console.error('Error adding  data to Realtime Database:', error);
  //     });
  // };

  const imagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    })
      .then(res => {
        if (!res.didCancel) {
          setImages(res.assets[0].uri);
          handleUpload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpload = async () => {
    try {
      const response = await fetch(image);

      if (!response.ok) {
        setMessage('Something went wrong');
        throw new Error('Network request failed');
      } else {
        const blob = await response.blob();

        const segments = image.split('/');

        const fileName = segments[segments.length - 1];

        const reference = storageRef(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(reference, blob);

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            console.error('Error during upload:', error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              setImageUrl(downloadURL);
              setMessage('Upload completed');
            });
          },
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <ScrollView style={styles.scroll}>
    //   <Text style={styles.uploadText}>Upload Prescription</Text>
    //   <TouchableOpacity onPress={imagePicker} style={styles.textContainer}>
    //     {/* {!imageUrl && (
    //       <Image source={cloudImg} style={{width: 50, height: 50}} />
    //     )}

    //     {imageUrl && (
    //       <Image source={{uri: imageUrl}} style={{width: 100, height: 100}} />
    //     )} */}

    //     <ImageBackground
    //       source={imageUrl ? {uri: imageUrl} : cloudImg}
    //       style={styles.backgroundImage}></ImageBackground>

    //     <Text>{progress}</Text>
    //   </TouchableOpacity>

    //   <Text style={styles.text}>Medicine Name</Text>
    //   <TextInputBox
    //     placeholder="enter medicine name"
    //     name="name"
    //     value={medicinName}
    //     onChangeT={text => setMedicineName(text)}></TextInputBox>

    //   <Text style={styles.text}>Patinet Age</Text>
    //   <TextInputBox
    //     placeholder="patient age "
    //     name="age"
    //     value={age}
    //     onChangeT={text => setAge(text)}></TextInputBox>

    //   <Text style={styles.text}>Location</Text>

    //   <TextInputBox
    //     placeholder="Enter Your address   "
    //     name="notes"
    //     value={location}
    //     onChangeT={text => setLocation(text)}></TextInputBox>

    //   <Text style={styles.text}>Special notes</Text>
    //   <TextInputBox
    //     placeholder="Some special notes  "
    //     name="notes"
    //     placeholderTextColor="#13BC9E"
    //     value={note}
    //     onChangeT={text => setNote(text)}></TextInputBox>

    //   <TouchableOpacity style={styles.button} onPress={handleSubmit}>
    //     <View style={styles.centeredContent}>
    //       <Text>Submit</Text>
    //     </View>
    //   </TouchableOpacity>
    // </ScrollView>

    <ScrollView>
      <View style={styles.upper}>
        <Image
          style={styles.image}
          source={require('../../assets/images/icons/document.png')}
        />
        <Text style={styles.headerOne}>Upload your</Text>
        <Text style={styles.headerTwo}>Prescription</Text>

        <TouchableOpacity style={styles.btnGallery} onPress={imagePicker}>
          <Image
            source={require('../../assets/images/icons/gallery.png')}
            style={{height: 25, width: 25}}
          />
          <Text style={styles.btnText}>Select From Gallery</Text>
        </TouchableOpacity>

        {message && <Text>{message}</Text>}
      </View>

      <View style={styles.centredText}>
        <Text
          style={{
            color: '#046352',
            fontSize: 30,
          }}>
          &
        </Text>
      </View>

      <View style={styles.lower}>
        <Text style={styles.txtMedicine}>Medicine Name</Text>
        <TextInput
          style={styles.txtInput}
          value={medicinName}
          onChangeText={text => setMedicineName(text)}></TextInput>
        <Text style={styles.txtMedicine}>Patient Age</Text>
        <TextInput
          style={styles.txtInput}
          value={patientAge}
          onChangeText={text => setPatientAge(text)}></TextInput>

        <TouchableOpacity
          style={styles.btnSave}
          onPress={() =>
            navigation.navigate('AddLocation', {
              medicineName: medicinName,
              imageUrl: imageUrl,
              patientAge: patientAge,
              userName: userName,
              userID: userID,
            })
          }>
          <View style={styles.btnContent}>
            <Text style={{fontSize: 20, color: '#046352'}}>Next</Text>
            <Image
              source={require('../../assets/images/icons/arrow.png')}
              style={{height: 25, width: 25}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnGallery: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1, // Set the border width
    borderColor: 'white', // Set the border color
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    flexDirection: 'row',
  },

  btnSave: {
    marginTop: 30,
    alignItems: 'flex-end',
  },

  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  txtMedicine: {
    fontSize: 18,
    color: '#046352',
  },

  txtInput: {
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    margin: 5,
    borderRadius: 10,
    borderColor: '#046352',
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },

  lower: {
    padding: 15,
  },

  centredText: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#046352',
    overflow: 'hidden',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,

    // Additional styles for your outer View, if needed
  },

  btnText: {
    color: 'white',
    fontSize: 13,
    margin: 5,
  },
  headerOne: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
  image: {
    marginTop: 50,
    margin: 30,
    width: 150, // Set the desired width
    height: 150, // Set the desired height
  },
  headerTwo: {
    marginBottom: 10,
    color: 'white',
    fontSize: 30,
  },
  scroll: {
    backgroundColor: 'white',
  },
});

export default AddMedicineReq;
