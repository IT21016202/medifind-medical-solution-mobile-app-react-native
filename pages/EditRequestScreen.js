import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {ref, getDatabase, set} from 'firebase/database';
import {app} from '../Firebase/FirebaseConfing.js';

const database = getDatabase(app);

const EditRequestScreen = ({route, navigation}) => {
  const {request} = route.params;

  if (!request) {
    // Handle the case where the request object is not provided or is undefined
    return (
      <View>
        <Text style={styles.errorText}>Request not found or missing.</Text>
      </View>
    );
  }

  // Exclude fields that shouldn't be edited
  const {id, userid, ...editableRequest} = request;
  const [editedRequest, setEditedRequest] = useState(editableRequest);

  const handleEditRequest = () => {
    // Create a reference to the 'bloodRequests' section with the provided request ID
    const requestRef = ref(database, `bloodRequests/${request.id}`);

    // Update the existing request with the edited details, including id and userid
    const updatedRequest = {
      ...editedRequest,
      id: request.id,
      userid: request.userid,
    };

    // Update the request with the edited details
    set(requestRef, updatedRequest)
      .then(() => {
        // Success message
        console.log('Request updated');
        Alert.alert('Success', 'Request successfully updated');
        navigation.goBack(); // Navigate back to the previous screen
      })
      .catch(error => {
        // Handle the error
        console.error('Error updating request:', error);
        Alert.alert('Error', 'Failed to update the request');
      });
  };

  return (
    <View>
      <Text style={styles.text2}>Edit Blood Request</Text>
      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholderTextColor="gray"
        placeholder="Location"
        value={editedRequest.location}
        onChangeText={text =>
          setEditedRequest({...editedRequest, location: text})
        }
      />
      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholderTextColor="gray"
        placeholder="Blood Type"
        value={editedRequest.bloodType}
        onChangeText={text =>
          setEditedRequest({...editedRequest, bloodType: text})
        }
      />
      <TextInput
        style={{paddingLeft: '8%', color: 'black'}}
        placeholderTextColor="gray"
        placeholder="Description"
        value={editedRequest.description}
        onChangeText={text =>
          setEditedRequest({...editedRequest, description: text})
        }
      />
      <TouchableOpacity onPress={handleEditRequest}>
        <Text style={styles.registered}>Update Request</Text>
      </TouchableOpacity>
    </View>
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

  registered: {
    fontSize: 16,
    marginTop: '10%',
    marginLeft: '8%',
    fontWeight: 'bold',
    color: '#13BC9E',
  },
});

export default EditRequestScreen;
