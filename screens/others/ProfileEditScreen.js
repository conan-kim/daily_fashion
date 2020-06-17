import React from 'react';
import styled from 'styled-components/native';

const View = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text``;

export default () => {
  return (
    <View>
      <Text>This is Profile Edit Screen</Text>
    </View>
  );
}
