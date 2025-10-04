// src/styles/views/UserListViewStyles.ts

import { StyleSheet } from 'react-native';

export const UserListViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // Estilos del Título de la Sección
    contentTitle: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color: '#4D4D4D',
    },
    // Estilos del Contenedor de la Lista
    contentWorkers: {
        flex: 1,
        paddingHorizontal: 20,
    },
    listContainer: {
        paddingTop: 10,
        paddingBottom: 20, // Añadir padding inferior para que el último item no quede tapado por la barra inferior
    },
    loading: {
        marginTop: 50,
    },
});