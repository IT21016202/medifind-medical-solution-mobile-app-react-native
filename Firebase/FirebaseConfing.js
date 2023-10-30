import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import {ref as storageRef} from 'firebase/storage';

const FirebaseConfig = {
  //
};


const app = initializeApp(FirebaseConfig);

export const storage = getStorage(app);
export {storageRef};

export {app};
