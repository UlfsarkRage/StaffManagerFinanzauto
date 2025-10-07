/* eslint-disable react-native/no-inline-styles */
// src/views/form/UserFormView.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { User, UserCreatePayload } from '../../types/user';
import { USER_FORM_CONFIG } from '../../config/formConfig';
import { validateForm } from '../../utils/formValidator';
import { addUserToDummyData } from '../../api/dummyData';
import FormInput from '../../components/common/FormInput';
import { UserFormViewStyles as styles } from '../../styles/views/UserFormViewStyles';

import { createUser, deleteUser } from '../../api/endpointsDJango'; 

//import FormSelect from '../../components/common/FormSelect';
//import FormNativePicker from '../../components/common/FormNativePicker';
import FormDatePicker from '../../components/common/FormDatePicker';
import ImageSelectorModal from '../../components/common/ImageSelectorModal';
//import { TITLE_OPTIONS, GENDER_OPTIONS } from '../../config/formConfig';

// Estado inicial del formulario (valores por defecto)
const initialFormState: UserCreatePayload = {
  title: '',
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  dateOfBirth: '',
  phone: '',
  document: '',
  // Usamos una URL de imagen por defecto para el payload, ya que no implementaremos la subida de fotos por ahora
  picture: 'https://randomuser.me/api/portraits/lego/1.jpg',
};

// Props de la vista (necesita una función para limpiar el estado y volver a la vista anterior)
interface UserFormViewProps {
  onCancel: () => void;
  onSuccess: (newUser: User) => void;
}

/**
 * @name UserFormView
 * @description Vista principal para el formulario de registro de nuevos usuarios.
 */
