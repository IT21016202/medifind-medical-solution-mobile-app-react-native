import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';

const ChatListPage = ({ navigation }) => {
  const chatData = [
    {
      id: '1',
      name: 'John Doe',
      message: 'Hello, how are you?',
      time: '11:10 AM',
      avatar: require('../assets/images/profilebackground.jpg'),
    },
    {
      id: '2',
      name: 'Alice Smith',
      message: 'Sure, I can do that.',
      time: '10:30 AM',
      avatar: require('../assets/images/profilebackground.jpg'),
    },
    {
        id: '3',
        name: 'John Doe',
        message: 'Hello, how are you?',
        time: 'Yesterday',
        avatar: require('../assets/images/profilebackground.jpg'),
      },
      {
        id: '4',
        name: 'Alice Smith',
        message: 'Sure, I can do that.',
        time: 'Yesterday',
        avatar: require('../assets/images/profilebackground.jpg'),
      },
    // Add more chat items as needed
  ];

  return (
    <ImageBackground source={require('../assets/images/profilebackground.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatScreen', { chatId: item.id })}
          >
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Separator color
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Name color
  },
  message: {
    fontSize: 16,
    color: '#666', // Message color
  },
  time: {
    fontSize: 14,
    color: '#888', // Time color
  },
});

export default ChatListPage;
