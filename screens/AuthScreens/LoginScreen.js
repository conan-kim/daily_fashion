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
  const navigation = useNavigation();

  const onLoginPress = async () => {
    try {
      email &&
        password &&
        (await auth().signInWithEmailAndPassword(email, password));
    } catch (error) {
      alert(error);
    }
  };
  const onCreateAccountPress = () => {
    navigation.navigate('SignUp');
  };
  const onForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <Container>
      <Text>this is Login Screen</Text>
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
      <Button title="Login" onPress={onLoginPress} />
      <Button title="Create Account" onPress={onCreateAccountPress} />
      <Button title="Forgot Password?" onPress={onForgotPasswordPress} />
    </Container>
  );
};
