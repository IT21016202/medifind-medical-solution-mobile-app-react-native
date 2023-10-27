import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground, // Import ImageBackground
} from 'react-native';

class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: '',
    };
  }

  sendMessage = () => {
    const { messages, newMessage } = this.state;
    if (newMessage) {
      const updatedMessages = [...messages, { text: newMessage, isMyMessage: true }];
      this.setState({ messages: updatedMessages, newMessage: '' });
    }
  };

  renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isMyMessage ? styles.myMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  render() {
    const { messages, newMessage } = this.state;
    const { doctorName } = this.props.route.params; // Access the doctorName prop

    return (
      <ImageBackground
        source={require('../assets/images/profilebackground.jpg')} // Adjust the path to your background image
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.doctorContainer}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                style={styles.doctorImage}
              />
              <Text style={styles.doctorName}>{doctorName}</Text>
            </View>
          </View>

          <FlatList
            data={messages}
            renderItem={this.renderMessage}
            keyExtractor={(item, index) => index.toString()}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={newMessage}
              onChangeText={(text) => this.setState({ newMessage: text })}
            />
            <TouchableOpacity onPress={this.sendMessage}>
              <Text style={styles.sendButton}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent background
  },
  topContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  doctorContainer: {
    alignItems: 'center',
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    marginRight: 20,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 18,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#E5E5E5',
    fontSize: 18,
    marginBottom: 15,
  },
  sendButton: {
    color: 'green',
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 15,
  },
});

export default ChatScreen;
