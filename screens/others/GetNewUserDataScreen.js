import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import ProfileImage from '../../component/ProfileImage';
import {cameraApi, userProfileApi} from '../../utils/api';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TextInput = styled.TextInput`
  width: 200px;
  height: 40px;
  border-width: 1px;
`;
const Text = styled.Text``;
const Button = styled.Button``;
const ModalContainer = styled.View`
  justify-content: center;
  background-color: grey;
  width: 220px;
`;
const TextContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const ButtonContainer = styled.View`
  margin-top: 2px;
  padding-top: 2px;
`;
const TouchableOpacity = styled.TouchableOpacity``;
const SexContainer = styled.View`
  height: 100px;
  width: 100px;
  align-items: center;
  justify-content: center;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;
const GetNewUserDataScreen = ({setIsNewUser}) => {
  const user = auth().currentUser;

  const [onUploading, setOnUploading] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);
  const [userData, setUserData] = useState({
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    description: '',
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    sex: 0,
  });
  const [isMale, setIsMale] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(isMale);
  }, [isMale]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const _onGetImagesCameraPress = async () => {};
  const _onGetImagesGalleryPress = async () => {};
  const _onSubmitInfoPress = async () => {
    setOnUploading(true);
    if (profileUrl !== null) {
      const downloadUrl = await cameraApi.uploadProfileImageFileandGetDownloadUrl(
        profileUrl,
      );
      user.updateProfile({photoURL: downloadUrl});
      setUserData({
        ...userData,
        photoURL: downloadUrl,
      });
    }
    if (userData.displayName !== null) {
      user.updateProfile({displayName: userData.displayName});
    }

    userProfileApi
      .updateUserProfile(userData)
      .then(() => {
        setOnUploading(false);
        setIsNewUser(false);
      })
      .catch(err => {
        setOnUploading(false);
        alert(err);
      });
  };

  return (
    <Container>
      <Text>Profile Change</Text>
      <ProfileImage uri={user.photoURL} />
      <Button
        title="Get Images by Gallery"
        onPress={toggleModal}
        disabled={onUploading ? true : false}
      />
      <Modal
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        isVisible={modalVisible}
        onBackdropPress={toggleModal}>
        <ModalContainer>
          <TextContainer>
            <Text style={{color: 'white'}}>Get Images from...</Text>
          </TextContainer>
          <ButtonContainer>
            <Button
              title="Gallery"
              onPress={_onGetImagesGalleryPress}
              color="grey"
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              title="Camera"
              onPress={_onGetImagesCameraPress}
              color="grey"
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button title="Close" onPress={toggleModal} color="black" />
          </ButtonContainer>
        </ModalContainer>
      </Modal>
      <Text>Select your Gender</Text>
      <RowContainer>
        <TouchableOpacity
          onPress={() => {
            setIsMale(true);
            setUserData({...userData, sex: 1});
          }}>
          <SexContainer
            style={{
              backgroundColor: isMale ? 'rgb(150,150,150)' : 'rgb(220,220,220)',
            }}>
            <Icon name="male" color={isMale ? 'black' : 'grey'} size={50} />
            <Text
              style={{
                color: isMale ? 'black' : 'grey',
                fontWeight: isMale ? 'bold' : 'normal',
              }}>
              Male
            </Text>
          </SexContainer>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsMale(false);
            setUserData({...userData, sex: 2});
          }}>
          <SexContainer
            style={{
              backgroundColor: !isMale
                ? 'rgb(150,150,150)'
                : 'rgb(220,220,220)',
            }}>
            <Icon name="female" color={!isMale ? 'black' : 'grey'} size={50} />
            <Text
              style={{
                color: !isMale ? 'black' : 'grey',
                fontWeight: !isMale ? 'bold' : 'normal',
              }}>
              Female
            </Text>
          </SexContainer>
        </TouchableOpacity>
      </RowContainer>
      <Text>displayName Change</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => setUserData({...userData, displayName: text})}
      />
      <Text>Description Change</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => setUserData({...userData, description: text})}
      />
      <Button
        title="Submit Informations"
        onPress={_onSubmitInfoPress}
        disabled={onUploading ? true : false}
      />
      {onUploading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            opacity: 0.7,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            zIndex: 1,
          }}
          color="white"
          size="large"
        />
      )}
    </Container>
  );
};

GetNewUserDataScreen.propTypes = {setIsNewUser: PropTypes.func.isRequired};

export default GetNewUserDataScreen;
