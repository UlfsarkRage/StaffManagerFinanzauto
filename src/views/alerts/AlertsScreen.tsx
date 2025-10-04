// src/views/search/AlertScreen.tsx

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
 * @name AlertsScreen
 * @description Vista dedicada a la funcionalidad de alertas.
 */
const AlertsScreen: React.FC = () => (
    <View style={styles.center}>
        <Text style={styles.text}>Alertas (Placeholder)</Text>
    </View>
);
export default AlertsScreen; // Exportación por defecto

