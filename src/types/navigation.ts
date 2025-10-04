// src/types/navigation.ts

// Define los nombres de las rutas principales y los parámetros que esperan
export type RootStackParamList = {
  UserList: undefined; // La pantalla principal no necesita parámetros
  UserDetail: { userId: string }; // Necesita el ID para mostrar la información (Imagen 3)
  UserForm: { userId?: string }; // Puede tener un ID para Editar (PUT) o ninguno para Crear (POST)
};