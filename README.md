# Clonar repositorio
git clone https://github.com/tu-usuario/tu-proyecto.git

# Proyecto Laravel 11 
- api para la gestión de estudiantes

# Descripción
- Se uso Eloquent para llamadas a la base de datos
- Se uso Validator Facades para las validaciones de para los formularios

--- Rutas ----
Se uso Route::controller->group para definir un grupo de rutas y que estas tengan como controlador al StudentController
con en middleware('throttle:60,1'),. solo permite hasta 60 solicitudes por minuto asi reducimos ataque DDoS

--- en Student Controller--
se separaron las validaciones, para que se puedan usan en el agregado y en el editar
se agrego una respuesta definida para todos los metodos y se envio los stados correspondientes

## Requisitos Previos
- PHP >= 8.2
- MySQL
- Composer

## Instalación
Sigue estos pasos para levantar el proyecto en tu máquina local: 
### 1. Aceder al proyecto
- cd proyecto_back

## Instalar Dependencias
- composer install

# Configura el archivo .env
- Edita las credenciales de la BBDD segun tus datos

# Inicia los servidores de Xampp o laragon, etc

## Generar la Clave de la Aplicación
- php artisan key:generate

## Migrar la Base de Datos
- php artisan migrate

## Levantar el Servidor
- php artisan serve
- si necesitas cambiar de puerto ejecutar | php artisan serve --port=8080
- Por defecto, el servidor se levantará en http://127.0.0.1:8000 o http://localhost:8000, 

##### Uso
## Agregar Estudiante
POST /api/students
*Campos: form-data
    - first_name: (String) Nombre del estudiante.
    - last_name: (String) Apellido del estudiante.
    - email: (String) Correo electrónico del estudiante.
    - phone: (String) Número de teléfono del estudiante.
    - birth_date: (Date) Fecha de nacimiento del estudiante. -- ejm. 2000-02-08
    - status: (String) Estado del estudiante (1: activo o 0: inactivo).
## Listar Estudiantes
GET /api/students 
## Obtener Estudiante por ID
GET /api/students/{id}
## Actualizar Estudiante
PUT /api/students/{id}
*Campos: x-www-form-urlencoded
    - first_name: (String) Nombre del estudiante.
    - last_name: (String) Apellido del estudiante.
    - email: (String) Correo electrónico del estudiante.
    - phone: (String) Número de teléfono del estudiante.
    - birth_date: (Date) Fecha de nacimiento del estudiante. -- ejm. 2000-02-08
    - status: (int) Estado del estudiante (1: activo o 0: inactivo).
## Eliminar Estudiante
DELETE /api/students/{id}

##############################################################################################################

# Proyecto React 18
- Crud interfaz para la gestión de estudiantes

# Descripción

--- paquetes usados ---
- heroicons -> para los iconos
- chadCN -> para algunos componentes como Toast, modales, etc
- zod -> para las validaciones de los formularios
- tailwind -> para los estilos 
- react-hook-form -> para la gestion de los formularios


- se crearon 2 hooks para la abstraccion de datos, 

- Se creo un carpeta models para los tipos de datos
- Se creo una carpeta api, donde se definen las funciones para llamar a la api
- Se creo una carpeta components donde se definen los componentes, algunos componentes
  estan dentro de una carpeta y cada uno tiene un Barrer para una mejor importacion de estos

## Requisitos Previos
- Node version mas reciente

## Instalación
Sigue estos pasos para levantar el proyecto en tu máquina local: 
### 1. Aceder al proyecto
- cd proyecto_front

## Instalar Dependencias
- npm install

## Levantar el Servidor de vite
- cambiar el endpoint que esta en config.ts si es que es necesario
- npm run dev