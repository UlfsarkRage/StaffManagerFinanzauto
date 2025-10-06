// src/components/UserCard.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { User } from '../../types/user';
import { UserCardStyles as styles } from '../../styles/components/UserCardStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface UserCardProps {
  user: User;
  onDetailPress: (userId: string) => void;
  onSwipeDelete: (user: User) => void; 
}

/**
 * @name UserCard
 * @description Componente de tarjeta reutilizable con Swipeable para eliminación.
 */
const UserCard: React.FC<UserCardProps> = ({
  user,
  onDetailPress,
  onSwipeDelete,
}) => {
  
  const [isClicked, setIsClicked] = useState(false);
  const swipeableRef = React.useRef<Swipeable>(null);

  /**
   * @name handlePress
   * @description Maneja el evento de presión de la tarjeta y aplica el retraso.
   */
  const handlePress = () => {
   
    setIsClicked(true);

    
    setTimeout(() => {
    
      onDetailPress(user.id);

    }, 300);
  };

  /**
   * @name renderRightActions
   * @description Renderiza la acción de "eliminar" que aparece al deslizar de derecha a izquierda.
   * @param progress Progreso de la acción de deslizamiento.
   * @param dragX Posición de arrastre en el eje X.
   */
  const renderRightActions = (
    
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    // Define el rango para que el botón se "agrandee" mientras se desliza
    const scale = dragX.interpolate({
      inputRange: [-100, 0], // Mueve desde -100px (abierto) hasta 0px (cerrado)
      outputRange: [1, 0], // Escala de 1 (visible) a 0 (invisible)
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        style={componentStyles.deleteAction}
        onPress={() => {
          onSwipeDelete(user); // Abre el modal de confirmación
          swipeableRef.current?.close(); // Cierra el swipeable inmediatamente
        }}
      >
        <Animated.View
          style={[
            componentStyles.deleteIconContainer,
            { transform: [{ scale }] },
          ]}
        >
          <Icon name="trash-can-outline" size={30} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  //Estilo principal de la tarjeta, cambia si está "clickeada" o no
  const cardStyle = ({ pressed }: { pressed: boolean }) => [
    styles.cardContainer,
    isClicked ? styles.cardFocus : styles.cardDefault,

    pressed && !isClicked ? { opacity: 0.8 } : {},
  ];

  return (
    <Swipeable
      ref={swipeableRef}
      // Mínima distancia para que se dispare la acción
      renderRightActions={renderRightActions}
      rightThreshold={50}
      
      overshootRight={false}
    >
      <Pressable onPress={handlePress} style={cardStyle} disabled={isClicked}>
        {/* 1. Contenedor de la Imagen */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: user.picture || 'https://via.placeholder.com/150',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* 2. Contenedor de Texto y Link */}
        <View style={styles.textContainer}>
          <Text style={styles.nameText} numberOfLines={2}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.idText}>ID: {user.id}</Text>

          <View style={styles.detailLinkContainer}>
            <Text style={styles.detailText}>Ver detalle </Text>
            <Icon name="chevron-right" style={styles.detailIcon} />
          </View>
        </View>
      </Pressable>
    </Swipeable>
  );
};

// Estilos específicos para la acción de deslizar
const componentStyles = StyleSheet.create({
  deleteAction: {
    backgroundColor: '#D32F2F', 
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 15,
    justifyContent: 'center',
   
    height: 'auto',
  },
  deleteIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserCard;
