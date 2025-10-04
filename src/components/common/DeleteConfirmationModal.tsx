// src/components/common/DeleteConfirmationModal.tsx

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../../types/user';

interface DeleteConfirmationModalProps {
    isVisible: boolean;
    userToDelete: User | null; // El usuario que está siendo considerado para la eliminación
    onClose: () => void;
    onConfirm: (userId: string) => void;
}

/**
 * @name DeleteConfirmationModal
 * @description Modal que pide confirmación al usuario antes de eliminar una tarjeta.
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isVisible,
    userToDelete,
    onClose,
    onConfirm,
}) => {
    
    // Si no hay usuario, no se renderiza nada (o se renderiza solo el modal invisible)
    if (!userToDelete) return null;

    const handleConfirm = () => {
        // Llama a la función de borrado con el ID del usuario
        onConfirm(userToDelete.id);
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Confirmar Eliminación</Text>
                    
                    <Text style={styles.modalText}>
                        ¿Estás seguro de que deseas eliminar a 
                        <Text style={styles.userNameText}> {userToDelete.firstName} {userToDelete.lastName}</Text>?
                        Esta acción no se puede deshacer.
                    </Text>

                    <View style={styles.buttonContainer}>
                        {/* Botón NO */}
                        <TouchableOpacity
                            style={[styles.button, styles.buttonNo]}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>NO</Text>
                        </TouchableOpacity>
                        
                        {/* Botón SÍ */}
                        <TouchableOpacity
                            style={[styles.button, styles.buttonYes]}
                            onPress={handleConfirm}
                        >
                            <Text style={styles.textStyle}>SÍ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#D32F2F', // Rojo para alerta
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    userNameText: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    button: {
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        width: '45%',
    },
    buttonNo: {
        backgroundColor: '#9E9E9E', // Gris para NO
    },
    buttonYes: {
        backgroundColor: '#D32F2F', // Rojo para SÍ
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default DeleteConfirmationModal;