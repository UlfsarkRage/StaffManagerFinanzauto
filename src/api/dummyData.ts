// src/api/dummyData.ts

import { User } from '../types/user'; // Importamos el tipo que definimos

/**
 * @name DUMMY_USERS
 * @description Datos quemados para simular la respuesta de la API de lista de usuarios.
 * Usaremos estos datos hasta que conectemos la API real.
 */
export const DUMMY_USERS: User[] = [
    {
        id: '60d0fe4f5311236168a109ca',
        title: 'ms',
        firstName: 'Sara Sofía',
        lastName: 'Andersen Toro',
        picture: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '60d0fe4f5311236168a109cb',
        title: 'mr',
        firstName: 'Ricardo',
        lastName: 'Martínez Vargas',
        picture: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: '60d0fe4f5311236168a109cc',
        title: 'dr',
        firstName: 'Elsa',
        lastName: 'Gómez Prada',
        picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
        id: '60d0fe4f531120036168a109ca',
        title: 'ms',
        firstName: 'Sara Sofía',
        lastName: 'Andersen Toro',
        picture: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '60d0fe4f531123616800a109cb',
        title: 'mr',
        firstName: 'Ricardo',
        lastName: 'Martínez Vargas',
        picture: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
        id: '60d0fe4f531123616800a109cc',
        title: 'dr',
        firstName: 'Elsa',
        lastName: 'Gómez Prada',
        picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
];

/**
 * @name fetchDummyUsers
 * @description Función asíncrona simulada para obtener los usuarios.
 * Simula una llamada a la API.
 */
export const fetchDummyUsers = async (): Promise<User[]> => {
    // SIMULACIÓN: Podrías añadir un delay para simular la latencia de la red
    await new Promise<void>(resolve => setTimeout(() => resolve(), 5000));
    return DUMMY_USERS;
};