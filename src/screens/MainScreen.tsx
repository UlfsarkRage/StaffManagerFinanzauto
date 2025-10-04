// src/screens/MainScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../views/components/AppHeader';
import AppBottomTabs from '../views/components/AppBottomTabs';
import UserListView from '../views/list/UserListView';
import MenuModal from '../components/common/MenuModal';
import UserFormView from '../views/form/UserFormView';
import SearchScreen from '../views/search/SearchScreen';
import AlertsScreen from '../views/alerts/AlertsScreen';
import SettingsScreen from '../views/settings/SettingsScreen';

type AppView =
  | 'ListaUsuarios'
  | 'BuscarUsuario'
  | 'Alertas'
  | 'Configuracion'
  | 'RegistroUsuario';

/**
 * @name MainScreen
 * @description La única pantalla de navegación del Stack.
 * Contiene el Header y el Contenido de la Aplicación.
 */
const MainScreen: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('ListaUsuarios');
  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  /**
   * @name handleViewChange
   * @description Función wrapper que gestiona el cambio de vista y la limpieza del ID.
   * @param newView La nueva vista a la que se desea navegar.
   */

  const handleViewChange = (newView: AppView) => {
    // LÓGICA CLAVE: Si la nueva vista NO es la de detalle ('BuscarUsuario'),
    // significa que estamos saliendo del detalle, por lo que limpiamos el ID.
    if (newView !== 'BuscarUsuario') {
      setSelectedUserId(null);
    }

    // Finalmente, actualizamos la vista actual.
    setCurrentView(newView);
  };

  /**
   * @name handleUserDetail
   * @description Navega a la vista de búsqueda (detalle) y almacena el ID del usuario.
   * @param userId El ID del usuario a detallar.
   */
  const handleUserDetail = (userId: string) => {
    setSelectedUserId(userId);
    setCurrentView('BuscarUsuario'); // Cambiamos la vista a 'BuscarUsuario' (que usaremos como Detalle)
  };

  // FUNCIÓN: Decide qué componente renderizar en el centro
  const renderContent = () => {
    switch (currentView) {
      case 'ListaUsuarios':
        return <UserListView onUserDetail={handleUserDetail} />;
      case 'RegistroUsuario':
        return <UserFormView />;
      case 'BuscarUsuario':
        return <SearchScreen userId={selectedUserId} />;
      case 'Alertas':
        return <AlertsScreen />;
      case 'Configuracion':
        return <SettingsScreen />;
      default:
        return <UserListView onUserDetail={handleUserDetail} />;
    }
  };
  return (
    <View style={styles.fullScreenContainer}>
      <SafeAreaView style={styles.headerContainer}>
        <AppHeader
          currentViewName={currentView}
          onMenuPress={() => setIsMenuModalVisible(true)}
        />
      </SafeAreaView>

      <View style={styles.contentContainer}>{renderContent()}</View>

     <AppBottomTabs onViewChange={handleViewChange} currentView={currentView} />

      <MenuModal
        isVisible={isMenuModalVisible}
        onClose={() => setIsMenuModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    // Añadimos un padding inferior para que el último item de la lista no quede debajo del Footer.
    paddingBottom: 60,
  },
});

export default MainScreen;
