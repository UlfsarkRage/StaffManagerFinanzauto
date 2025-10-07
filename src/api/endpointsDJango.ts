// src/api/endpointsDJango.ts

import { User, UserCreatePayload } from '../types/user';

// URL BASE de tu API de Django hospedada
// Reemplaza esto con la URL base de tu proyecto (ej: 'http://127.0.0.1:8000/api' o tu dominio en PythonAnywhere)
// Usaré el dominio que mencionaste para fines de ejemplo.
const API_BASE = 'https://ulfsark.pythonanywhere.com/api'; 

/**
 * @name fetchAllUsers
 * @description Obtiene la lista completa de usuarios (o la primera página con paginación).
 * Se asume que este endpoint devuelve un array de usuarios resumidos (UserListSerializer).
 *
 * NOTA: El endpoint de Django devuelve un objeto con { data: [...], total: ... } al usar paginación.
 * Esta función extrae el array 'data'.
 *
 * @param {number} page El número de página a solicitar (por defecto 1).
 * @param {number} limit El número de elementos por página (por defecto 20).
 * @returns {Promise<User[]>} Una promesa que resuelve con el array de usuarios.
 */
export const fetchAllUsers = async (page: number = 1, limit: number = 20): Promise<User[]> => {
    try {
        const url = `${API_BASE}/Users/?page=${page}&limit=${limit}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al cargar lista. Estado: ${response.status}`);
        }

        const jsonResponse = await response.json();

        // El backend devuelve { data: [users], total: X }. Devolvemos solo el array de 'data'.
        // Si no hay 'data' (ej. endpoint sin paginación), devolvemos el JSON completo.
        return Array.isArray(jsonResponse.data) ? jsonResponse.data : jsonResponse;

    } catch (e) {
        console.error('Error en fetchAllUsers:', e);
        // Devolvemos un array vacío en caso de fallo para evitar que la lista se rompa.
        return [];
    }
};

// --------------------------------------------------------------------------------------

/**
 * @name fetchUserByDocument
 * @description Busca un único usuario por su Documento, aprovechando la configuración de Django.
 * Esta es la implementación eficiente que reemplaza la búsqueda compleja.
 *
 * @param {string} documentValue El número de documento a buscar.
 * @returns {Promise<User | undefined>} El objeto User completo o undefined si no se encuentra (404) o hay error.
 */
export const fetchUserByDocumentAPI = async (documentValue: string): Promise<User | undefined> => {
    try {
        // La URL utiliza el documento como el parámetro de detalle (como en: /api/Users/0000000000/).
        const url = `${API_BASE}/Users/${encodeURIComponent(documentValue)}/`;
        const response = await fetch(url);

        // Si la respuesta es 404 (Not Found) o cualquier otro error, manejamos la falla.
        if (response.status === 404) {
             // Es un 404, significa que el documento no existe.
             return undefined;
        }

        if (!response.ok) {
            // Cualquier otro error HTTP (500, 400, etc.)
            throw new Error(`Búsqueda fallida. Estado: ${response.status}`);
        }

        // Retorna los datos JSON (el UserDetailSerializer)
        return await response.json();

    } catch (e) {
        console.warn('Error al buscar usuario por documento:', e);
        return undefined;
    }
};

// --------------------------------------------------------------------------------------

/**
 * @name createUser
 * @description Envía una solicitud POST al backend para crear un nuevo usuario.
 *
 * @param {UserCreatePayload} payload Los datos del nuevo usuario a enviar.
 * @returns {Promise<User | undefined>} El objeto User creado (con ID) o undefined si la creación falla.
 */
export const createUser = async (payload: UserCreatePayload): Promise<User | undefined> => {
    try {
        const url = `${API_BASE}/Users/`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Convertimos el objeto JavaScript a JSON para el cuerpo de la solicitud
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            // Si hay errores de validación (ej. email repetido), Django devuelve un 400 Bad Request.
            // Es buena práctica leer el JSON de respuesta para mostrar el error específico de Django.
            const errorData = await response.json();
            console.error('Error de validación al crear usuario:', errorData);
            throw new Error('Error al crear usuario. Verifique los datos.');
        }

        // Retorna el objeto del usuario recién creado (incluye el ID generado por Django)
        return await response.json();

    } catch (e) {
        console.error('Error en createUser:', e);
        return undefined;
    }
};

// --------------------------------------------------------------------------------------

/**
 * @name deleteUser
 * @description Envía una solicitud DELETE a la API para eliminar un usuario por su ID.
 *
 * @param {string} userId El ID único (PK) del usuario a eliminar.
 * @returns {Promise<boolean>} True si la eliminación fue exitosa (HTTP 204), False si falla.
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
    try {
        // NOTA: Para eliminar se usa el ID generado por Django, no el documento.
        const url = `${API_BASE}/Users/${encodeURIComponent(userId)}/`;
        const response = await fetch(url, {
            method: 'DELETE',
        });

        // Django responde con 204 No Content en caso de éxito.
        if (response.status === 204) {
            return true;
        }

        // Cualquier otra respuesta (ej. 404 si el ID no existe) es un fallo.
        throw new Error(`Fallo al eliminar usuario. Estado: ${response.status}`);

    } catch (e) {
        console.error('Error en deleteUser:', e);
        return false;
    }
};

// --------------------------------------------------------------------------------------

/**
 * @name updateUser
 * @description Envía una solicitud PUT para reemplazar *todos* los datos de un usuario por su ID.
 * Se usa para la edición completa del perfil.
 *
 * @param {string} userId El ID del usuario a actualizar.
 * @param {UserCreatePayload} payload Los datos completos a reemplazar.
 * @returns {Promise<User | undefined>} El objeto User actualizado o undefined si falla.
 */
export const updateUser = async (userId: string, payload: UserCreatePayload): Promise<User | undefined> => {
    try {
        const url = `${API_BASE}/Users/${encodeURIComponent(userId)}/`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error de validación al actualizar:', errorData);
            throw new Error('Error al actualizar usuario. Verifique los datos.');
        }

        // Retorna el objeto actualizado
        return await response.json();

    } catch (e) {
        console.error('Error en updateUser:', e);
        return undefined;
    }
};