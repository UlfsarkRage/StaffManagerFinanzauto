// src/components/common/MenuModal.tsx

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

interface MenuModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const FINANZAUTO_URL = 'https://www.finanzauto.com.co/';
const GNMB_URL = 'https://wa.me/573057496664';

/**
 * @name MenuModal
 * @description Modal simple que muestra un mensaje y un enlace de ayuda.
 */
const MenuModal: React.FC<MenuModalProps> = ({ isVisible, onClose }) => {
  const handleLinkPressFINANZAUTO = () => {
    Linking.openURL(FINANZAUTO_URL).catch(err =>
      console.error('No se pudo abrir el enlace:', err),
    );
    onClose();
  };
  const handleLinkPressGNMB = () => {
    Linking.openURL(GNMB_URL).catch(err =>
      console.error('No se pudo abrir el enlace:', err),
    );
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalView}>
          

          <Text style={styles.modalText}>App desarollada por</Text>
          <TouchableOpacity onPress={handleLinkPressGNMB}>
            <Text style={styles.modalTitle}>GNMB</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>Software Developer</Text>

          <TouchableOpacity onPress={handleLinkPressGNMB}>
            <Text style={styles.modalLinkContacto}>¡Contactame!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLinkPressFINANZAUTO}>
            <Text style={styles.modalLink}>
              Visitar sitio web de Finanzauto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente oscuro
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#176D6C',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalLink: {
    color: '#A2D02F', 
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  modalLinkContacto: {
    color: '#176D6C', 
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#176D6C',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MenuModal;
