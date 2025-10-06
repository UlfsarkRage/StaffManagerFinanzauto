// src/components/common/ImageSelectorModal.tsx 

import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

// URLs de imágenes genéricas para la selección (muñecos animados, etc.)
const DEFAULT_IMAGE_URLS = [
    'https://randomuser.me/api/portraits/lego/1.jpg',
    'https://randomuser.me/api/portraits/lego/2.jpg',
    'https://randomuser.me/api/portraits/lego/3.jpg',
    'https://randomuser.me/api/portraits/lego/4.jpg',
];

interface ImageSelectorModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSelectImage: (imageUrl: string) => void;
}

/**
 * @name ImageSelectorModal
 * @description Modal simple para seleccionar una imagen de perfil de un set predefinido.
 */
const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({ isVisible, onClose, onSelectImage }) => {

    const handleSelect = (url: string) => {
        onSelectImage(url);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Selecciona tu Avatar</Text>
                    
                    <View style={styles.imageGrid}>
                        {DEFAULT_IMAGE_URLS.map((url, index) => (
                            <TouchableOpacity 
                                key={index}
                                style={styles.imageOption}
                                onPress={() => handleSelect(url)}
                            >
                                <Image source={{ uri: url }} style={styles.avatarImage} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={onClose}
                    >
                        <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: 25,
        width: '100%',
    },
    imageOption: {
        width: 70,
        height: 70,
        borderRadius: 35,
        margin: 8,
        borderWidth: 2,
        borderColor: '#E8F5E9',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#D32F2F',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ImageSelectorModal;