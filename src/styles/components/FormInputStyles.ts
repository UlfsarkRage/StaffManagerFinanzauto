// src/styles/components/FormInputStyles.ts 

import { StyleSheet } from 'react-native';

const COLORS = {
    GREEN_DARK: '#00A859',      
    BORDER_COLOR: '#D3D3D3',    
    ERROR_COLOR: '#D32F2F',     
    TEXT_MAIN: '#333333',      
    TEXT_LABEL: '#888888',      
    CARD_BACKGROUND: '#FFFFFF', 
    CHECK_COLOR: '#00A859',
};

export const FormInputStyles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 12,
        color: COLORS.TEXT_LABEL,
        marginBottom: 4,
        paddingLeft: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.CARD_BACKGROUND,
        borderRadius: 8,
        paddingHorizontal: 15,
        minHeight: 50,
        // Estilo de borde base (normal)
        borderWidth: 1, 
        borderColor: COLORS.BORDER_COLOR, 
        elevation: 1, // Sombra suave
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1.5,
    },
    // Estilo para cuando el campo está enfocado
    inputWrapperFocused: {
        borderColor: COLORS.GREEN_DARK,
        borderWidth: 2,
        elevation: 3,
    },
    // Estilo para cuando hay un error
    inputWrapperError: {
        borderColor: COLORS.ERROR_COLOR,
        borderWidth: 2,
    },
    icon: {
        marginRight: 10,
    },
    // ESTILOS DE ÍCONOS FALTANTES:
    fieldIcon: {
        color: COLORS.TEXT_MAIN, // Color por defecto para el ícono principal (llave, persona, etc.)
    },
    checkIcon: {
        marginLeft: 10, // Un poco de margen para separarlo del texto
        color: COLORS.CHECK_COLOR, // El color verde de confirmación
    },
    // FIN ESTILOS DE ÍCONOS FALTANTES
    
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.TEXT_MAIN,
        paddingVertical: 10,
    },
    // Estilos para el texto del selector (simula la apariencia del input)
    selectText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.TEXT_MAIN,
        paddingVertical: 10,
    },
    placeholderText: {
        color: COLORS.TEXT_LABEL,
    },
    // Estilo para el mensaje de error
    errorText: {
        fontSize: 12,
        color: COLORS.ERROR_COLOR,
        marginTop: 4,
        paddingLeft: 5,
    },
});