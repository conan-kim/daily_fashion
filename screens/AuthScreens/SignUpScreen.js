import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text``;
const Email = styled.TextInput`
  width: 200px;
  height: 40px;
  border-width: 1px;
`;
const Password = styled.TextInput`
  width: 200px;
  height: 40px;
  border-width: 1px;
`;
const Button = styled.Button``;

export default () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordR, setPasswordR] = useState(null);
  const navigation = useNavigation();

  const _onCreateAccountPress = async () => {
    try {
      if (password !== passwordR) {
        alert('password is not matching!');
        return null;
      }
      await auth().createUserWithEmailAndPassword(email, password);
      alert('Welcome, New User!');
    } catch (error) {
      if (email === null) {
        alert('Please input email');
      } else if ((password || passwordR) === null) {
        alert('Please input password');
      } else {
        alert(error);
      }
    }
  };
  const _onBackToLoginPress = () => {
    navigation.navigate('LogIn');
  };

  return (
    <Container>
      <Text>this is Signup Screen</Text>
      <Text>Email</Text>
      <Email
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <Text>Password</Text>
      <Password
        value={password}
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Text>Password Again</Text>
      <Password
        value={passwordR}
        onChangeText={text => setPasswordR(text)}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <Button title="Create Account" onPress={_onCreateAccountPress} />
      <Button title="Back to Login" onPress={_onBackToLoginPress} />
    </Container>
  );
};
