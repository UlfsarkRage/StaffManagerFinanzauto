// src/views/components/AppHeader.tsx

import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppHeaderStyles as styles } from '../../styles/views/AppHeaderStyles'; 

/**
 * @name AppHeader
 * @description Componente de encabezado superior fijo (Finanzauto, Sub-Nav).
 */
const AppHeader: React.FC = () => {
    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Finanzauto {" "}  
                    <Icon name="car" size={40} color="#176D6C" />
                </Text>
            </View>
            <View style={styles.subNav}>
                <Text style={styles.subNavTitle}>Inicio</Text>
                <Text style={styles.menuIcon}>☰</Text> 
            </View>
        </View>
    );
};

export default AppHeader;