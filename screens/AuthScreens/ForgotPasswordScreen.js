import React, { useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text``;
const TextInputContainer = styled.View``;
const Email = styled.TextInput`
  width: 200px;
  height: 40px;
  border-width: 1px;
`;
const Button = styled.Button``;

export default () => {
  const [email, setEmail] = useState(null);
  const navigation = useNavigation();

  const onResetPasswordPress = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      alert(`Mail sent to ${email}. Please check!`)
    } catch (error) {
      alert(error);
    }
  };
  const onBackToLoginPress = () => {
    navigation.navigate("LogIn");
  };

  return (
    <Container>
      <Text>this is Forgot Password Screen</Text>
      <Text>Email</Text>
      <Email
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      <Button title="Reset Password" onPress={onResetPasswordPress} />
      <Button title="Back to Login" onPress={onBackToLoginPress} />
    </Container>
  );
};