const UserFormView: React.FC<UserFormViewProps> = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState<UserCreatePayload>(initialFormState);
  const [errors, setErrors] = useState<
    Record<keyof UserCreatePayload, string | null>
  >({} as any);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  /**
   * @name handleInputChange
   * @description Actualiza el estado del formulario y limpia el error si el campo es modificado.
   */
  const handleInputChange = (key: keyof UserCreatePayload, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));

    // Limpiar el error del campo tan pronto como el usuario escribe
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  /* const handleDateChange = (date: Date) => {
    // Formato simple YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];
    handleInputChange('dateOfBirth', formattedDate);
  }; */

  /**
   * @name handleSubmit
   * @description Maneja el proceso de validación y envío del formulario.
   */
  const handleSubmit = async () => {
    Keyboard.dismiss();

    // 1. Validar el formulario completo
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // 2. Comprobar si hay errores (Si todos los valores son nulos)
    const hasErrors = Object.values(validationErrors).some(
      error => error !== null,
    );

    if (hasErrors) {
      Alert.alert(
        'Error de Validación',
        'Por favor, corrige los campos marcados antes de continuar.',
      );
      return;
    }

    // 3. Simular el envío de datos
    setIsSubmitting(true);
    try {
      // El payload ya está listo: formData
      const newUser = await addUserToDummyData(formData);

      Alert.alert(
        'Éxito',
        `Usuario ${newUser.firstName} registrado con ID temporal: ${newUser.id}`,
      );

      // Si el registro fue exitoso, limpiar el formulario y notificar a la vista padre
      setFormData(initialFormState);
      onSuccess(newUser);
    } catch (e) {
      Alert.alert(
        'Error de Registro',
        'No se pudo crear el usuario dummy. Intenta de nuevo.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  /**
   * @name handleSubmitAPI
   * @description Maneja el proceso de validación y envío del formulario.
   */
  const handleSubmitAPI = async () => {
    Keyboard.dismiss();

    // 1. Validar el formulario completo
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // 2. Comprobar si hay errores (Si todos los valores son nulos)
    const hasErrors = Object.values(validationErrors).some(
      error => error !== null,
    );

    if (hasErrors) {
      Alert.alert(
        'Error de Validación',
        'Por favor, corrige los campos marcados antes de continuar.',
      );
      return;
    }

    // 3. Ejecutar el envío de datos real al Backend
    setIsSubmitting(true);
    try {
      
      const newUser = await createUser(formData);

      if (newUser) {
        // La creación fue exitosa y tenemos el objeto User real de Django (con ID y fechas reales)
        Alert.alert(
          'Éxito',
          `Usuario ${newUser.firstName} registrado con ID: ${newUser.id}`,
        );

        // Limpiar el formulario y notificar a la vista padre
        setFormData(initialFormState);
        onSuccess(newUser);
      } else {
        // createUser devuelve 'undefined' si hubo un error de red o un 5xx de servidor.
        Alert.alert(
          'Error de Registro',
          'No se pudo crear el usuario. Revisa el servidor o los logs.',
        );
      }
    } catch (e) {
      // Capturamos cualquier error que no haya sido atrapado internamente en createUser (ej. 400s)
      Alert.alert(
        'Error de Registro',
        'No se pudo crear el usuario. Intenta de nuevo. (Verifica consola).',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * @name handleAvatarSelect
   * @description Actualiza el campo 'picture' del payload con la URL seleccionada.
   */
  const handleAvatarSelect = (url: string) => {
    handleInputChange('picture', url);
    // Opcional: Mostrar una confirmación
    Alert.alert('Éxito', 'Imagen de perfil seleccionada.');
  };

  // Función para obtener la imagen de perfil actual
  const getAvatarSource = () => {
    // La imagen inicial se define en initialFormState.picture.
    // Si el valor actual es diferente al inicial (o si initialFormState.picture es un valor vacío),
    // devolvemos la fuente, de lo contrario devolvemos undefined.

    if (formData.picture && formData.picture !== initialFormState.picture) {
      return { uri: formData.picture };
    }

    return undefined;
  };

  /* // Función de ejemplo para manejo de DatePicker/Select (simulamos la interacción por ahora)
  const handleSpecialFieldPress = (key: keyof UserCreatePayload) => {
    Alert.alert(
      `Seleccionar ${USER_FORM_CONFIG[key].label}`,
      `Aquí se abriría un Picker o DatePicker nativo para seleccionar el valor de ${USER_FORM_CONFIG[key].label}. Por ahora, usa 'mr', 'female' o '1990-01-01' directamente en el input si es editable.`,
    );
  }; */

  /**
   * @name renderFormFields
   * @description Itera sobre la configuración y renderiza los componentes FormInput.
   */
  const renderFormFields = () => {
    // Obtenemos las claves del payload para iterar en orden
    const keys = Object.keys(USER_FORM_CONFIG) as (keyof UserCreatePayload)[];

    return keys.map(key => {
      const config = USER_FORM_CONFIG[key];

      // Omitimos el campo 'picture' del renderizado de inputs
      if (key === 'picture') {
        return null;
      }

      // Renderizar FormSelect para campos 'select'
      /* if (config.type === 'select') {
        const options = key === 'title' ? TITLE_OPTIONS : GENDER_OPTIONS;
        return (
          <FormNativePicker // <-- USAR EL NUEVO COMPONENTE
            key={key}
            fieldKey={key}
            config={config}
            value={formData[key] as string}
            onChange={handleInputChange as (k: string, v: string) => void}
            error={errors[key]}
            items={options}
          />
        );
      } */

      // Renderizar FormDatePicker para campos 'date' ---
      if (config.type === 'date') {
        return (
          <FormDatePicker
            key={key}
            fieldKey={key}
            config={config}
            value={formData[key] as string}
            onChange={handleInputChange as (k: string, v: string) => void}
            error={errors[key]}
          />
        );
      }

      return (
        <FormInput
          key={key}
          fieldKey={key}
          config={config}
          value={formData[key] as string}
          onChange={handleInputChange as (k: string, v: string) => void}
          error={errors[key]}
          editable={true}
          onPress={undefined}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Ayuda a manejar el teclado al hacer scroll
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <Text style={styles.title}>Información del usuario</Text>
        </View>

        {/* FOTO DE PERFIL (Placeholder) */}
        {/* <View style={styles.avatarContainer}>
          <Icon
            name="person-outline"
            size={70}
            style={styles.avatarPlaceholder}
          />
          <Icon
            name="create-outline"
            size={24}
            color={styles.createButtonText.color}
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              backgroundColor: styles.createButton.backgroundColor,
              borderRadius: 12,
              padding: 3,
            }}
          />
        </View> */}
        {/* FOTO DE PERFIL (Implementación del TouchableOpacity) */}
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => setIsAvatarModalVisible(true)}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          {/* Verificamos si hay una fuente de imagen válida para renderizar el componente Image */}
          {getAvatarSource() ? (
            // Muestra la imagen si hay una URL válida
            <Image source={getAvatarSource()} style={styles.avatarImage} />
          ) : (
            // Muestra el ícono de placeholder si no hay imagen
            <Icon
              name="person-outline"
              size={70}
              style={styles.avatarPlaceholder}
            />
          )}
          {/* Ícono de edición (lápiz) */}
          <Icon
            name="create-outline"
            size={24}
            color={styles.createButtonText.color}
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              backgroundColor: styles.createButton.backgroundColor,
              borderRadius: 12,
              padding: 3,
            }}
          />
        </TouchableOpacity>

        {/* CAMPOS DEL FORMULARIO */}
        <View style={{ width: '100%', marginTop: 20 }}>
          {renderFormFields()}
        </View>

        {/* BOTONES DE ACCIÓN */}
        <View style={styles.actionButtonContainer}>
          {/* Botón Crear */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleSubmit || handleSubmitAPI}
            disabled={isSubmitting}
          >
            <Text style={styles.createButtonText}>
              {isSubmitting ? 'Guardando...' : '✓ Crear'}
            </Text>
          </TouchableOpacity>

          {/* Botón Cancelar */}
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>✕ Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* MODAL DE SELECCIÓN DE IMAGEN */}
      <ImageSelectorModal
        isVisible={isAvatarModalVisible}
        onClose={() => setIsAvatarModalVisible(false)}
        onSelectImage={handleAvatarSelect}
      />
    </View>
  );
};

export default UserFormView;
