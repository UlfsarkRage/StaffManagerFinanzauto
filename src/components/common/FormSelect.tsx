// src/components/common/FormSelect.tsx 

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Ionicons';

// IMPORTACIONES DEL PROYECTO
import { FormInputStyles as styles } from '../../styles/components/FormInputStyles';
import { FieldConfig } from '../../config/formConfig';

// Define el formato de los ítems del selector
interface SelectItem {
    label: string;
    value: string;
}

// Propiedades que recibirá nuestro componente
interface FormSelectProps {
    fieldKey: string;
    config: FieldConfig;
    value: string;
    onChange: (key: string, value: string) => void;
    error?: string | null;
    items: SelectItem[]; // Los datos a mostrar en el selector
}


const ChevronIcon = () => {
    // Icono de flecha del Dropdown (Ionicon: chevron-down)
    return <Icon name="chevron-down" size={20} color={styles.placeholderText.color} />;
};

/**
 * @name FormSelect
 * @description Componente selector de formulario que envuelve RNPickerSelect, 
 * utilizando los estilos de FormInput y manejando el estado de error.
 */
const FormSelect: React.FC<FormSelectProps> = ({
    fieldKey,
    config,
    value,
    onChange,
    error,
    items,
}) => {
    // Estado para manejar el enfoque visual
    const [isFocused, setIsFocused] = useState(false);
    
    // 1. Manejar estilos de borde dinámicos
    const wrapperStyle = [
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError,
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{config.label}</Text>

            <View style={wrapperStyle}>
                {/* Ícono principal */}
                <Icon 
                    name={config.icon} 
                    size={20} 
                    color={error ? styles.inputWrapperError.borderColor : styles.fieldIcon.color} 
                    style={styles.icon} 
                />
                
                {/* El Picker Select */}
                <RNPickerSelect
                    onValueChange={(newValue) => {
                        if (newValue) {
                            onChange(fieldKey, newValue);
                        }
                    }}
                    items={items}
                    value={value || null} // Asegurar que sea null si está vacío para mostrar el placeholder
                    placeholder={{ 
                        label: config.placeholder, 
                        value: null,
                        color: styles.placeholderText.color,
                    }}
                    useNativeAndroidPickerStyle={false} // Asegura estilo consistente
                    fixAndroidTouchableBug={true}
                    style={{
                        inputIOS: styles.input,
                        inputAndroid: styles.input,
                        // El estilo del placeholder es vital para que se vea bien
                        placeholder: styles.placeholderText,
                        iconContainer: {
                            top: 15, // Ajusta el icono de flecha del picker
                            right: 15,
                        },
                    }}
                    // Simular enfoque
                    onOpen={() => setIsFocused(true)}
                    onClose={() => setIsFocused(false)}
                    // Usar el componente de ícono definido externamente
                    Icon={ChevronIcon} 
                />


                {/* Ícono de confirmación */}
                {!error && value.length > 0 && (
                    <Icon name="checkmark-circle" size={20} style={styles.checkIcon} />
                )}
            </View>

            {/* Mensaje de Error */}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default FormSelect;