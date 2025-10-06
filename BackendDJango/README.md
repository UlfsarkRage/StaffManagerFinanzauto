# FinanzautoBackend

Backend sencillo en Django + DRF para exponer una API REST de gestión de usuarios.

## Tecnologías

- Python 3.10+
- Django
- Django REST Framework
- django-filter
- django-cors-headers
- python-dotenv
- SQLite (por defecto en desarrollo)

## Estructura del proyecto

- `core/` configuración del proyecto Django (settings, urls, wsgi).
- `api/` app principal con modelos, serializers, urls y views.
- `manage.py` utilidades de Django.

Rutas principales registradas:

- `admin/` panel de administración de Django.
- `api/` inclusión de rutas de la app `api` (definidas en `api/urls.py`).

## Modelo principal: User

Definido en `api/models.py`.

- `id` (CharField, 24) PK generada automáticamente como hex de 24 caracteres.
- `title` (CharField, choices: Mr/Ms/Mrs/Miss/Dr/''), requerido.
- `firstName` (CharField, 100), requerido.
- `lastName` (CharField, 100), requerido.
- `gender` (CharField, choices: Male/Female/Other/''), requerido.
- `email` (EmailField, único), requerido.
- `dateOfBirth` (DateTimeField), requerido.
- `phone` (CharField, 50), requerido.
- `picture` (URLField, opcional).
- `document` (CharField, opcional).
- `location` (JSONField, opcional, por defecto `{}`).
- `registerDate` (DateTimeField, auto_now_add).
- `updatedDate` (DateTimeField, auto_now).

Serializers:

- `UserListSerializer`: id, title, firstName, lastName, picture.
- `UserDetailSerializer`: todos los campos expuestos para detalle/creación/edición.

## Requisitos previos

- Python 3.10 o superior
- pip
- Opcional: virtualenv/venv

## Instalación

1. Clonar el repositorio

- git clone https://github.com/IamRodion/FinanzautoBackend.git
- cd FinanzautoBackend

2. Crear y activar entorno virtual

- python -m venv .venv
- En Windows: .venv\Scripts\activate
- En macOS/Linux: source .venv/bin/activate

3. Instalar dependencias

- pip install -r requirements.txt

## Configuración

El proyecto lee variables de entorno con `python-dotenv` desde un archivo `.env` en la raíz (ver `core/settings.py`).

Crea un archivo `.env`:

- SECRET_KEY='Una clave segura'

Notas:

- El proyecto por defecto usa `DEBUG=True`, `ALLOWED_HOSTS=['*']` y `CORS_ORIGIN_ALLOW_ALL=True`. En producción, se debe ajustar estas variables para restringir orígenes y hosts.

## Base de datos

Por defecto usa SQLite (archivo `db.sqlite3` en la raíz), configurado en `core/settings.py`.

Aplicar migraciones:

- python manage.py makemigrations && python manage.py migrate

Crear superusuario (opcional, para admin):

- python manage.py createsuperuser

## Ejecución en desarrollo

- python manage.py runserver
- Abre http://127.0.0.1:8000/ en el navegador

Rutas útiles:

- Admin: http://127.0.0.1:8000/admin/
- API: http://127.0.0.1:8000/api/

## Endpoints

La app `api` expone endpoints REST para el modelo `User`:

### GET /api/Users/ — Lista de usuarios

Respuesta ejemplo:

```json
[
  {
    "id": "60d0fe4f5311236168a109d3",
    "title": "Mr",
    "firstName": "Felipe",
    "lastName": "Zuluaga Díaz",
    "picture": "https://randomuser.me/api/portraits/men/60.jpg"
  },
  {
    "id": "60d0fe4f5311236168a109d2",
    "title": "Ms",
    "firstName": "Ana Lucía",
    "lastName": "Castro Torres",
    "picture": "https://randomuser.me/api/portraits/women/22.jpg"
  }
]
```

### POST /api/Users/ — Crear un usuario

Cuerpo de la solicitud de ejemplo:

```json
{
  "title": "Mr",
  "firstName": "Ejemplo",
  "lastName": "de Registro",
  "picture": "http://www.google.com",
  "document": "123456789",
  "gender": "Male",
  "email": "ejemplo@gmail.com",
  "dateOfBirth": "2012-04-21T23:25:43Z",
  "phone": "123456789",
  "location": {}
}
```

