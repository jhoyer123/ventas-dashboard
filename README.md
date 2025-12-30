# Sistema de Inventario con Punto de Venta

Sistema web desarrollado con React orientado a pequeños y medianos negocios para la gestión de inventarios, control de stock y ventas en punto de venta (POS).

## :sparkles: Características
- Gestión de productos y categorías
- Control de stock en tiempo real
- Registro de ventas
- Generación de recibos de venta
- Dashboard con metricas
- Interfaz intuitiva orientada a uso comercial
- Integración con base de datos en la nube

## 🛠️ Tecnologías
- React
- TypeScript
- HTML
- CSS
- Supabase
- TanStack Query
- TanStack Table

## :gear: Instalación y ejecución
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/jhoyer123/ventas-dashboard.git
2. **Instalar dependencias**
   ```bash
   npm install
3. **Configurar variables de entorno en .env**
     - Crea un archivo .env en la raíz del proyecto y agrega tus credenciales
         - VITE_SUPABASE_URL=url_de_tu_db_en_supabase
         - VITE_SUPABASE_PUBLISHABLE_KEY=tu_llave_publica   
5. **Ejecución**
   ```bash
   npm run dev

## :open_file_folder: Estructura del proyecto

```text
src/
├── api/
├── assets/                  # Archivos estáticos
│   └── icons/
├── components/              # Componentes visuales
│   ├── common/              # Componentes UI reutilizables y genéricos (Botones, Inputs)
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Modal/
│   └── movement/           
│   └── employee/
|   └── category/
|   └── branch/
|   └── product/
|   └── sale
|   └── profile/ 
├── context/                 # Estado global
├── hooks/                   # Custom Hooks
│   ├── auth/ 
│   └── branch/
|   └── category/
|   └── employee/
|   └── product/
|   └── sale/          
├── layouts/
├── lib/               
├── pages/                   # Vistas/Rutas principales
│   ├── auth/                # Vistas de autenticación
│   ├── dashboard/           # Vistas del panel
│   └── categories/
|   └── employee/
|   └── movements/
|   └── profile/
|   └── sale/
|   └── pos/
|   └── products/
├── routes/                  # Configuración de rutas y protección
├── schemes/  
├── services/                # Lógica de comunicación con APIs
├── types/
├── utils/                   # Funciones auxiliares
└── supabase/
```
## :brain: Aprendizajes y Competencias Adquiridas

* **Arquitectura Escalable:** Diseño de una estructura de carpetas modular orientada a dominios (features), facilitando el mantenimiento y la escalabilidad del frontend.
* **Gestión de Estado Asíncrono:** Dominio de TanStack Query para el manejo eficiente de caché, revalidación de datos y sincronización con el servidor, reduciendo la carga innecesaria.
* **Tipado Estricto:** Implementación profunda de TypeScript para garantizar la integridad de los datos entre la base de datos (Supabase) y la UI, minimizando errores en tiempo de ejecución.
* **Backend as a Service (BaaS):** Integración completa con Supabase para manejar autenticación segura (RLS) y persistencia de datos en tiempo real.
* **UI Avanzada:** Creación de tablas de datos complejas (filtros, paginación, ordenamiento) mediante TanStack Table para el manejo de inventarios grandes.
