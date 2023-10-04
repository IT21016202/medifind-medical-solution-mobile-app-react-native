import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'MediFindUserSession';

export const saveUserSession = async (user) => {
    try {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user session:', error);
    }
};

export const getUserSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem(SESSION_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error('Error getting user session:', error);
      return null;
    }
};
  
export const clearUserSession = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
};