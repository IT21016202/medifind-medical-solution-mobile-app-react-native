import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import { getDatabase, ref, get } from 'firebase/database';

class PharmacyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPharmacy: null,
      showModal: false,
      pharmacies: [], // Store the fetched pharmacy data
    };
  }

  componentDidMount() {
    // Initialize Firebase and create a reference to the database
    const db = getDatabase();
    const usersRef = ref(db, 'Users');

    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const pharmacyList = [];
          snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            if (user.Type === 'medical') {
              // Use a default image URL if the user doesn't have one
              user.logo = 'https://randomuser.me/api/portraits/men/75.jpg';
              pharmacyList.push(user);
            }
          });
          this.setState({ pharmacies: pharmacyList });
        } else {
          console.log('No medical users found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching medical users:', error);
      });
  }

  togglePharmacySelection = (pharmacy) => {
    if (this.state.selectedPharmacy === pharmacy) {
      this.setState({ selectedPharmacy: null });
    } else {
      this.setState({ selectedPharmacy: pharmacy });
    }
  };

  sendPrescription = () => {
    if (this.state.selectedPharmacy) {
      this.setState({ showModal: true });
    }
  };

  closePopup = () => {
    this.setState({ showModal: false });
  };

  renderPharmacyContainer(title, pharmacyList) {
    return (
      <View style={styles.container}>
        <Text style={styles.containerTitle}>{title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pharmacyList.map((pharmacy) => (
            <TouchableOpacity
              key={pharmacy.id}
              style={[
                styles.pharmacyItem,
                this.state.selectedPharmacy === pharmacy && styles.selectedPharmacyItem,
              ]}
              onPress={() => this.togglePharmacySelection(pharmacy)}
            >
              <View style={styles.pharmacyItemContainer}>
                <Image source={{ uri: pharmacy.logo }} style={styles.pharmacyLogo} />
                <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.containerGroup}>
          {this.renderPharmacyContainer('Recommended', this.state.pharmacies)}
          {this.renderPharmacyContainer('Recently Contacted', this.state.pharmacies)}
          {this.renderPharmacyContainer('View All', this.state.pharmacies)}
        </View>
        {this.state.selectedPharmacy && (
          <TouchableOpacity style={styles.sendButton} onPress={this.sendPrescription}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        )}
        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.showModal}
          onRequestClose={() => this.closePopup()}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {this.state.selectedPharmacy ? (
                <Text style={styles.modalText}>
                  Prescription sent to {this.state.selectedPharmacy.name} successfully!
                </Text>
              ) : (
                <Text style={styles.modalText}>No pharmacy selected.</Text>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={() => this.closePopup()}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  containerGroup: {
    backgroundColor: 'white',
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  containerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  pharmacyItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  selectedPharmacyItem: {
    borderWidth: 2,
    borderColor: 'green',
  },
  pharmacyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  pharmacyName: {
    textAlign: 'center',
    marginTop: 5,
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
  pharmacyItemContainer: {
    alignItems: 'center',
  },
});

export default PharmacyScreen;
