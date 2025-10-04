// src/styles/views/AppBottomTabsStyles.ts

import { StyleSheet } from 'react-native';

export const AppBottomTabsStyles = StyleSheet.create({
    tabBarContainer: {
        // Contenedor principal para la barra de pestañas, asegurando que esté en la parte inferior.
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        borderTopWidth: 0,
        elevation: 10,
        position: 'absolute', // FIJO en la parte inferior
        bottom: 0,
        flexDirection: 'row', // Para organizar los íconos horizontalmente
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    // Estilo para el botón flotante
    floatingButtonContainer: {
        top: -25, // Levanta el botón por encima de la barra
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#A2D02F', // Fondo del botón flotante
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
});