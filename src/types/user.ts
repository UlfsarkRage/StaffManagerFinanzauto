// src/types/user.ts

/**
 * @name User
 * @description Define la estructura de datos del usuario, basándonos
 * en los campos que necesitamos mostrar en la Tarjeta (Imagen 1).
 */
export interface User {
  id: string; // El ID es necesario para el CRUD y el detalle
  title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr'; // Título de cortesía
  firstName: string;
  lastName: string;
  picture: string; // URL de la imagen de perfil
}