// src/components/common/CustomSpinner.tsx

import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

interface CustomSpinnerProps {
    size?: number;
    color?: string;
    duration?: number;
}

/**
 * @name CustomSpinner
 * @description Indicador de carga animado con rotación constante.
 */
const CustomSpinner: React.FC<CustomSpinnerProps> = ({
    size = 40,
    color = '#176D6C', // Color principal de Finanzauto
    duration = 1000,
}) => {
    // 1. Crear un valor animado para la rotación
    const rotationAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // 2. Definir la animación de rotación infinita
        Animated.loop(
            Animated.timing(rotationAnim, {
                toValue: 1, // Rotar de 0 a 1
                duration,
                easing: Easing.linear, // Velocidad constante
                useNativeDriver: true, // Optimización de rendimiento
            })
        ).start();
    }, [rotationAnim, duration]);

    // 3. Mapear el valor animado (0 a 1) a grados de rotación (0deg a 360deg)
    const spin = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View // Usamos Animated.View como contenedor para aplicar la animación
            style={{ 
                transform: [{ rotate: spin }], // Aplicar la rotación del ícono
                // Eliminamos cualquier estilo de posición aquí
            }}
        >
            <Icon 
                name="reload-circle"
                size={size} 
                color={color} 
            />
        </Animated.View>
    );
};


export default CustomSpinner;