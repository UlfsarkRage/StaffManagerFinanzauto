// App.tsx 

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation//RootNavigator';

/**
 * @name App
 * @description Punto de entrada principal de la aplicación.
 * Envuelve el RootNavigator en el contenedor de navegación.
 */
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;