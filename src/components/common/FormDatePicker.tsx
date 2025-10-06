// src/components/common/FormDatePicker.tsx 

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

// IMPORTACIONES DEL PROYECTO
import { FormInputStyles as styles } from '../../styles/components/FormInputStyles';
import { FieldConfig } from '../../config/formConfig';

// Propiedades que recibirá nuestro componente
interface FormDatePickerProps {
    fieldKey: string;
    config: FieldConfig;
    value: string; // La fecha se maneja como string (YYYY-MM-DD) en el estado del formulario
    onChange: (key: string, value: string) => void;
    error?: string | null;
}

/**
 * @name FormDatePicker
 * @description Componente para seleccionar fechas usando el picker nativo, integrado 
 * con los estilos de FormInput.
 */
const FormDatePicker: React.FC<FormDatePickerProps> = ({
    fieldKey,
    config,
    value,
    onChange,
    error,
}) => {
    // Estado para controlar la visibilidad del picker nativo
    const [showPicker, setShowPicker] = useState(false);
    // Estado para simular el enfoque visual
    const [isFocused, setIsFocused] = useState(false);

    /**
     * @name handleDateChange
     * @description Maneja el cambio de fecha seleccionado por el usuario.
     */
    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // En iOS, el picker no se cierra automáticamente al hacer clic fuera
        if (Platform.OS === 'ios') {
            setShowPicker(false);
        }

        // Si se cancela la selección (iOS) o si no hay fecha, salimos
        if (event.type === 'dismissed' || !selectedDate) {
            setShowPicker(false);
            setIsFocused(false);
            return;
        }

        const currentDate = selectedDate;

        // Formatear la fecha a YYYY-MM-DD para el payload (simple y consistente)
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        onChange(fieldKey, formattedDate);
        setShowPicker(false); // Cerrar el picker
        setIsFocused(false);
    };

    /**
     * @name showDatepicker
     * @description Muestra el picker de fecha y simula el enfoque.
     */
    const showDatepicker = () => {
        setIsFocused(true);
        setShowPicker(true);
    };

    // 1. Manejar estilos de borde dinámicos
    const wrapperStyle = [
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError,
    ];
    
    // 2. Determinar la fecha a mostrar en el picker (usa la fecha del estado o la fecha actual)
    const displayDate = value ? new Date(value) : new Date();

    // 3. Formatear la fecha para mostrar en el input de texto (DD/MM/YYYY)
    const formattedText = value 
        ? new Date(value).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : config.placeholder;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{config.label}</Text>

            {/* TouchableOpacity que simula el input */}
            <TouchableOpacity 
                style={wrapperStyle}
                onPress={showDatepicker}
                activeOpacity={0.8}
            >
                {/* Ícono principal */}
                <Icon 
                    name={config.icon} 
                    size={20} 
                    color={error ? styles.inputWrapperError.borderColor : styles.fieldIcon.color} 
                    style={styles.icon} 
                />

                {/* Texto de la fecha seleccionada/placeholder */}
                <Text 
                    style={[styles.selectText, !value && styles.placeholderText]}
                    numberOfLines={1}
                >
                    {formattedText}
                </Text>

                {/* Ícono de confirmación */}
                {!error && value.length > 0 && (
                    <Icon name="checkmark-circle" size={20} style={styles.checkIcon} />
                )}
            </TouchableOpacity>

            {/* Mensaje de Error */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Picker de fecha nativo */}
            {showPicker && (
                <DateTimePicker
                    value={displayDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Diferentes estilos para iOS y Android
                    onChange={handleDateChange}
                    // Opcional: Restringir la fecha a una fecha de nacimiento razonable (e.g., no futuro)
                    maximumDate={new Date()} 
                />
            )}
        </View>
    );
};

export default FormDatePicker;