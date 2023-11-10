import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import {PermissionsProvider} from './src/context/PermissionsContext';

const AppState = ({children}: any) => {
  return (<PermissionsProvider>{children}</PermissionsProvider>);
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