Respuesta ejemplo:

```json
{
  "id": "029e14aa365b43d7b4b86e0a",
  "title": "Mr",
  "firstName": "Ejemplo",
  "lastName": "de Registro",
  "picture": "http://www.google.com",
  "document": "123456789",
  "gender": "Male",
  "email": "ejemplo@gmail.com",
  "dateOfBirth": "2012-04-21T23:25:43Z",
  "phone": "123456789",
  "location": {},
  "registerDate": "2025-10-06T03:59:57.875446Z",
  "updatedDate": "2025-10-06T03:59:57.875461Z"
}
```

### GET /api/Users/?page=1&limit=2 — Lista de usuarios paginada

Respuesta ejemplo:

```json
{
  "data": [
    {
      "id": "60d0fe4f5311236168a109d3",
      "title": "Mr",
      "firstName": "Felipe",
      "lastName": "Zuluaga Díaz",
      "picture": "https://randomuser.me/api/portraits/men/60.jpg"
    },
    {
      "id": "60d0fe4f5311236168a109d2",
      "title": "Ms",
      "firstName": "Ana Lucía",
      "lastName": "Castro Torres",
      "picture": "https://randomuser.me/api/portraits/women/22.jpg"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 2
}
```

### GET /api/Users/60d0fe4f5311236168a109d3/ — Obtener un usuario

Respuesta ejemplo:

```json
{
  "id": "60d0fe4f5311236168a109d3",
  "title": "Mr",
  "firstName": "Felipe",
  "lastName": "Zuluaga Díaz",
  "picture": "https://randomuser.me/api/portraits/men/60.jpg",
  "document": "0000000000",
  "gender": "Male",
  "email": "felipe.zuluaga@finanzauto.com",
  "dateOfBirth": "1980-03-01T00:20:00Z",
  "phone": "3187654321",
  "location": {},
  "registerDate": "2025-10-06T02:42:58.287314Z",
  "updatedDate": "2025-10-06T02:56:39.996102Z"
}
```

### PUT /api/Users/60d0fe4f5311236168a109ce/ — Actualizar los datos de un usuario

Cuerpo de la solicitud de ejemplo:

```json
{
  "title": "Dr",
  "firstName": "Claudia",
  "lastName": "López Ruiz",
  "picture": "https://randomuser.me/api/portraits/women/15.jpg",
  "document": "123456789",
  "gender": "Female",
  "email": "claudia.lopez@finanzauto.com",
  "dateOfBirth": "1970-08-11T01:40:00Z",
  "phone": "3007654321",
  "location": {}
}
```

Respuesta ejemplo:

```json
{
  "id": "60d0fe4f5311236168a109ce",
  "title": "Dr",
  "firstName": "Claudia",
  "lastName": "López Ruiz",
  "picture": "https://randomuser.me/api/portraits/women/15.jpg",
  "document": "123456789",
  "gender": "Female",
  "email": "claudia.lopez@finanzauto.com",
  "dateOfBirth": "1970-08-11T01:40:00Z",
  "phone": "3007654321",
  "location": {},
  "registerDate": "2025-10-06T02:42:56.818709Z",
  "updatedDate": "2025-10-06T04:13:32.012476Z"
}
```

### PATCH /api/Users/60d0fe4f5311236168a109ce/ — Actualizar un dato de un usuario

Cuerpo de la solicitud de ejemplo:

```json
{
  "document": "987654321"
}
```

Respuesta ejemplo:

```json
{
  "id": "60d0fe4f5311236168a109ce",
  "title": "Dr",
  "firstName": "Claudia",
  "lastName": "López Ruiz",
  "picture": "https://randomuser.me/api/portraits/women/15.jpg",
  "document": "987654321",
  "gender": "Female",
  "email": "claudia.lopez@finanzauto.com",
  "dateOfBirth": "1970-08-11T01:40:00Z",
  "phone": "3007654321",
  "location": {},
  "registerDate": "2025-10-06T02:42:56.818709Z",
  "updatedDate": "2025-10-06T04:16:25.053044Z"
}
```

### DELETE /api/Users/029e14aa365b43d7b4b86e0a/ — Eliminar un usuario

Al realizar una solicitud DELETE sobre una ruta con el ID de un usuario, se recibirá un código HTTP 204 No Content
