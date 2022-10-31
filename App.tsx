import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EtuSivu from './src/screens/EtuSivu';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LiigaApp'  component={EtuSivu} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default  App;
