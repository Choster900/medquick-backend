<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Backend en <a href="https://nestjs.com" target="_blank">NestJS</a> para gestionar citas médicas, reseñas de pacientes y chats en tiempo real. Diseñado para aplicaciones móviles y escalable para uso web en el futuro.
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/Choster900/medquick-backend" alt="License" />
  <img src="https://img.shields.io/github/last-commit/Choster900/medquick-backend" alt="Last Commit" />
</p>

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión recomendada: 16 o superior)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- Configurar las variables de entorno en un archivo `.env`. Ejemplo de configuración:

```properties
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET=jsonwebtokensecret
```

---

## Instalación del proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Choster900/medquick-backend.git
   cd medquick-backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. (Opcional) Reinicia la base de datos con seeders:
   ```bash
   npm run seed
   ```

---

## Ejecutar el proyecto

### Modo local

- **Desarrollo**:
  ```bash
  npm run start
  ```

- **Modo watch (hot reload)**:
  ```bash
  npm run start:dev
  ```

- **Producción**:
  ```bash
  npm run start:prod
  ```

### Usando Docker

1. Asegúrate de que Docker esté instalado y en ejecución.
2. Levanta el proyecto con el siguiente comando:
   ```bash
   docker compose up --build
   ```

Esto levantará el proyecto en las siguientes rutas:

- Aplicación: [http://localhost:3000](http://localhost:3000)
- Documentación Swagger: [http://localhost:3000/swagger/doc](http://localhost:3000/swagger/doc)

---

## Características principales

- **Gestión de citas médicas**: Permite a los usuarios programar y gestionar citas.
- **Reseñas de pacientes**: Los pacientes pueden dejar reseñas sobre los servicios.
- **Chats en tiempo real**: Comunicación instantánea entre usuarios.
- **Escalabilidad**: Diseñado para aplicaciones móviles y adaptable para uso web.

---

## Licencia

Este proyecto está licenciado bajo la [MIT License](https://opensource.org/licenses/MIT).
