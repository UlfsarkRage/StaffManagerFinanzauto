/* eslint-disable react-native/no-inline-styles */
/**
 * @format
 */

import { AppRegistry } from 'react-native';
// 1. IMPORTACIÓN CLAVE: Importamos el componente raíz de gestos.
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import App from './App';
import { name as appName } from './app.json';
import React from 'react'; // Necesario para usar JSX en la función Root

/**
 * @name Root
 * @description Componente wrapper para envolver la aplicación en el GestureHandlerRootView.
 * Esto es necesario para que gestos como Swipeable funcionen globalmente.
 */
const Root = () => (
    // 2. ENVOLVEMOS la aplicación en el GestureHandlerRootView con flex: 1.
    <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
    </GestureHandlerRootView>
);

// 3. REGISTRAMOS el nuevo componente Root en lugar de App.
AppRegistry.registerComponent(appName, () => Root);