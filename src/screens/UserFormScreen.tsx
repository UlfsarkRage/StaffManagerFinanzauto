// src/screens/UserFormScreen.tsx

import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * @name UserFormScreen
 * @description Pantalla para crear un nuevo usuario o editar uno existente (Imagen 4).
 * Es un placeholder para la navegación.
 */
const UserFormScreen: React.FC = () => {
  return (
    // SafeAreaView para respetar las áreas de la pantalla
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
            ¡Registro/Edición Listo!
        </Text>
        <Text style={styles.subtitle}>
            Aquí construiremos la lógica del formulario.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#176D6C',
  },
  subtitle: {
    fontSize: 16,
    color: '#4D4D4D',
  }
});

export default UserFormScreen;