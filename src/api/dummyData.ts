// src/api/dummyData.ts

import { User } from '../types/user'; // Importamos el tipo que definimos

/**
 * @name DUMMY_USERS
 * @description Datos quemados para simular la respuesta de la API de lista de usuarios.
 * Usaremos estos datos hasta que conectemos la API real.
 */
let DUMMY_USERS: User[] = [
    {
        id: '60d0fe4f5311236168a109ca',
        title: 'ms',
        firstName: 'Sara Sofía',
        lastName: 'Andersen Toro',
        picture: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '60ddfs0fe4f5311236168a10s9ca',
        title: 'ms',
        firstName: 'Sara Sofía 2',
        lastName: 'Andersen Toro',
        picture: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '60d0fe4f5311236168sa109cb',
        title: 'mr',
        firstName: 'Ricardo',
        lastName: 'Martínez Vargas',
        picture: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: '60d0fe4f5311s236168a109cc',
        title: 'dr',
        firstName: 'Elsa',
        lastName: 'Gómez Prada',
        picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: '60d0fe4f531f120036168a109ca',
        title: 'ms',
        firstName: 'Sara Sofía',
        lastName: 'Andersen Toro',
        picture: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '60d0fe4f53112361680g0a109cb',
        title: 'mr',
        firstName: 'Ricardo',
        lastName: 'Martínez Vargas',
        picture: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: '60d0fe4f531123616800a1h09cc',
        title: 'dr',
        firstName: 'Elsa',
        lastName: 'Gómez Prada',
        picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
];

/**
 * @name fetchDummyUsers
 * @description Simula la obtención de la lista de usuarios con un retraso.
 * @returns {Promise<User[]>} Una promesa que resuelve con la lista actual de usuarios.
 */
export const fetchDummyUsers = (): Promise<User[]> => {
    return new Promise(resolve => {
        // Retraso de 1000ms para simular carga
        setTimeout(() => {
            resolve([...DUMMY_USERS]); // Retorna una copia de la lista actual
        }, 300);
    });
};

/**
 * @name deleteUserFromDummyData
 * @description Elimina un usuario del array harcodeado y retorna la nueva lista.
 * @param userId El ID del usuario a eliminar.
 * @returns {User[]} El nuevo array de usuarios.
 */
export const deleteUserFromDummyData = (userId: string): User[] => {
    // Filtra el array, manteniendo solo los usuarios cuyo ID NO coincide con el ID a eliminar.
    DUMMY_USERS = DUMMY_USERS.filter(user => user.id !== userId);
    return [...DUMMY_USERS];
};