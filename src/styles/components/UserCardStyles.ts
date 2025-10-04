// src/styles/components/UserCardStyles.ts

import { StyleSheet } from 'react-native';

// COLORES CLAVE
const COLORS = {
    DEFAULT: '#F0FFFF', // Azul muy claro (similar al blanco con un toque azul)
    DEFAULT_BORDER: '#87CEEB', // Azul cielo ligero para el borde por defecto
    FOCUS: '#E0FFE0', // Verde muy claro para el estado de foco/hover
    FOCUS_BORDER: '#A2D02F', // Verde de Finanzauto para el borde de foco
    TEXT_MAIN: '#176D6C', // Verde oscuro para el texto principal
    TEXT_DETAIL: '#888888', // Gris para el ID
};
export const UserCardStyles = StyleSheet.create({
    cardContainer: {
        borderRadius: 15,
        marginVertical: 8,
        marginHorizontal: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        
        // Sombra suave para que la tarjeta flote un poco
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },

    // ESTILOS PARA LOS ESTADOS DE COLOR DE FONDO (Base e Interactivo)
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
        width: 80,
        height: 80,
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
        alignSelf: 'flex-end',
        marginTop: 'auto', // Empuja el link hacia abajo
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        color: COLORS.TEXT_MAIN, // Color verde de la empresa
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    detailIcon: {
        color: COLORS.TEXT_MAIN,
        fontSize: 14,
    },
});