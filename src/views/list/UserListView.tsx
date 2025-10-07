// src/views/list/UserListView.tsx 

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,

} from 'react-native';

import { UserListViewStyles as styles } from '../../styles/views/UserListViewStyles';

import UserCard from '../../components/cards/UserCard';
import CustomSpinner from '../../components/common/CustomSpinner';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import { fetchdummyUsers, deleteUserFromDummyData } from '../../api/dummyData';
import { fetchAllUsers } from '../../api/endpointsDJango'; 
import { User } from '../../types/user';

// DEFINICIÓN DE PROPIEDADES
interface UserListViewProps {
    onUserDetail: (userId: string) => void;
}

/**
 * @name UserListView
 * @description COMPONENTE DE VISTA: Muestra la lista de usuarios y maneja el borrado.
 */
const UserListView: React.FC<UserListViewProps> = ({ onUserDetail }) => {
  // Acepta la prop
  // ESTADO: Almacena la lista de usuarios y el estado de carga
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // NUEVOS ESTADOS para el modal de eliminación
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  /**
   * @name loadUsers
   * @description Carga la lista de usuarios desde la API simulada.
   */
  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    const fetchedUsers = await fetchdummyUsers();
    setUsers(fetchedUsers);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /**
   * @name loadUsersAPI
   * @description Carga la lista de usuarios desde la API de Django.
   */
  const loadUsersAPI = useCallback(async () => {
    setIsLoading(true);
    const fetchedUsers = await fetchAllUsers();
    setUsers(fetchedUsers);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUsersAPI();
  }, [loadUsersAPI]);

  /**
   * @name handleShowDeleteModal
   * @description Muestra el modal de confirmación con el usuario seleccionado.
   */
  const handleShowDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalVisible(true);
  };

  /**
   * @name handleDeleteConfirm
   * @description Ejecuta el borrado del usuario y refresca la lista.
   * @param userId El ID del usuario a eliminar.
   */
  const handleDeleteConfirm = (userId: string) => {
    const updatedUsers = deleteUserFromDummyData(userId);

    setUsers(updatedUsers); // Actualiza la UI con la lista filtrada
    setIsDeleteModalVisible(false); // Cierra el modal
    setUserToDelete(null); // Limpia el usuario

    // Muestra un mensaje de éxito
    Alert.alert('Éxito', '✅ Usuario eliminado correctamente.');
  };

  // Función auxiliar: Define cómo se debe renderizar cada item de la lista
  const renderItem = ({ item }: { item: User }) => (
    <UserCard
      user={item}
      onDetailPress={onUserDetail}
      // NUEVA PROP: Pasamos la función para abrir el modal
      onSwipeDelete={handleShowDeleteModal}
    />
  );

  return (
    <View style={styles.container}>
      {/* Título de la Sección */}
      <View style={styles.contentTitle}>
        <Text style={styles.sectionTitle}>Consulta y Registro de Usuarios</Text>
      </View>

      {isLoading && (
        <View style={styles.loading}>
          <CustomSpinner size={60} color="#176D6C" />
        </View>
      )}

      <View style={styles.contentWorkers}>
        {!isLoading && (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
      {/* MODAL DE CONFIRMACIÓN */}
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        userToDelete={userToDelete}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />
    </View>
  );
};

export default UserListView;


