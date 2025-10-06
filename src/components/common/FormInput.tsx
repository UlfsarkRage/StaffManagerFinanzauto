// src/components/common/FormInput.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardTypeOptions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// IMPORTACIONES DEL PROYECTO
import { FormInputStyles as styles } from '../../styles/components/FormInputStyles';
import { FieldConfig } from '../../config/formConfig'; 

// Propiedades que recibirá nuestro componente reutilizable
interface FormInputProps {
    fieldKey: string;
    config: FieldConfig; // Configuración de validación, label, icon
    value: string;
    onChange: (key: string, value: string) => void;
    error?: string | null;
    onPress?: () => void; // Para manejar la acción de Select/Date Picker
    editable?: boolean;
}

/**
 * @name FormInput
 * @description Componente reutilizable para campos de formulario. Maneja la UI de texto, icono,
 * label, estado de enfoque y estado de error según la configuración dinámica.
 */
const FormInput: React.FC<FormInputProps> = ({
    fieldKey,
    config,
    value,
    onChange,
    error,
    onPress,
    editable = true,
}) => {
    // Estado para manejar el enfoque visual
    const [isFocused, setIsFocused] = useState(false);
    
    // Obtener propiedades del config
    const { label, icon, placeholder, keyboardType, type } = config;

    // 1. Manejar estilos de borde dinámicos
    const wrapperStyle = [
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError,
    ];

    // 2. Renderizar el input (TextInput, Select, o Date)
    const renderInputContent = () => {
        
        // --- Campos de SELECCIÓN o FECHA (simulamos la entrada) ---
        if (type === 'select' || type === 'date') {
            return (
                <TouchableOpacity 
                    style={styles.input} 
                    onPress={onPress} 
                    disabled={!editable}
                >
                    <Text 
                        style={[styles.selectText, !value && styles.placeholderText]}
                        numberOfLines={1}
                    >
                        {value || placeholder}
                    </Text>
                </TouchableOpacity>
            );
        }

        // --- Campos de TEXTO (por defecto) ---
        return (
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={styles.placeholderText.color}
                value={value}
                onChangeText={(text) => onChange(fieldKey, text)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType={keyboardType as KeyboardTypeOptions}
                editable={editable}
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* Label (Se muestra solo si hay valor o si está enfocado, aunque la visibilidad total la definimos con el config) */}
            <Text style={styles.label}>{label}</Text>

            <View style={wrapperStyle}>
                {/* Ícono de Ionicons */}
                <Icon 
                    name={icon} 
                    size={20} 
                    // El color del ícono puede cambiar con el error/foco para mejor UX
                    color={error ? styles.inputWrapperError.borderColor : styles.fieldIcon.color} 
                    style={styles.icon} 
                />
                
                {/* Contenido del Input (TextInput o TouchableOpacity para Select/Date) */}
                {renderInputContent()}

                {/* Ícono de confirmación (Si no hay error y si tiene un valor) */}
                {!error && value.length > 0 && (
                    <Icon name="checkmark-circle" size={20} style={styles.checkIcon} />
                )}
            </View>

            {/* Mensaje de Error */}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default FormInput;