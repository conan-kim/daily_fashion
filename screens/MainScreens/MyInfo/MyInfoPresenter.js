import React from 'react';
import {Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../component/ProfileImage';

const {width, height} = Dimensions.get('screen');

const MyInfoContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;
const MyInfoUpperContainer = styled.View`
  width: 100%;
  height: ${Math.min(height / 4, 300)}px;
  background-color: orange;
  align-items: center;
  justify-content: center;
`;
const MyInfoBottomContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Button = styled.Button``;
const Text = styled.Text``;

export default ({user, userData, imageData, isLoading}) => {
  const navigation = useNavigation();
  const onEditProfilePress = () => {
    navigation.navigate('Profile Edit');
  };
  return (
    <MyInfoContainer>
      <MyInfoUpperContainer>
        <ProfileImage uri={user.photoURL} />
        <Text>{user.displayName}</Text>
        <Text>{userData.description}</Text>
        <Button title="Edit Profile" onPress={onEditProfilePress} />
      </MyInfoUpperContainer>
      {isLoading ? (
        <MyInfoBottomContainer>
          <ActivityIndicator size={'large'} />
        </MyInfoBottomContainer>
      ) : imageData.length > 0 ? (
        //If there are some images..
        <FlatGrid
          horizontal={false}
          style={{width: '100%'}}
          itemContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
          spacing={2}
          itemDimension={width / 4}
          data={imageData}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.filename.toString()}
              onPress={() => navigation.navigate('Image Detail', item)}>
              <FastImage
                style={{
                  width: width / 3 - 2,
                  height: width / 3 - 2,
                  borderColor: 'grey',
                  borderWidth: 0.3,
                }}
                resizeMode={FastImage.resizeMode.cover}
                source={{uri: item.downloadUrl}}
                onLoadStart={() => {}}
                onLoadEnd={() => {}}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        //If there is no image data..
        <MyInfoBottomContainer>
          <Text>No images..</Text>
        </MyInfoBottomContainer>
      )}
    </MyInfoContainer>
  );
};
