// src/utils/formValidator.ts 

import { UserCreatePayload } from '../types/user';
import { USER_FORM_CONFIG } from '../config/formConfig'; // Importar FieldConfig para tipado


/**
 * @name validateForm
 * @description Itera sobre todos los campos, ejecuta las reglas de validación y retorna un objeto con todos los errores.
 * @param formData El objeto completo del formulario (payload).
 * @returns {Record<keyof UserCreatePayload, string | null>} Un mapa de errores por campo.
 */
export const validateForm = (formData: UserCreatePayload): Record<keyof UserCreatePayload, string | null> => {
    let errors = {} as Record<keyof UserCreatePayload, string | null>;

    // Iterar sobre todas las claves del payload
    for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {

            const fieldKey = key as keyof UserCreatePayload;
            const value = formData[fieldKey] as string; // Asumimos que todos los valores del payload son strings
            const config = USER_FORM_CONFIG[fieldKey];

            // Si no hay configuración para la clave (ej. si UserCreatePayload tiene más campos que la config), saltar.
            if (!config) {
                continue;
            }

            const rules = config.validation;

            // 1. Comprobar REQUIRED
            if (rules.required && (!value || value.trim() === '')) {
                errors[fieldKey] = `El campo ${config.label} es obligatorio.`;
                continue;
            }

            // Si no es obligatorio y está vacío, salimos de la validación para este campo
            if (!value || value.trim() === '') {
                errors[fieldKey] = null;
                continue;
            }

            // 2. Comprobar MIN LENGTH
            if (rules.minLength && value.length < rules.minLength) {
                errors[fieldKey] = `${config.label} debe tener al menos ${rules.minLength} caracteres.`;
                continue;
            }

            // 3. Comprobar EMAIL
            if (rules.isEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errors[fieldKey] = `Ingresa un formato de correo electrónico válido.`;
                    continue;
                }
            }

            // 4. Comprobar NUMERIC
            if (rules.isNumeric || config.keyboardType === 'phone-pad') {
                const numericRegex = /^\d+$/;
                if (!numericRegex.test(value)) {
                    errors[fieldKey] = `El campo ${config.label} solo debe contener números.`;
                    continue;
                }
            }

            // 5. Comprobar IS ONE OF (Whitelist para Título y Género)
            if (rules.isOneOf && value) {
                // El valor debe estar en el array de opciones (validamos en minúsculas)
                if (Array.isArray(rules.isOneOf) && !rules.isOneOf.includes(value.toLowerCase())) {
                    errors[fieldKey] = `El valor no es válido. Debe ser uno de: ${rules.isOneOf.join(', ')}.`;
                    continue;
                }
            }

            // Si pasa todas las reglas
            errors[fieldKey] = null;
        }
    }

    return errors;
};