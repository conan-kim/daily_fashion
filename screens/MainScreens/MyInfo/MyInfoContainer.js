import React, {useState, useEffect} from 'react';
import MyInfoPresenter from './MyInfoPresenter';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {userProfileApi} from '../../../utils/api';

export default function App(props) {
  const user = auth().currentUser;

  const [userData, setUserData] = useState({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    description: 'description',
  });
  const [imageData, setImageData] = useState([]);
  const [needProfileRefresh, setNeedProfileRefresh] = useState(true);
  const [needImageRefresh, setNeedImageRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProfileData(user);
  }, [needProfileRefresh]);

  useEffect(() => {
    getImageData(user);
  }, [needImageRefresh]);

  const getProfileData = async user => {
    console.log('getProfileData started...');
    const userProfileData = await userProfileApi.readUserProfile(user.uid);
    setUserData({...userData, description: userProfileData.description});
  };

  const getImageData = async user => {
    setIsLoading(true);
    console.log('getImageData started...');
    const userImageData = await firestore()
      .collection('fashionImage')
      .where('uploader', '==', user.uid)
      .get();
    var imageDataResult = [];
    var imageUrlDataResult = [];
    userImageData.forEach((doc, index) => {
      if (imageUrlDataResult.includes(doc.data().downloadUrl) === false) {
        imageDataResult.push(doc.data());
        imageUrlDataResult.push(doc.data().downloadUrl);
      }
      if (index + 1 === userImageData.size) {
        setImageData(imageDataResult);
        setIsLoading(false);
      }
    });
  };

  const refreshProfileData = () => {
    setNeedProfileRefresh(!needProfileRefresh);
  };
  const refreshImageData = () => {
    setNeedImageRefresh(!needImageRefresh);
  };

  return (
    <MyInfoPresenter
      user={user}
      userData={userData}
      imageData={imageData}
      isLoading={isLoading}
    />
  );
}
