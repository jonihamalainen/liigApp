import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EtuSivu from './src/screens/EtuSivu';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import PeliSivu from './src/screens/PeliSivu';

const Stack = createNativeStackNavigator();

const App : React.FC = () : React.ReactElement => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LiigaApp - Etusivu'
      >
        <Stack.Screen name='LiigaApp - Etusivu'  component={EtuSivu} />
        <Stack.Screen name="LiigaApp - Ottelu" component={PeliSivu} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default  App;
