/* eslint-disable react-native/no-inline-styles */
// src/views/search/UserSearchView.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// IMPORTACIONES DEL PROYECTO
import { User } from '../../types/user';
import { fetchUserByDocument } from '../../api/dummyData';
import { UserSearchViewStyles as styles } from '../../styles/views/UserSearchViewStyles'; // Importamos los estilos externos
import UserDetailView from '../../views/detail/UserDetailView';

// DEFINIMOS PROPIEDADES
interface UserSearchViewProps {
  userId: string | null;
  onClearUserId: () => void;
}

/**
 * @name UserSearchView
 * @description Vista de búsqueda que permite buscar usuarios por ID y muestra su tarjeta.
 */
const UserSearchView: React.FC<UserSearchViewProps> = ({
  userId,
  onClearUserId,
}) => {
  // Estado para el texto en la barra de búsqueda
  const [searchText, setSearchText] = useState(userId || '');
  // Estado para el usuario encontrado
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @name searchForUser
   * @description Lógica para buscar el usuario por el ID/DOCUMENTO ingresado.
   */
  const searchForUser = useCallback(async (documentValue: string) => {
    // CAMBIO 2: Renombrar 'id' a 'documentValue'
    if (!documentValue) {
      setFoundUser(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // CAMBIO 3: LLAMAR A LA NUEVA FUNCIÓN fetchUserByDocument
      const user = await fetchUserByDocument(documentValue);
      if (user) {
        setFoundUser(user);
      } else {
        setFoundUser(null); // CAMBIO 4: Mensaje de error para Documento
        setError(
          `No se encontró ningún usuario con el Documento: ${documentValue}`,
        );
      }
    } catch (e) {
      setError('Ocurrió un error en la búsqueda.');
      setFoundUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ejecutamos cuando se monta la vista o cuando el userId inicial cambia.
  useEffect(() => {
    if (userId) {
      // Si hay un ID que viene de la navegación (UserListView), lo buscamos.
      searchForUser(userId);

      onClearUserId();
    }
  }, [userId, onClearUserId, searchForUser]);

  /**
   * @name handleSearchTextChange
   * @description Actualiza el texto de búsqueda y limpia los resultados si la barra está vacía.
   * @param text El nuevo valor del input.
   */
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);

    if (text.trim() === '') {
      setFoundUser(null);
      setError(null);
    }
  };

  // Función de búsqueda manual (al presionar Enter/Submit en el teclado)
  const handleSubmitSearch = () => {
    searchForUser(searchText);
  };

  /**
   * @name renderUserCard
   * @description Renderiza el componente completo de Detalle de Usuario si se encuentra.
   */
  const renderUserCard = () => {
    if (!foundUser) return null;

    // Reemplazamos el View simple con el componente UserDetailView
    return (
      // NOTA: Envolvemos UserDetailView en un View simple
      // para que no interfiera con el padding/alineación del resultsContainer
      <View style={{ flex: 1, width: '100%' }}>
        <UserDetailView user={foundUser} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* BARRA DE BÚSQUEDA (ESTÁTICA) */}
      <View style={styles.searchBar}>
        <Icon
          name="search"
          size={20}
          color={styles.searchIcon.color}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar por documento de usuario..."
          placeholderTextColor={styles.idText.color}
          value={searchText}
          onChangeText={handleSearchTextChange}
          onSubmitEditing={handleSubmitSearch}
          returnKeyType="search"
        />
      </View>

      {/* CONTENIDO PRINCIPAL / RESULTADOS */}
      <View style={styles.resultsContainer}>
        {isLoading && (
          <ActivityIndicator size="large" color={styles.avatar.borderColor} />
        )}

        {error && !isLoading && (
          <Text style={[styles.messageText, styles.errorText]}>{error}</Text>
        )}

        {renderUserCard()}

        {!foundUser && !isLoading && !error && (
          <Text style={styles.messageText}>
            Ingresa un número de documento en la barra para buscar un usuario.
          </Text>
        )}
      </View>
    </View>
  );
};

export default UserSearchView;
