// src/views/list/UserListView.tsx (CÓDIGO CORREGIDO)

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

import { UserListViewStyles as styles } from '../../styles/views/UserListViewStyles';

import UserCard from '../../components/cards/UserCard';
import { fetchDummyUsers } from '../../api/dummyData';
import { User } from '../../types/user';

// ESTILOS COMUNES para los Placeholders, definidos FUERA del componente principal
const commonStyles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'gray',
    },
});

/**
 * @name UserListView
 * @description COMPONENTE DE VISTA: Muestra la lista de usuarios.
 */
const UserListView: React.FC = () => {
    // ESTADO: Almacena la lista de usuarios y el estado de carga
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // EFECTO: Se ejecuta una sola vez al montar el componente para traer los datos
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchDummyUsers(); // Llama a la función simulada de la API
                setUsers(data);
            } catch (error) {
                console.error('Error al cargar usuarios dummy:', error);
            } finally {
                setIsLoading(false); // Finaliza el estado de carga
            }
        };
        loadUsers();
    }, []);

    // FUNCIÓN AUXILIAR: Define cómo se debe renderizar cada item de la lista
    const renderItem = ({ item }: { item: User }) => (
        <UserCard user={item} /> // USANDO EL COMPONENTE MODULAR
    );
    
    // NOTA: ELIMINAMOS la definición de 'commonStyles' de aquí, se movió arriba.

    return (
        <View style={styles.container}>
            {/* Título de la Sección */}
            <View style={styles.contentTitle}>
                <Text style={styles.sectionTitle}>Consulta y Registro de Usuarios</Text>
            </View>

            {/* Contenedor de la Lista */}
            <View style={styles.contentWorkers}>
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#176D6C"
                        style={styles.loading}
                    />
                ) : (
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
        </View>
    );
};

// EXPORTACIÓN PRINCIPAL
export default UserListView; // Renombrado de UserListScreen a UserListView

// --- PANTALLAS DE MARCADOR (Placeholder) ---
// Estas funciones DEBEN estar FUERA del componente principal para ser exportadas
export const SearchScreen = () => (
    <View style={commonStyles.center}>
        <Text style={commonStyles.text}>Búsqueda (Placeholder)</Text>
    </View>
);

export const AlertsScreen = () => (
    <View style={commonStyles.center}>
        <Text style={commonStyles.text}>Alertas (Placeholder)</Text>
    </View>
);

export const SettingsScreen = () => (
    <View style={commonStyles.center}>
        <Text style={commonStyles.text}>Configuración (Placeholder)</Text>
    </View>
);