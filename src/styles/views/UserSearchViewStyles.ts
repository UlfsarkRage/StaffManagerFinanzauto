// src/styles/views/UserSearchViewStyles.ts

import { StyleSheet } from 'react-native';

const COLORS = {
    TEXT_MAIN: '#176D6C',      
    GREEN_ACCENT: '#E0F2F1',   
    GREEN_DARK: '#00A859',     
    BORDER_COLOR: '#D3D3D3',   
    WHITE: '#fff',
    GRAY: 'gray',
    RED: 'red',
};

export const UserSearchViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    // --- BARRA DE BÚSQUEDA ---
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.GREEN_ACCENT, 
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_COLOR,
    },
    searchIcon: {
        marginRight: 10,
        color: 'black',
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: COLORS.WHITE,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: COLORS.TEXT_MAIN,
        borderWidth: 1,
        borderColor: COLORS.BORDER_COLOR,
    },
    // --- CONTENEDOR DE RESULTADOS ---
    resultsContainer: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    messageText: {
        fontSize: 16,
        color: COLORS.GRAY,
        marginTop: 20,
        textAlign: 'center',
    },
    errorText: {
        color: COLORS.RED,
        fontWeight: 'bold',
    },
    // --- ESTILOS DE LA TARJETA DEL USUARIO ENCONTRADO ---
    userCardContainer: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 15,
        backgroundColor: COLORS.GREEN_ACCENT,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 2,
        borderColor: COLORS.GREEN_DARK,
    },
    infoContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.TEXT_MAIN,
    },
    idText: {
        fontSize: 12,
        color: COLORS.GRAY,
        marginBottom: 5,
    },
    detailText: {
        fontSize: 14,
        color: COLORS.TEXT_MAIN,
    },
});