// src/styles/views/UserFormViewStyles.ts 

import { StyleSheet } from 'react-native';

const COLORS = {
    GREEN_ACCENT: '#E8F5E9',   
    GREEN_DARK: '#00A859',     
    YELLOW_ACCENT: '#C1E68F',  
    TEXT_MAIN: '#333333',      
    TEXT_BUTTON_DANGER: '#D32F2F',
    CARD_BACKGROUND: '#FFFFFF',
};

export const UserFormViewStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.GREEN_ACCENT,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 40, 
    },
    header: {
        marginBottom: 25,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.TEXT_MAIN,
    },
    // Contenedor de la imagen de perfil
    avatarContainer: {
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 15,
        backgroundColor: COLORS.CARD_BACKGROUND,

        borderWidth: 2,
        borderColor: COLORS.GREEN_DARK,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: { 
        width: '100%',
        height: '100%',
    },
    avatarPlaceholder: {
        fontSize: 50,
        color: COLORS.TEXT_MAIN,
    },
    // Botones de acción (Crear y Cancelar)
    actionButtonContainer: {
        marginTop: 30,
        marginBottom: 10,
    },
    // Botón Principal (Crear)
    createButton: {
        backgroundColor: COLORS.YELLOW_ACCENT,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    createButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.GREEN_DARK,
    },
    // Botón Secundario (Cancelar)
    cancelButton: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: COLORS.TEXT_BUTTON_DANGER,
    },
});