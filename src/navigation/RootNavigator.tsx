// src/navigation/RootNavigator.tsx 

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation'; 
// Eliminamos la importación de BottomTabNavigator y UserFormScreen.
// Solo necesitamos la pantalla que contiene toda nuestra nueva lógica.
import MainScreen from '../screens/MainScreen'; // NUEVA IMPORTACIÓN

// Creamos la instancia del Stack Navigator
// Aunque MainScreen es el único elemento, el Stack se mantiene por si necesitamos modales o logins en el futuro.
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
      {/* 1. La única pantalla que contiene toda la lógica de Vistas */}
      <Stack.Screen 
        name="UserList" // Reutilizamos el nombre de la ruta principal para no tocar App.tsx
        component={MainScreen} // Montamos nuestro nuevo contenedor principal
      />
      
      {/* Las rutas UserDetail y UserForm ya no estarán aquí; se manejarán como 
      componentes renderizados dentro de MainScreen. 
      */}
      
    </Stack.Navigator>
  );
};

export default RootNavigator;