import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const NotificationPopup = ({ isVisible, appointmentData, clearNotification }) => {
  if (!isVisible || !appointmentData) {
    // Return null or display a message when there's no data
    return null;
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.popupContainer}>
        <View style={styles.notification}>
          <Text style={styles.notificationText}>
            You have an appointment with {appointmentData.doctor}, at {appointmentData.date} at {appointmentData.center}.
          </Text>
          <Button title="Clear" onPress={clearNotification} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notification: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NotificationPopup;
