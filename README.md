# 📖 README: Finanzauto Staff Manager (Móvil)

Este proyecto es la aplicación móvil desarrollada en **React Native** (CLI/Vanilla) para la gestión de usuarios (Staff Manager). Actualmente, la aplicación funciona con **datos dummy en memoria** antes de la integración con el backend de Django.

## 🌟 Características y Decisiones de Diseño

* **Flujo de Identificación:** La aplicación usa el campo **`document`** como el identificador principal para la búsqueda y navegación, reemplazando al `id` interno.
* **Gestión de Formularios:** Se implementó una lógica de validación estricta y genérica (`formValidator.ts`).
* **Componentes Nativos Estables:** Se utiliza **`@react-native-community/datetimepicker`** para la Fecha de Nacimiento (funcionamiento estable).
* **Decisión Crítica de UI:** Los selectores (`Título` y `Género`) fueron implementados como **`Input` de texto con validación por lista (`isOneOf`)** debido a conflictos recurrentes con las librerías de Picker nativas en el entorno de Android.

---

## 📂 Estructura del Proyecto

Basada en la arquitectura de carpetas del proyecto:

| Carpeta | Contenido | Notas Clave |
| :--- | :--- | :--- |
| **`src/api`** | `dummyData.ts` | **Contiene los datos quemados en memoria (`let dummyUsers`) y las funciones simuladas** (`fetchUserByDocument`, `addUserToDummyData`). Este archivo será reemplazado por la lógica de `fetch`/`axios` real. |
| **`src/config`** | `formConfig.ts` | **Configuración maestra de todos los campos del formulario.** Define etiquetas, iconos, tipos y las reglas de validación. |
| **`src/components`** | Componentes Reutilizables | Incluye `FormInput`, `FormDatePicker`, `ImageSelectorModal` (para el avatar), etc. |
| **`src/views/detail`** | `UserDetailView.tsx` | Muestra la información de un usuario, incluyendo el campo **`document`** recién añadido. |
| **`src/views/search`** | `UserSearchView.tsx` | Contiene la lógica para buscar usuarios usando el **`document`** ingresado en la barra. |
| **`src/types`** | `user.ts` | Contiene la definición de tipos para `User` y `UserCreatePayload`, incluyendo el campo **`document`**. |
| **`src/utils`** | `formValidator.ts` | **Lógica de validación centralizada.** Aquí se implementa la regla `isOneOf` para los campos de Título y Género. |

---

## 💻 Inicio Rápido y Desarrollo

Asume que Node.js, Java JDK y el SDK de Android están instalados.

### 1. Instalación de Dependencias

Ejecuta el siguiente comando desde la raíz del proyecto:

```bash
npm install

### 2. Ejecutar la Aplicación en Desarrollo (Necesita tu PC)
Abre dos terminales en la raíz del proyecto (D:\RepositoriosGitHub\FinanzautoStaffManager).

Terminal 1 (Metro Bundler)// npx react-native start
Terminal 2 (Lanzar en Android)// npx react-native run-android

!!!! IMPORTANTE !!!! Asegúrate de tener un emulador abierto o un dispositivo físico conectado via depuración USB con SO Android 11+

📦 Comandos de Compilación para APK
1. Generar la APK de Prueba (Debug)
Útil para pruebas rápidas

Genera el bundle (código JS): npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
Compila la APK: cd android -> .\gradlew assembleDebug

Ubicación de la APK: android/app/build/outputs/apk/debug/app-debug.apk

