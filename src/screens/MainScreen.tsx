// src/screens/MainScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../views/components/AppHeader';
import AppBottomTabs from '../views/components/AppBottomTabs';
import UserListView from '../views/list/UserListView'; 
// Importaciones de los placeholders (para las demás vistas)
import UserFormView from '../views/form/UserFormView'; 
import { SearchScreen, AlertsScreen, SettingsScreen } from '../views/list/UserListView'; // Usamos los placeholders antiguos por ahora

// TIPADO: Definimos los nombres de las vistas internas
type AppView = 'List' | 'Search' | 'Alerts' | 'Settings' | 'Form';

/**
 * @name MainScreen
 * @description La única pantalla de navegación del Stack. 
 * Contiene el Header y el Contenido de la Aplicación.
 */
const MainScreen: React.FC = () => {
    // ESTADO CENTRAL: Mantiene el registro de la vista actual (por defecto: 'List')
    const [currentView, setCurrentView] = useState<AppView>('List');

    // FUNCIÓN: Decide qué componente renderizar en el centro
    const renderContent = () => {
        switch (currentView) {
            case 'List':
                return <UserListView />;
            case 'Form':
                return <UserFormView />;
            case 'Search':
                return <SearchScreen />;
            case 'Alerts':
                return <AlertsScreen />;
            case 'Settings':
                return <SettingsScreen />; 
            default:
                return <UserListView />;
        }
    };
    return (
        // Usamos View como contenedor principal para que el Footer quede fijo
        <View style={styles.fullScreenContainer}> 
            {/* 1. HEADER: Fijo en la parte superior */}
            <SafeAreaView style={styles.headerContainer}>
                <AppHeader />
            </SafeAreaView>

           
            <View style={styles.contentContainer}>
                {renderContent()} 
            </View>

            {/* 3. FOOTER: Fijo en la parte inferior. Pasa el setView como prop */}
            <AppBottomTabs onViewChange={setCurrentView} currentView={currentView} />
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
    }
});

export default MainScreen;