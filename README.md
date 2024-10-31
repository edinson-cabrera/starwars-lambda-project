
# Reto Técnico - Backend NodeJS AWS

Este proyecto consiste en una API basada en Node.js desplegada en AWS Lambda con el uso del framework Serverless. La API adapta y transforma los modelos de la [Star Wars API (SWAPI)](https://swapi.py4e.com/documentation) en español y permite el almacenamiento y recuperación de datos en una base de datos.

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Endpoints](#endpoints)
- [Despliegue](#despliegue)
- [Bonus Points](#bonus-points)
- [Pruebas](#pruebas)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

### Descripción del Proyecto

1. **Traducción de Modelos:** La API toma los modelos de SWAPI y adapta sus atributos al español. Por ejemplo, `name` se convierte en `nombre`.
2. **Integración con SWAPI:** Se consumen datos de SWAPI en uno o más endpoints.
3. **Creación y Almacenamiento de Datos:** La API permite crear nuevos registros mediante un endpoint `POST`, almacenando los datos en una base de datos.
4. **Recuperación de Datos Almacenados:** La API cuenta con un endpoint `GET` para recuperar la información almacenada.

### Requisitos Previos

- **Node.js** (versión 14 o superior)
- **Serverless Framework**
- **AWS CLI** configurado
- **Base de datos:** DynamoDB o MySQL (configurado según preferencias)

### Endpoints

El proyecto está dividido en dos servicios principales, cada uno con sus propios endpoints:

#### Servicio 1: `starwars-server`
- Ubicación: `/star-wars-project/starwars-server`
- Endpoint de desarrollo:
  - **GET** - [https://xxxx.execute-api.us-east-1.amazonaws.com/](https://xxxx.execute-api.us-east-1.amazonaws.com/)

#### Servicio 2: `starwars-internal-crud`
- Ubicación: `/star-wars-project/starwars-internal-crud`
- Endpoints de desarrollo:
  - **GET** - [https://xxxx.execute-api.us-east-1.amazonaws.com/list](https://xxxx.execute-api.us-east-1.amazonaws.com/list)
  - **POST** - [https://xxxx.execute-api.us-east-1.amazonaws.com/create](https://xxxx.execute-api.us-east-1.amazonaws.com/create)

### Despliegue

Este proyecto usa el framework Serverless para su despliegue en AWS Lambda. Para realizar el despliegue, asegúrate de tener el CLI de AWS configurado y usa el comando:

```bash
serverless deploy
```

Verifica también que el archivo `serverless.yml` esté configurado correctamente con las credenciales y configuraciones de tu cuenta de AWS.

### Bonus Points

1. **Pruebas Unitarias**: Se han incluido pruebas unitarias para los endpoints y las funciones principales de la API.
2. **Uso de TypeScript**: El proyecto incluye configuración de TypeScript para mayor robustez en el desarrollo.
3. **Documentación de Uso**: Este README proporciona detalles sobre la instalación, configuración y despliegue de la API.
4. **Documentación Open API/Swagger**: Se incluye una documentación Swagger para facilitar el consumo de la API.
5. **Arquitectura en Capas y por Dominio**: La estructura del código sigue principios de desarrollo en capas y por dominio.

### Pruebas

Para ejecutar las pruebas unitarias, usa el comando:

```bash
npm test
```

> **Nota:** Asegúrate de tener configurado el entorno y las dependencias necesarias antes de ejecutar las pruebas.

### Tecnologías Utilizadas

- **Node.js**: Para la lógica del servidor
- **NestJS**: Usado en un servicio Lambda para modularizar y facilitar la escalabilidad
- **Serverless Framework**: Para despliegue en AWS Lambda
- **AWS Lambda**: Como plataforma de ejecución sin servidor
- **DynamoDB/MySQL**: Para el almacenamiento de datos

---

¡Gracias por revisar esta documentación!
