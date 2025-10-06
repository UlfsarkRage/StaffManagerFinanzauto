// src/views/detail/UserDetailView.tsx 

import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { User } from '../../types/user'; 

// IMPORTAMOS LOS ESTILOS EXTERNOS
import { UserDetailViewStyles as styles } from '../../styles/views/UserDetailViewStyles'; 

// La interfaz ya no necesita onEditPress
interface UserDetailViewProps {
    user: User;
}

/**
 * @name DetailField
 * @description Sub-componente para renderizar cada campo de información de manera uniforme.
 */
const DetailField: React.FC<{ icon: string, label: string, value: string | undefined }> = ({ icon, label, value }) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputWrapper}>
            <Icon name={icon} size={20} style={styles.fieldIcon} />
            <Text style={styles.inputValue} numberOfLines={1}>{value || 'N/A'}</Text>
            <Icon name="checkmark-circle" size={20} style={styles.checkIcon} />
        </View>
    </View>
);


/**
 * @name UserDetailView
 * @description Muestra la información completa de un usuario.
 */
const UserDetailView: React.FC<UserDetailViewProps> = ({ user }) => {
    
    // Función para obtener la URL de la imagen (usamos la picture del dummy)
    const userPicture = user.picture || 'https://randomuser.me/api/portraits/lego/1.jpg';

    return (
        <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
        >
            
            {/* ENCABEZADO (SIN BOTÓN DE EDICIÓN) */}
            <View style={styles.header}>
                <Text style={styles.title}>Información del usuario</Text>
            </View>

            {/* FOTO DE PERFIL */}
            <View style={styles.avatarContainer}>
                <Image source={{ uri: userPicture }} style={styles.avatar} resizeMode="cover" />
            </View>

            {/* TARJETA DE DETALLES */}
            <View style={styles.card}>
                <DetailField icon="key-outline" label="ID" value={user.id} />
                <DetailField icon="document-text-outline" label="Título" value={user.title} />
                <DetailField icon="create-outline" label="Nombres" value={user.firstName} />
                <DetailField icon="create-outline" label="Apellidos" value={user.lastName} />
                <DetailField icon="mail-outline" label="Email" value={user.email} />
                <DetailField icon="call-outline" label="Teléfono" value={user.phone} />
                <DetailField icon="calendar-outline" label="Fecha de Nacimiento" value={user.dateOfBirth.split('T')[0]} />
                <DetailField icon="male-female-outline" label="Género" value={user.gender} />
            </View>
            
            {/* SE ELIMINA el View con height: 100 */}

        </ScrollView>
    );
};

export default UserDetailView;