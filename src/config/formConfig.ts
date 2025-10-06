// src/config/formConfig.ts 

import { UserCreatePayload } from "../types/user";



// Definimos la estructura de la configuración de un campo
interface ValidationRules {
    isOneOf: any;
    required?: boolean;
    minLength?: number;
    isEmail?: boolean;
    isNumeric?: boolean;
    isPhone?: boolean;
    isDate?: boolean;
}

export interface FieldConfig {
    label: string;
    icon: string;
    placeholder: string;
    keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    validation: ValidationRules;
    type?: 'text' | 'select' | 'date'; // Para campos especiales (e.g., dateOfBirth, gender)
    options?: { label: string, value: string }[]; // Para campos tipo 'select'
}

// Opciones de Título para el Dropdown
export const TITLE_OPTIONS = [
    { label: 'Señor (Mr)', value: 'mr' },
    { label: 'Señora (Ms)', value: 'ms' },
    { label: 'Señora (Mrs)', value: 'mrs' },
    { label: 'Señorita (Miss)', value: 'miss' },
];

// Opciones de Género para el Dropdown
export const GENDER_OPTIONS = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
    { label: 'Otro', value: 'other' },
];

// Valores válidos para validaciones adicionales
export const VALID_TITLES = ['mr', 'ms', 'mrs', 'miss'];
export const VALID_GENDERS = ['male', 'female', 'other'];



// Configuración de todos los campos del formulario
export const USER_FORM_CONFIG: Record<keyof UserCreatePayload, FieldConfig> = {
    // 1. TÍTULO (Select)
    title: {
        label: 'Título',
        icon: 'person-circle-outline',
        // Mensaje guía en el placeholder
        placeholder: 'Ingresa mr, ms, mrs o miss (ej: mr)',
        type: 'text',
        validation: {
            required: true,
            isOneOf: VALID_TITLES,
        },
        keyboardType: "default"
    },
    // 2. NOMBRES (Input)
    firstName: {
        label: 'Nombres',
        icon: 'person-outline',
        placeholder: 'Ej: Ana Sofía',
        keyboardType: 'default',
        validation: {
            required: true, minLength: 2,
            isOneOf: undefined
        },
    },
    // 3. APELLIDOS (Input)
    lastName: {
        label: 'Apellidos',
        icon: 'person-outline',
        placeholder: 'Ej: Pérez García',
        keyboardType: 'default',
        validation: {
            required: true, minLength: 2,
            isOneOf: undefined
        },
    },
    // 4. DOCUMENTO (Input Numérico)
    document: {
        label: 'Documento',
        icon: 'id-card-outline',
        placeholder: 'Ej: 1020304050',
        keyboardType: 'numeric',
        validation: {
            required: true, isNumeric: true, minLength: 5,
            isOneOf: undefined
        },
    },
    // 5. CORREO (Input Email)
    email: {
        label: 'Correo electrónico',
        icon: 'mail-outline',
        placeholder: 'Ej: correo@finanzauto.com',
        keyboardType: 'email-address',
        validation: {
            required: true, isEmail: true,
            isOneOf: undefined
        },
    },
    // 6. TELÉFONO (Input Teléfono)
    phone: {
        label: 'Teléfono',
        icon: 'call-outline',
        placeholder: 'Ej: 3123456789',
        keyboardType: 'phone-pad',
        validation: {
            required: true, isNumeric: true, minLength: 7,
            isOneOf: undefined
        },
    },
    // 7. FECHA DE NACIMIENTO (Date Picker)
    dateOfBirth: {
        label: 'Fecha de Nacimiento',
        icon: 'calendar-outline',
        placeholder: 'DD/MM/YYYY',
        type: 'date', // Se mantiene el tipo date
        validation: {
            required: true, isDate: true,
            isOneOf: undefined
        },
        keyboardType: "default"
    },
    // 8. GÉNERO (Select)
    gender: {
        label: 'Género',
        icon: 'male-female-outline',

        placeholder: 'Ingresa male, female, u other (ej: female)',
        type: 'text',
        validation: {
            required: true,
            isOneOf: VALID_GENDERS,
        },
        keyboardType: "default"
    },
    // 9. PICTURE (No visible en la UI, usaremos un valor por defecto)
    picture: {
        label: 'Foto de Perfil',
        icon: 'camera-outline',
        placeholder: 'URL de imagen (opcional)',
        keyboardType: 'default',
        validation: {
            required: false,
            isOneOf: undefined
        }, // No requerido para el MVP
        //|| 'https://randomuser.me/api/portraits/lego/1.jpg';
    }
};