// src/views/form/UserFormView.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * @name UserFormView
 * @description Vista para el formulario de registro/edición (placeholder).
 */
const UserFormView: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Formulario de Usuario (Vista de CREACIÓN/EDICIÓN)</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0FFF0', // Fondo de color claro para diferenciar
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#176D6C',
    }
});

export default UserFormView;