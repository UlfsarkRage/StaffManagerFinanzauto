// src/screens/MainScreen.tsx 

import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../views/components/AppHeader';
import AppBottomTabs from '../views/components/AppBottomTabs';
import UserListView from '../views/list/UserListView';
import MenuModal from '../components/common/MenuModal';
import UserFormView from '../views/form/UserFormView';
import AlertsScreen from '../views/alerts/AlertsScreen';
import SettingsScreen from '../views/settings/SettingsScreen';
import UserSearchView from '../views/search/UserSearchView';
import { User } from '../types/user'; // Importar el tipo de payload para el éxito

// TIPO: Define las vistas posibles en la aplicación.
type VistaAplicacion =
  | 'ListaUsuarios'
  | 'BuscarUsuario'
  | 'Alertas'
  | 'Configuracion'
  | 'RegistroUsuario';

/**
 * @name PantallaPrincipal
 * @description La única pantalla de navegación del Stack.
 * Contiene el Header, el Contenido Dinámico y el Footer (Bottom Tabs) de la Aplicación.
 */
const PantallaPrincipal: React.FC = () => {
  // Estados renombrados a español
  const [vistaActual, setVistaActual] = useState<VistaAplicacion>('ListaUsuarios');
  const [esMenuModalVisible, setEsMenuModalVisible] = useState(false);
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState<string | null>(null);

  /**
   * @name manejarCambioDeVista
   * @description Función que gestiona el cambio de vista y la limpieza del ID.
   * Usada principalmente por el Bottom Tab y la navegación interna.
   * @param nombreVista La nueva vista a la que se desea navegar.
   * @param idUsuario El ID de usuario a buscar/detallar (opcional).
   */
  const manejarCambioDeVista = (
    nombreVista: VistaAplicacion,
    idUsuario: string | null = null,
  ) => {
    // Si la vista es la de búsqueda y se proporciona un ID, lo guardamos
    if (nombreVista === 'BuscarUsuario' && idUsuario) {
      setIdUsuarioSeleccionado(idUsuario);
    } else {
      // Limpiamos el ID si vamos a cualquier otra vista
      setIdUsuarioSeleccionado(null);
    }
    setVistaActual(nombreVista);
  };

  /**
   * @name manejarDetalleUsuario
   * @description Navega a la vista de búsqueda (detalle) y almacena el ID del usuario.
   * Usada al presionar un ítem en la lista de usuarios.
   * @param idUsuario El ID del usuario a detallar.
   */
  const manejarDetalleUsuario = (idUsuario: string) => {
    // Al presionar el detalle, navegamos a la vista de Búsqueda, llevando el ID como parámetro.
    manejarCambioDeVista('BuscarUsuario', idUsuario);
  };

  /**
   * @name manejarCancelacionRegistro
   * @description Navega de vuelta a la Lista de Usuarios cuando se presiona Cancelar en el formulario.
   */
  const manejarCancelacionRegistro = () => {
    Alert.alert('Registro Cancelado', 'Se ha cancelado el registro del nuevo usuario.');
    manejarCambioDeVista('ListaUsuarios');
  };

  /**
   * @name manejarExitoRegistro
   * @description Navega de vuelta a la Lista de Usuarios tras un registro exitoso (dummy).
   * @param nuevoUsuario El objeto del usuario que fue creado (de tipo User, que incluye el ID).
   */
  const manejarExitoRegistro = (_nuevoUsuario: User) => { // TIPO CORREGIDO: Usar 'User'
    // Podemos mostrar una alerta, aunque ya la mostramos dentro del UserFormView.
    // Aquí se podría recargar la lista de usuarios si no fuera dummy, pero por ahora solo navegamos.
    manejarCambioDeVista('ListaUsuarios');
  };


  /**
   * @name renderizarContenido
   * @description Función que decide y renderiza el componente central de la aplicación
   * basado en el estado 'vistaActual'.
   */
  const renderizarContenido = () => {
    switch (vistaActual) {
      case 'ListaUsuarios':
        return <UserListView onUserDetail={manejarDetalleUsuario} />;
      
      // NUEVA IMPLEMENTACIÓN: Renderizar el formulario
      case 'RegistroUsuario':
        return (
          <UserFormView 
            onCancel={manejarCancelacionRegistro} 
            onSuccess={manejarExitoRegistro} 
          />
        );
      
      case 'BuscarUsuario':
        return (
          <UserSearchView
            userId={idUsuarioSeleccionado}
            // Función para limpiar el ID y volver a la búsqueda general si se desea
            onClearUserId={() => setIdUsuarioSeleccionado(null)}
          />
        );
      case 'Alertas':
        return <AlertsScreen />;
      case 'Configuracion':
        return <SettingsScreen />;
      default:
        // Por defecto, muestra la lista de usuarios
        return <UserListView onUserDetail={manejarDetalleUsuario} />;
    }
  };

  return (
    <View style={styles.contenedorPantallaCompleta}>
      <SafeAreaView style={styles.contenedorCabecera}>
        <AppHeader
          currentViewName={vistaActual}
          onMenuPress={() => setEsMenuModalVisible(true)}
        />
      </SafeAreaView>

      <View style={styles.contenedorContenido}>{renderizarContenido()}</View>

      <AppBottomTabs
        onViewChange={manejarCambioDeVista}
        currentView={vistaActual}
      />

      <MenuModal
        isVisible={esMenuModalVisible}
        onClose={() => setEsMenuModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPantallaCompleta: {
    flex: 1,
    backgroundColor: 'white',
  },
  contenedorCabecera: {
    backgroundColor: 'white',
  },
  contenedorContenido: {
    flex: 1,
    // Se añade padding inferior para evitar que el contenido sea cubierto por el AppBottomTabs.
    paddingBottom: 60,
  },
});

export default PantallaPrincipal;