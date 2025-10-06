/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/common/FormNativePicker.tsx 

import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // <-- EL COMPONENTE NATIVO
import Icon from 'react-native-vector-icons/Ionicons';

// IMPORTACIONES DEL PROYECTO
import { FormInputStyles as inputStyles } from '../../styles/components/FormInputStyles';
import { FieldConfig } from '../../config/formConfig';

// Define el formato de los ítems del selector
interface SelectItem {
    label: string;
    value: string;
}

// Propiedades que recibirá nuestro componente
interface FormNativePickerProps {
    fieldKey: string;
    config: FieldConfig;
    value: string;
    onChange: (key: string, value: string) => void;
    error?: string | null;
    items: SelectItem[]; // Los datos a mostrar en el selector
}

/**
 * @name FormNativePicker
 * @description Componente selector que envuelve al Picker nativo de RN.
 */
const FormNativePicker: React.FC<FormNativePickerProps> = ({
    fieldKey,
    config,
    value,
    onChange,
    error,
    items,
}) => {
    // Estado para simular el enfoque visual
    const [isFocused, setIsFocused] = useState(false);
    
    // 1. Manejar estilos de borde dinámicos
    const wrapperStyle = [
        inputStyles.inputWrapper,
        isFocused && inputStyles.inputWrapperFocused,
        error && inputStyles.inputWrapperError,
    ];

    return (
        <View style={inputStyles.container}>
            <Text style={inputStyles.label}>{config.label}</Text>

            {/* El contenedor se convierte en el área de toque del Picker */}
            <View style={wrapperStyle}>
                
                {/* Ícono principal (a la izquierda) */}
                <Icon 
                    name={config.icon} 
                    size={20} 
                    color={error ? inputStyles.inputWrapperError.borderColor : inputStyles.fieldIcon.color} 
                    style={inputStyles.icon} 
                />
                
                {/* El Picker Nativo */}
                <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => {
                        if (itemValue) {
                            onChange(fieldKey, itemValue as string);
                        }
                    }}
                    // Estilos que hacen que el Picker parezca un Input de texto
                    style={Platform.OS === 'android' ? styles.androidPicker : styles.iosPicker}
                    itemStyle={styles.pickerItem}
                    mode="dropdown" // Modo Android
                >
                    {/* Opción de Placeholder (debe ser el primer ítem) */}
                    <Picker.Item 
                        label={config.placeholder} 
                        value="" 
                        color={inputStyles.placeholderText.color}
                        key="placeholder"
                    />

                    {/* Las opciones reales */}
                    {items.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </Picker>
                
                {/* Ícono de confirmación (a la derecha) */}
                {!error && value.length > 0 && (
                    <Icon name="checkmark-circle" size={20} style={inputStyles.checkIcon} />
                )}
            </View>

            {/* Mensaje de Error */}
            {error && <Text style={inputStyles.errorText}>{error}</Text>}
        </View>
    );
};

// Estilos específicos para el Picker (para forzar la apariencia de Input)
const styles = StyleSheet.create({
    // Estilo general para iOS
    iosPicker: {
        flex: 1, 
        marginLeft: 10,
    },
    // Estilo para Android (ocupa todo el espacio restante)
    androidPicker: {
        flex: 1, 
        marginLeft: -10, // Ajuste para compensar el padding nativo
        height: 50, // Ajuste de altura
        color: inputStyles.input.color,
    },
    pickerItem: {
        // Puedes agregar estilos específicos para los ítems del picker si es necesario.
    }
});

export default FormNativePicker;