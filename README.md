# 🛍️ FakeStore CRUD

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

- CRUD temporal desarrollado en Angular 14 + Material usando la FakeStoreAPI
como fuente de datos.
Permite crear, editar y eliminar productos de forma local, con persistencia temporal en localStorage.

## 🚀 Demo
👉 [https://fake-store-crud.netlify.app](https://fake-store-crud-9fx32s1k5-leiladip33-gmailcoms-projects.vercel.app/)

## ✅ Checklist 
- Angular 14 + Material
- CRUD temporal con FakeStoreAPI
- localStorage persistente
- UX con animación flip + ícono guía
- Responsive design
- Deploy listo para revisión

## 🧩 Estructura del proyecto

src/
 ├── app/
 │   ├── core/
 │   │   └── services/         # ProductsService, ToastService, etc.
 │   ├── features/
 │   │   ├── products/ # Lista principal
 │   │   ├── product-detail/       # Vista individual
 │   │   └── product-modal/       # Modales de crear/editar/eliminar
 │                     
 │   └── app-routing.module.ts
 └── environments/
     ├── environment.ts
     └── environment.prod.ts

## 🧠 Cómo ejecutar localmente
### 1️⃣ Instalar dependencias
- `npm install`
### 2️⃣ Iniciar servidor de desarrollo
- `ng serve` Luego abre http://localhost:4200/
La aplicación recarga automáticamente ante cambios en los archivos fuente.

## 🏗️ Build para producción
- `ng build --configuration production` El resultado se genera en la carpeta dist/fake-store-crud/

## 💡 Notas técnicas

Los datos se obtienen de FakeStoreAPI y se almacenan en localStorage.

El CRUD es temporal: los cambios se mantienen solo hasta que se recarga la página.

La lógica del servicio sigue un patrón reactivo con BehaviorSubject para mantener estado en memoria.

El deploy se configuró con vercel.json 

## 📜 Licencia
    Este proyecto fue desarrollado con fines educativos y de evaluación técnica.
Licencia: MIT


