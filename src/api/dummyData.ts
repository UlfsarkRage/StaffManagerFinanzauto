// src/api/dummyData.ts

import { User, UserCreatePayload } from '../types/user'; // Importamos el tipo que definimos



const generateTempId = () => {
    // Genera un ID temporal simple (e.g., 'temp-1', 'temp-2', etc.)
    return 'temp-' + (dummyUsers.length + 1).toString(); 
};

/**
 * @name dummy_users
 * @description Datos quemados para simular la respuesta de la API de lista de usuarios.
 * Usaremos estos datos hasta que conectemos la API real.
 */
let dummyUsers: User[] = [
    {
        id: '60d0fe4f5311236168a109ca',
        title: 'mr',
        firstName: 'Juan',
        lastName: 'Pérez García',
        gender: 'male',
        email: 'juan.perez@finanzauto.com',
        dateOfBirth: '1985-06-15T10:00:00-05:00',
        phone: '3101234567',
        picture: 'https://randomuser.me/api/portraits/men/40.jpg',
        document: '1020456789', 
    },
    {
        id: '1030676727',
        title: 'ms',
        firstName: 'Sara Sofía',
        lastName: 'Andersen Toro',
        gender: 'female',
        email: 'sara.andersen@finanzauto.com',
        dateOfBirth: '1992-04-21T18:25:43-05:00',
        phone: '3124846445',
        picture: 'https://randomuser.me/api/portraits/women/12.jpg',
        document: '52190876', 
    }
];

/**
 * @name fetchdummyUsers
 * @description 
 * @returns {Promise<User[]>} 
 */
export const fetchdummyUsers = (): Promise<User[]> => {
    return new Promise(resolve => {
        // Retraso de 300ms para simular peticion a endpoint
        setTimeout(() => {
            resolve([...dummyUsers]);
        }, 300);
    });
};

/**
 * @name deleteUserFromDummyData
 * @description 
 * @param userId 
 * @returns {User[]} 
 */
export const deleteUserFromDummyData = (userId: string): User[] => {

    dummyUsers = dummyUsers.filter(user => user.id !== userId);
    return [...dummyUsers];
};


/**
 * @name fetchUserById
 * @description Simula la obtención de un único usuario por su ID.
 * @param userId El ID del usuario a buscar.
 * @returns {Promise<User | undefined>} Una promesa que resuelve con el usuario o undefined.
 */
export const fetchUserById = (userId: string): Promise<User | undefined> => {
    return new Promise(resolve => {
        // Retraso de 300ms para simular una búsqueda rápida
        setTimeout(() => {
            const user = dummyUsers.find(u => u.id === userId);
            resolve(user);
        }, 300);
    });
};


/**
 * @name addUserToDummyData
 * @description Simula la creación de un nuevo usuario (POST) y lo añade a la lista local.
 * @param payload Los datos del nuevo usuario.
 * @returns {Promise<User>} Una promesa que resuelve con el usuario creado (con ID asignado).
 */
export const addUserToDummyData = (payload: UserCreatePayload): Promise<User> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const newUser: User = {
                ...payload,
                id: generateTempId(), // Asignar un ID temporal
            };
            
            // Añadir el nuevo usuario a la lista
            dummyUsers.push(newUser);
            
            console.log('Usuario dummy agregado:', newUser.id);
            resolve(newUser);
        }, 500); // Simular un retraso de red
    });
};