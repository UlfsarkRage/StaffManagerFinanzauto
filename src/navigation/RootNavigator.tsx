// src/navigation/RootNavigator.tsx 

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; 

import MainScreen from '../screens/MainScreen'; 

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      // La única ruta en nuestro stack es MainScreen
      initialRouteName="UserList" 
      screenOptions={{
        headerShown: false, // Seguimos ocultando la cabecera del Stack
      }}
    >

      <Stack.Screen 
        name="UserList" // Reutilizamos el nombre de la ruta principal para no tocar App.tsx
        component={MainScreen} // Montamos nuestro nuevo contenedor principal
      />

      
    </Stack.Navigator>
  );
};

export default RootNavigator;