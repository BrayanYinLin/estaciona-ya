# Estaciona Ya

Estaciona Ya es una plataforma web diseñada para facilitar el alquiler colaborativo de garajes y espacios de estacionamiento. Conecta a propietarios con espacios disponibles con conductores que necesitan un lugar para estacionar.

## Arquitectura y Estructura del Proyecto

El proyecto sigue una arquitectura de monorepo, gestionado con `pnpm workspaces`, para organizar el código de manera modular y cohesiva.

La estructura de carpetas principal es la siguiente:

- **`/apps`**: Contiene las aplicaciones principales del proyecto.
  - **`/api`**: El backend de la aplicación, desarrollado con Node.js y Express. Gestiona la lógica de negocio, el acceso a la base de datos y la comunicación con el cliente.
  - **`/client`**: El frontend de la aplicación, construido con React y Vite. Proporciona la interfaz de usuario con la que interactúan los usuarios finales.

- **`/database`**: Incluye los scripts de la base de datos, modelos y triggers necesarios para el funcionamiento del sistema.

- **`/docs`**: Alberga toda la documentación del proyecto, incluyendo:
  - Requisitos funcionales.
  - Diagramas de entidad-relación (ERD).
  - Diagramas de secuencia y de estado que ilustran los flujos de la aplicación.

Esta organización permite un desarrollo desacoplado entre el frontend y el backend, a la vez que mantiene toda la documentación y los recursos centralizados.

## Contribuciones

¡Toda contribución es bienvenida! Si deseas aportar al proyecto, es fundamental que leas nuestra guía de contribución en [CONTRIBUTING.md](CONTRIBUTING.md). Allí encontrarás todo lo necesario para comenzar, nuestro código de conducta y el proceso para enviar pull requests.
