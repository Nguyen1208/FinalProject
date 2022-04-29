/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import Main from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/store/index'
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreLogs(['Remote debugger']);
  LogBox.ignoreLogs(['timer']);
  return (
    <StripeProvider
      publishableKey="pk_test_51Kku6eAuXLusLu10UJXJUbbphToXBgOW4lHpyKUxDujNIdONKwp1LHGSlv3IHtBcjYnCBjNt7IJvmlO4CtvzTmTI003Nf23Mq7">
      <StoreProvider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </StoreProvider>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
});

export default App;
