// src/views/components/AppBottomTabs.tsx

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { AppBottomTabsStyles as styles } from '../../styles/views/AppBottomTabsStyles'; 


// TIPADO: Definimos la forma de las props para manejar el cambio de vista
interface AppBottomTabsProps {
    // Definimos una función que recibirá el nombre de la vista a mostrar
    onViewChange: (viewName: 'ListaUsuarios' | 'BuscarUsuario' | 'Alertas' | 'Configuracion' | 'RegistroUsuario') => void;
    currentView: string;
}

/**
 * @name AppBottomTabs
 * @description Componente de barra de navegación inferior (Footer) fijo. 
 * Controla el renderizado de las vistas centrales de la aplicación.
 */
const AppBottomTabs: React.FC<AppBottomTabsProps> = ({ onViewChange, currentView }) => {
    
    // Función auxiliar para renderizar los íconos
    const renderIcon = (name: string, viewName: string) => {
        const color = currentView === viewName ? '#00A859' : 'gray'; // Verde activo
        return (
            <TouchableOpacity 
                style={styles.tabItem} 
                onPress={() => onViewChange(viewName as any)}
            >
                <Icon name={name} color={color} size={24} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.tabBarContainer}>
            {/* Pestaña HOME / LIST */}
            {renderIcon("home", "ListaUsuarios")} 

            {/* Pestaña SEARCH */}
            {renderIcon("search", "BuscarUsuario")} 

            {/* BOTÓN FLOTANTE: Usamos el CustomFloatingButton */}
            <TouchableOpacity 
                style={styles.floatingButtonContainer}
                onPress={() => onViewChange('RegistroUsuario')} // Navega a la vista de Registro de Usuario
            >
                 <Icon name="add" color="white" size={30} />
            </TouchableOpacity>

            {/* Pestaña ALERTS */}
            {renderIcon("notifications", "Alertas")} 

            {/* Pestaña SETTINGS */}
            {renderIcon("settings", "Configuracion")} 
        </View>
    );
};

export default AppBottomTabs;