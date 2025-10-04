// src/views/components/AppHeader.tsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppHeaderStyles as styles } from '../../styles/views/AppHeaderStyles';


// TIPADO: Definimos la propiedad esperada
interface AppHeaderProps {
  currentViewName: string; // Recibe el nombre de la vista activa 
  onMenuPress: () => void; // NUEVA PROP: Función para abrir el modal
}


// FUNCIÓN AUXILIAR: Mapea el nombre de la vista interna a un nombre legible para el Breadcrumb
const getViewTitle = (viewName: string): string => {
  switch (viewName) {
    case 'ListaUsuarios':
      return 'Usuarios'; 
    case 'RegistroUsuario':
      return 'Nuevo usuario';
    case 'BuscarUsuario':
      return 'Búsqueda';
    case 'Alertas':
      return 'Alertas';
    case 'Configuracion':
      return 'Configuración';
    default:
      return 'Usuarios';
  }
};

/**
 * @name AppHeader
 * @description Componente de encabezado superior fijo (Finanzauto, Sub-Nav).
 */
const AppHeader: React.FC<AppHeaderProps> = ({ currentViewName, onMenuPress  }) => {

    const viewTitle = getViewTitle(currentViewName);
    return (
        <View>
            {/* 1. Logo Principal (queda igual) */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Finanzauto {" "}
                    <Icon name="car" size={40} color="#176D6C" />
                </Text>
            </View>

           
            <View style={styles.subNav}>
                <Text>
                    
                    <Text style={styles.breadcrumbBase}>
                        Inicio {" "} {'>'} {" "}
                    </Text>

                    
                    <Text style={styles.subNavTitle}>
                        {viewTitle}
                    </Text>
                </Text> 
                
                <TouchableOpacity onPress={onMenuPress}>
                    <Text style={styles.menuIcon}>☰</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
};

export default AppHeader;