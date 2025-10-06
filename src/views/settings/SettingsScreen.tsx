// src/views/search/SettingsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'gray',
    }
});

/**
 * @name SettingsScreen
 * @description Vista dedicada a la funcionalidad de configuración.
 */
const SettingsScreen: React.FC = () => (
    <View style={styles.center}>
        <Text style={styles.text}>Configuración (Roles, contraseñas permisos, variedad de cosas que queramos agregar)</Text>
    </View>
);

export default SettingsScreen; // Exportación por defecto