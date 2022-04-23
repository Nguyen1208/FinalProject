import React, {useState} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import FormButton from '../component/FormButton';
import FormInput from '../component/FormInput';
import {COLORS} from '../component/theme';
import {signUp} from '../utils/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnSubmit = () => {
    if (email != '' && password != '' && confirmPassword != '') {
      if (password == confirmPassword) {
        //   SignUp
        signUp(email, password);
      } else {
        Alert.alert('password did not match');
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
      }}>
      {/* Header */}
      <Text 
        style={{
          fontSize: 30,
          color: 'orange',
          fontWeight: 'bold',
          marginVertical: 32,
        }}>Ewallet4U</Text>
      <Text
        style={{
          fontSize: 24,
          color: COLORS.black,
          fontWeight: 'bold',
          marginVertical: 32,
        }}>
        Sign Up
      </Text>

      {/* Email */}
      <FormInput
        labelText="Email"
        placeholderText="enter your email"
        onChangeText={value => setEmail(value)}
        value={email}
        keyboardType={'email-address'}
      />

      {/* Password */}
      <FormInput
        labelText="Password"
        placeholderText="enter your password"
        onChangeText={value => setPassword(value)}
        value={password}
        secureTextEntry={true}
      />

      {/* Confirm Password */}
      <FormInput
        labelText="Confirm Password"
        placeholderText="enter your password again"
        onChangeText={value => setConfirmPassword(value)}
        value={confirmPassword}
        secureTextEntry={true}
      />

      {/* Submit button */}
      <FormButton
        labelText="Sign up"
        handleOnPress={handleOnSubmit}
        style={{width: '100%'}}
      />

      {/* Footer */}
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <Text>Already have an account?</Text>
        <Text
          style={{marginLeft: 4, color: COLORS.primary}}
          onPress={() => navigation.navigate('SignIn')}>
          Sign in
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;