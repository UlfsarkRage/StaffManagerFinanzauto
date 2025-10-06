// src/styles/components/UserCardStyles.ts

import { StyleSheet } from 'react-native';

// COLORES CLAVE
const COLORS = {
    DEFAULT: '#F0FFFF', 
    DEFAULT_BORDER: '#87CEEB', 
    FOCUS: '#E0FFE0', 
    FOCUS_BORDER: '#A2D02F',
    TEXT_MAIN: '#176D6C', 
    TEXT_DETAIL: '#888888', 
};
export const UserCardStyles = StyleSheet.create({   
    cardContainer: {
        borderRadius: 20,
        marginVertical: 8,
        marginHorizontal: 6,
        padding: 10,
        height: 130,
        flexDirection: 'row',
        alignItems: 'center',
        
       
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },

 
    cardDefault: {
        backgroundColor: COLORS.DEFAULT,
        borderWidth: 2,
        borderColor: COLORS.DEFAULT_BORDER,
    },
    cardFocus: {
        backgroundColor: COLORS.FOCUS,
        borderWidth: 2,
        borderColor: COLORS.FOCUS_BORDER,
    },

    // Contenedor de la Imagen
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 10, // Menos redondeado que la tarjeta, pero con esquinas
        overflow: 'hidden', // Para contener la imagen
        marginRight: 15,
        borderWidth: 1,
        borderColor: COLORS.TEXT_DETAIL,
    },
    image: {
        width: '100%',
        height: '100%',
    },

    // Contenedor de Texto
    textContainer: {
        flex: 1,
        paddingRight: 10,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.TEXT_MAIN,
        marginBottom: 5,
    },
    idText: {
        fontSize: 12,
        color: COLORS.TEXT_DETAIL,
        marginBottom: 8,
    },

    // Enlace de Detalle
    detailLinkContainer: {
        alignSelf: 'stretch', 
        marginTop: 'auto', 
        flexDirection: 'row',
        alignItems: 'center',
        color: COLORS.FOCUS_BORDER,
        justifyContent: 'space-between', 
    },
    detailText: {
        color: COLORS.TEXT_MAIN,
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    detailIcon: {
        color: COLORS.TEXT_MAIN,
        fontSize: 14,
    },
});