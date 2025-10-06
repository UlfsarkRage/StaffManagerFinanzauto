// src/types/user.ts 

// Interfaz para los datos que retorna la API
export interface User {
    id: string;
    title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | ''; 
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other' | ''; 
    email: string;
    dateOfBirth: string; 
    phone: string;
    picture: string;
    document: string; 
    location?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        timezone?: string;
    };
}

// Interfaz para los datos que se envían a la API al crear (payload)

export interface UserCreatePayload {
    title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | '';
    firstName: string;
    lastName: string;
    gender: 'male' | 'female' | 'other' | '';
    email: string;
    dateOfBirth: string;
    phone: string;
    picture: string;
    document: string; 
}

interface ValidationRules {
    required?: boolean;
    minLength?: number;
    isEmail?: boolean;
    isNumeric?: boolean;
    // --- AÑADIR ESTA PROPIEDAD ---
    isOneOf?: string[]; // La regla isOneOf espera un array de strings (los valores válidos)
}

export interface FieldConfig {
    label: string;
    icon: string;
    placeholder: string;
    type: 'text' | 'email' | 'password' | 'phone' | 'date'; // Asegúrate de que no tenga 'select'
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    validation: ValidationRules; // Ahora ValidationRules contiene isOneOf
}