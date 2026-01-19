# Sistema de Inventario & POS Multisucursal

Sistema administrativo (Dashboard) desarrollado con **React** y **Supabase**, diseñado para centralizar la operación de pequeños y medianos negocios que requieren un control total sobre múltiples puntos de venta, empleados y existencias.

---

## ✨ Características Principales

### 🏢 Gestión Multisucursal & Stock Inteligente

- **Inventario por Sucursal:** Control de existencias independiente para cada ubicación física.
- **Stock Global:** Motor de cálculo en tiempo real que suma las existencias de todas las sucursales para una visión corporativa.
- **Operaciones de Almacén:**
  - **Carga de Stock:** Entrada de mercancía por sucursal.
  - **Ajustes:** Salida o merma de productos con validación de existencia.
  - **Transferencias:** Traspaso de productos entre sucursales con validación estricta de stock de origen para evitar inconsistencias.
- **Módulo de Ofertas:** Configuración de precios especiales/ofertas activables por producto.

### 👥 Control Administrativo y de Personal

- **Jerarquía de Propietario:** El dueño tiene visibilidad absoluta de todas las sucursales y movimientos.
- **Gestión de Accesos:** Panel para habilitar o deshabilitar empleados, controlando quién puede entrar al sistema.
- **Seguridad de Credenciales:** - El administrador puede resetear contraseñas de cualquier empleado.
  - Los usuarios tienen autonomía para gestionar y resetear sus propias credenciales desde su perfil privado.

### 💰 Punto de Venta (POS) & Ventas

- **Interfaz Optimizada:** Registro ágil de ventas orientado a uso comercial intenso.
- **Recibos de Venta:** Generación automática de comprobantes.
- **Métricas de Rendimiento:** Dashboard con indicadores clave de ventas, deudas y top de productos y sucursales más rentables.

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
   ```
2. **Instalar dependencias**
   ```bash
   npm install
   ```
3. **Configurar variables de entorno en .env**
   - Crea un archivo .env en la raíz del proyecto y agrega tus credenciales
     - VITE_SUPABASE_URL=url_de_tu_db_en_supabase
     - VITE_SUPABASE_PUBLISHABLE_KEY=tu_llave_publica
4. **Ejecución**
   ```bash
   npm run dev
   ```

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
├── services/
├── styles/            # Lógica de comunicación con APIs
├── types/
├── utils/                   # Funciones auxiliares
└── supabase/
```

## :brain: Aprendizajes y Competencias Adquiridas

- **Arquitectura Escalable:** Diseño de una estructura de carpetas modular orientada a dominios (features), facilitando el mantenimiento y la escalabilidad del frontend.
- **Gestión de Estado Asíncrono:** Dominio de TanStack Query para el manejo eficiente de caché, revalidación de datos y sincronización con el servidor, reduciendo la carga innecesaria.
- **Tipado Estricto:** Implementación profunda de TypeScript para garantizar la integridad de los datos entre la base de datos (Supabase) y la UI, minimizando errores en tiempo de ejecución.
- **Backend as a Service (BaaS):** Integración completa con Supabase para manejar autenticación segura (RLS) y persistencia de datos en tiempo real.
- **UI Avanzada:** Creación de tablas de datos complejas (filtros, paginación, ordenamiento) mediante TanStack Table para el manejo de inventarios grandes.
