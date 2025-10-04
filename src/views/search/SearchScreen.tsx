// src/views/search/SearchScreen.tsx (MODIFICACIÓN PARA MOSTRAR EL ID)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// DEFINIMOS PROPIEDADES: Ahora puede recibir el ID
interface SearchScreenProps {
  userId: string | null;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#176D6C',
    textAlign: 'center',
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

/**
 * @name SearchScreen
 * @description Vista de Detalle temporal. Recibe y muestra el ID del usuario seleccionado.
 */
const SearchScreen: React.FC<SearchScreenProps> = ({ userId }) => (
  <View style={styles.center}>
    <Text style={styles.text}>¡Detalle de Usuario!</Text>
    <Text style={styles.text}>ID del usuario seleccionado:</Text>
    <Text style={[styles.text, styles.boldText]}>
      {userId || 'No se ha encontrado ningún usuario con ese ID'}
    </Text>
  </View>
);

export default SearchScreen;
