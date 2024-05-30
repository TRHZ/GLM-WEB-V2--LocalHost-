# 1. Gestor de Inventarios para Empacadoras de Frutas y Verduras

- [1. Gestor de Inventarios para Empacadoras de Frutas y Verduras](#1-gestor-de-inventarios-para-empacadoras-de-frutas-y-verduras)
  - [1.1. Descripción del Proyecto](#11-descripción-del-proyecto)
    - [1.1.1. Arquitectura del Proyecto](#111-arquitectura-del-proyecto)
    - [1.1.2. Tecnologías Utilizadas](#112-tecnologías-utilizadas)
  - [1.2. Estructura del Proyecto](#12-estructura-del-proyecto)
  - [1.3. Instrucciones de Instalación y Ejecución](#13-instrucciones-de-instalación-y-ejecución)
    - [1.3.1. Requisitos Previos](#131-requisitos-previos)
    - [1.3.2. Instalación](#132-instalación)
- [2. Ejecución](#2-ejecución)
- [3. Uso del Proyecto](#3-uso-del-proyecto)
  - [3.1. Pantallas Principales](#31-pantallas-principales)
    - [3.1.1. Dashboard](#311-dashboard)
    - [3.1.2. AddScreen](#312-addscreen)
- [4. Prototipos de la Vista](#4-prototipos-de-la-vista)
  - [4.1. Guía Paso a Paso](#41-guía-paso-a-paso)
    - [4.1.1. Agregar Producto:](#411-agregar-producto)
    - [4.1.2. Visualizar Información en el Dashboard:](#412-visualizar-información-en-el-dashboard)
- [5. Descripción de las Pruebas y Cómo Ejecutarlas](#5-descripción-de-las-pruebas-y-cómo-ejecutarlas)
  - [5.1. Estructura de las Pruebas](#51-estructura-de-las-pruebas)
  - [5.2. Configuración de Pruebas en setupTest.js](#52-configuración-de-pruebas-en-setuptestjs)
    - [5.2.1. Instalación de Dependencias para Pruebas](#521-instalación-de-dependencias-para-pruebas)
  - [5.3. Ejecutar las Pruebas](#53-ejecutar-las-pruebas)


## 1.1. Descripción del Proyecto

Este proyecto es un gestor de inventarios diseñado para empacadoras de frutas y verduras. Permite a los usuarios gestionar el inventario, visualizar productos con stock bajo, productos con stock excesivo, los 15 productos más recientes y un gráfico de proveedores con la cantidad de compras realizadas.

### 1.1.1. Arquitectura del Proyecto

Frontend: Desarrollado con React y TypeScript.
Backend: Implementado con Node.js y Express.
Base de Datos: MySQL para el almacenamiento de datos.

### 1.1.2. Tecnologías Utilizadas

Frontend: React, TypeScript, Vite
Backend: Node.js, Express
Base de Datos: MySQL
Gráficas: Chart.js y react-chartjs-2
Ruteo: React Router DOM

## 1.2. Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- **Backend**: Manejado por Node.js
- **Frontend**: Desarrollado con React y TypeScript

## 1.3. Instrucciones de Instalación y Ejecución

### 1.3.1. Requisitos Previos
- Node.js (versión 14.17.0 o superior)
- npm (versión 6.14.13 o superior)
- MySQL
- Tener instalado XAMPP (forma local)
- Tener la base de datos creada junto la tabla en phpMyAdmin (forma local) [database.txt](src/database/database.txt)

### 1.3.2. Instalación

1. Clona el repositorio:
    git clone https://github.com/TRHZ/GLM-WEB-V2--LocalHost-.git
    cd GLM-WEB-V2--LocalHost-
2. Instala las dependencias del Backend:
    cd GLM_Backend
    npm install
3. Instala las dependencias del Frontend:
    cd ../GLM_Dashboard
    npm install
4. Instala las dependencias del proyecto general:
    cd ..
    npm install

# 2. Ejecución

1. Inicia Apache y MySQL en XAMPP
2. Inicia el servidor del Backend
    cd GLM_Backend
    node server.js
3. Inicia el servidor del Frontend
    cd ../GLM_Dashboard
    npm run dev
4. Para ejecutar ambos servidores simultaneamente:
    cd ..
    npm start

# 3. Uso del Proyecto

## 3.1. Pantallas Principales

### 3.1.1. Dashboard

Low Stock: Muestra los productos con stock bajo.
Over Stock: Muestra los productos con stock excesivo.
Recent: Lista de los 15 productos más recientes.
Proveedores: Gráfica de barras con la cantidad de compras a cada proveedor.
### 3.1.2. AddScreen

Permite ingresar nuevos productos al inventario.
Al enviar el formulario, redirige de nuevo al Dashboard donde se pueden visualizar los productos ingresados.
# 4. Prototipos de la Vista

[docs](docs/GreenLink%20Manager.png)

## 4.1. Guía Paso a Paso

### 4.1.1. Agregar Producto:

Navega a la pantalla AddScreen.
Ingresa los detalles del producto (Nombre, Fecha de Entrada, ID, Precio, Proveedor, Stock Mínimo y Stock Actual).
Haz clic en "Add".
Serás redirigido al Dashboard donde podrás ver el producto recién agregado.
### 4.1.2. Visualizar Información en el Dashboard:

En el Dashboard, puedes ver las secciones de Low Stock, Over Stock, Recent y Proveedores.
Los productos con stock bajo aparecerán en la sección Low Stock.
Los productos con stock excesivo aparecerán en la sección Over Stock.
Los productos más recientes serán listados en la sección Recent.
La gráfica de Proveedores mostrará la cantidad de compras realizadas a cada proveedor.
# 5. Descripción de las Pruebas y Cómo Ejecutarlas

En este proyecto, se han implementado una prueba unitaria y de integración para asegurar que los componentes y funcionalidades trabajen correctamente. Estas pruebas están configuradas para ejecutarse en el entorno del frontend utilizando Jest y React Testing Library.
## 5.1. Estructura de las Pruebas

Las pruebas se encuentran en el siguiente directorio:
- Frontend:
- Las pruebas están ubicadas en GLM_Dashboard/src/test/. [test](src/test/)
## 5.2. Configuración de Pruebas en setupTest.js

Para asegurar que las pruebas se ejecuten correctamente, se ha configurado un archivo setupTest.js que incluye las configuraciones necesarias.

### 5.2.1. Instalación de Dependencias para Pruebas
Antes de ejecutar las pruebas, asegúrate de que todas las dependencias necesarias estén instaladas. Si seguiste las instrucciones de instalación previamente mencionadas, ya deberías tener todo lo necesario. Si no, puedes instalar las dependencias de pruebas con el siguiente comando en el frontend:

    cd GLM_Dashboard
    npm install

## 5.3. Ejecutar las Pruebas

    npm run test

Este comando ejecutará todas las pruebas en el proyecto utilizando Jest y mostrará un reporte en la terminal.
Como recordatorio, debes de estar en la carpeta de GLM_Dashboard para poder correr la prueba