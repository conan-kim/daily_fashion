import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const userProfileApi = {
  createUserProfile: async (user = auth().currentUser) => {
    console.log('createUserProfile Started');
    try {
      const doc = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      if (!doc.exists) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .set({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            description: '',
            sex: 0,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
          .then(() => {})
          .catch(err => alert(`error: ${err}`));
      }
    } catch (err_1) {
      return alert(`error: ${err_1}`);
    }
  },
  readUserProfile: async (userId = auth().currentUser.uid) => {
    console.log('readUserProfile Started');
    try {
      const getData = await firestore()
        .collection('users')
        .doc(userId)
        .get();
      const result = getData.data();
      return result;
    } catch (error) {
      alert(error);
    }
  },
  updateUserProfile: async (updateData = {}, user = auth().currentUser) => {
    console.log('updateUserProfile Started');
    try {
      const doc = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      if (doc.exists) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({updatedAt: Date.now(), ...updateData})
          .then(() => {})
          .catch(err => alert(`error: ${err}`));
      }
    } catch (err_1) {
      return alert(`error: ${err_1}`);
    }
  },
  deleteUserProfile: async (user = auth().currentUser) => {
    console.log('deleteUserProfile Started');
    try {
      const doc = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      if (doc.exists) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .delete()
          .then(() => {})
          .catch(err => alert(`error: ${err}`));
      }
    } catch (err_1) {
      return alert(`error: ${err_1}`);
    }
  },
};

export const fashionImageApi = {
  createFashionImage: async (
    fashionImageFileName,
    folderName = 'images/',
    description = '',
    user = auth().currentUser,
  ) => {
    // 이미 storage에는 업로드해놓은 상태에서 downloadURL을 가져온다.
    try {
      const downloadUrl = await storage()
        .ref()
        .child(folderName + fashionImageFileName)
        .getDownloadURL();
      const getPreviousData = await firestore()
        .collection('fashionImage')
        .doc(fashionImageFileName)
        .get();
      if (getPreviousData.exists === false) {
        firestore()
          .collection('fashionImage')
          .doc(fashionImageFileName)
          .set({
            filename: fashionImageFileName,
            downloadUrl: downloadUrl,
            uploader: user.uid,
            description: description,
            score: [0, 0],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          })
          .then(() => {})
          .catch(err => alert(`error: ${err}`));
      }
    } catch (err_1) {
      return alert(`error: ${err_1}`);
    }
  },
  readFashionImage: async fashionImageFileName => {
    const getData = await firestore()
      .collection('fashionImage')
      .doc(fashionImageFileName)
      .get();
    const result = getData.data();
    return result;
  },
  updateFashionImage: async (fashionImageFileName, updateData = {}) => {
    try {
      const doc = await firestore()
        .collection('fashionImage')
        .doc(fashionImageFileName)
        .get();
      if (doc.exists) {
        firestore()
          .collection('fashionImage')
          .doc(fashionImageFileName)
          .update({updatedAt: Date.now(), ...updateData})
          .then(() => {})
          .catch(err => alert(`error: ${err}`));
      }
    } catch (err_1) {
      return alert(`error: ${err_1}`);
    }
  },
  deleteFashionImage: async fashionImageFileName => {
    try {
      const doc = await firestore()
        .collection('fashionImage')
        .doc(fashionImageFileName)
        .get();
      if (doc.exists) {
        firestore()
          .collection('fashionImage')
          .doc(fashionImageFileName)
          .delete()
          .then(() => {})
          .catch(err => alert(`error: ${err}`));
      }
    } catch (err_1) {
      return alert(`error: ${err_1}`);
    }
  },
};
//이거 다시 정리해야함
export const imageStorageApi = {
  uploadImageStorage: async (imageFileName, imagelocalURL) => {
    const response = await fetch(imagelocalURL);
    const blob = await response.blob();
    try {
      var ref = storage()
        .ref()
        .child(imageFileName);
      return await ref.put(blob);
    } catch (error) {
      return alert(error);
    }
  },
  deleteImageStorage: async imageFileName => {
    return await storage()
      .ref()
      .child(imageFileName)
      .delete();
  },
  getDownloadUrlOnStorage: async imageFileName => {
    console.log('im hererererer');
    const downloadUrl = await storage()
      .ref()
      .child(imageFileName)
      .getDownloadURL();
    console.log(downloadUrl, 'in root function');
    return downloadUrl;
  },
};

export const likeHistoryApi = {
  createLikeHistory: async (
    filename,
    evaluationUser = auth().currentUser.uid,
    score,
  ) => {
    try {
      const doc = await firestore()
        .collection('likeHistory')
        .where('filename', '==', filename)
        .where('evaluationUser', '==', evaluationUser)
        .get();
      if (doc.empty) {
        firestore()
          .collection('likeHistory')
          .doc()
          .set({
            filename: filename,
            evaluationUser: evaluationUser,
            score: score,
            createdAt: Date.now(),
            isApplied: false,
            appliedAt: 0,
          })
          .then(() => {})
          .catch(err => alert(`error: ${err}`));
      }
    } catch (error) {}
  },
  readLikeHistory: async () => {
    try {
    } catch (error) {}
  },
  updateLikeHistory: async () => {
    try {
    } catch (error) {}
  },
  deleteLikeHistory: async () => {
    try {
    } catch (error) {}
  },
};

export const cameraApi = {
  uploadImageFileandCreateDB: async (
    uri,
    description = '',
    folderName = 'images/',
    user = auth().currentUser,
  ) => {
    const fileName = Date.now().toString() + '_' + user.uid;
    imageStorageApi
      .uploadImageStorage(folderName + fileName, uri)
      .then(() => {
        fashionImageApi.createFashionImage(fileName, folderName, description);
      })
      .catch(err => alert(err));
  },
  uploadProfileImageFileandUpdateDB: async (
    uri,
    folderName = 'profileImages/',
    user = auth().currentUser,
  ) => {
    const fileName = Date.now().toString() + '_' + user.uid;
    imageStorageApi
      .uploadImageStorage(folderName + fileName, uri)
      .then(() => {
        //here!!
        imageStorageApi
          .getDownloadUrlOnStorage(folderName + fileName)
          .then(value => {
            //firebase 정보를 업데이트해주고
            user.updateProfile({photoURL: value});
            //db 정보를 업데이트해준다. 만약 document가 없었다면 아무일도 안한다.
            userProfileApi.updateUserProfile({photoURL: value});
          });
      })
      .catch(err => alert(err));
  },
  uploadProfileImageFileandGetDownloadUrl: async (
    uri,
    folderName = 'profileImages/',
    user = auth().currentUser,
  ) => {
    const fileName = Date.now().toString() + '_' + user.uid;
    try {
      await imageStorageApi.uploadImageStorage(folderName + fileName, uri);
      const downloadUrl = await imageStorageApi.getDownloadUrlOnStorage(
        folderName + fileName,
      );
      return downloadUrl;
    } catch (err) {
      return alert(err);
    }
  },
};

export const userUtils = {
  isNewUser: async (user = auth().currentUser) => {
    try {
      const getData = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();
      const result = getData.exists;
      return !result;
    } catch (error) {
      return alert(error);
    }
  },
};

export const updateUserProfile = (user = auth().currentUser, data) => {
  user
    .updateProfile(data)
    .then(() => alert('profile updated!'), error => alert(error));
};
