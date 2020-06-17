import React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Text = styled.Text``;

export default ({route}) => {
  const data = route.params;
  return (
    <Container>
      <FastImage
        source={{uri: data.downloadUrl}}
        style={{width: '100%', height: 500}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text>This is Image Detail Screen</Text>
      {data.description ? <Text>Description: {data.description}</Text> : null}
      <Text>Like: {data.score[0]}</Text>
      <Text>Hate: {data.score[1]}</Text>
    </Container>
  );
};
