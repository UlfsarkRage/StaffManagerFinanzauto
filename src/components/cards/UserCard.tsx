// src/components/UserCard.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { User } from '../../types/user'; // IMPORTACIÓN: El tipo de dato para tipado fuerte
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation'; 

// TIPADO: Definimos la propiedad de navegación que vamos a usar
type UserListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserList'
>;

interface UserCardProps {
  user: User; // PROPIEDAD: El componente espera un objeto de tipo User
}

/**
 * @name UserCard
 * @description Componente modular para mostrar la información básica de un usuario en la lista (Imagen 1).
 * Incluye funcionalidad para ir a la pantalla de detalle.
 */
const UserCard: React.FC<UserCardProps> = ({ user }) => {
  // HOOKS: Obtenemos el objeto de navegación para poder cambiar de pantalla
  const navigation = useNavigation<UserListScreenNavigationProp>();

  const goToDetail = () => {
    // NAVEGACIÓN: Nos moveremos a la pantalla 'UserDetail', pasando el ID
    navigation.navigate('UserDetail', { userId: user.id });
  };

  return (
    // TouchableOpacity hace el componente clickeable y añade feedback visual al presionar
    <TouchableOpacity style={styles.card} onPress={goToDetail}>
      {/* 1. IMAGEN DE PERFIL */}
      <View style={styles.imagePlaceholder}>
        <Image 
          source={{ uri: user.picture }} // FUENTE: Usamos la URL del dummy data
          style={styles.picture} 
        />
      </View>

      <View style={styles.infoContainer}>
        {/* 2. NOMBRE COMPLETO */}
        <Text style={styles.name} numberOfLines={1}>
          {user.firstName} {user.lastName} 
        </Text>
        
        {/* 3. ID (Como en el mockup) */}
        <Text style={styles.idText}>
            ID: {user.id}
        </Text>
        
        {/* 4. ENLACE DE DETALLE */}
        <Text style={styles.detailLink}>Ver detalle </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // Horizontal
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5, // Pequeño espacio vertical entre tarjetas
    // Sombra (simulando la elevación suave del mockup)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  imagePlaceholder: {
    // Contorno y fondo gris claro del mockup
    width: 80, 
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden', // Para que la imagen no se salga del contenedor
  },
  picture: {
    width: '100%', // La imagen ocupa todo el placeholder
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E6FFE6', // Fondo verde muy claro del texto del mockup
    padding: 10,
    borderRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#176D6C', // Color oscuro para el nombre
    marginBottom: 4,
  },
  idText: {
    fontSize: 12,
    color: '#4D4D4D',
  },
  detailLink: {
    fontSize: 14,
    color: '#00A859', // Verde corporativo para enlaces
    marginTop: 8,
    fontWeight: '600',
    alignSelf: 'flex-end', // Alinea el enlace a la derecha dentro de su contenedor
  },
});

export default UserCard;