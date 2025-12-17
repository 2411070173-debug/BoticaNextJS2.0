# 💊 Botica MVP - Sistema de Gestión de Farmacia

Sistema completo de gestión para farmacias construido con **Next.js 14**, **Supabase** y **Tailwind CSS**.

## 🚀 Características

### Para Administradores

- ✅ **Dashboard de Estadísticas**: Vista general de ventas, ingresos y stock bajo
- ✅ **Gestión de Inventario**: CRUD completo de medicamentos
- ✅ **Gestión de Usuarios**: Visualizar clientes y actualizar sus suscripciones (FREE → BASIC → PREMIUM)

### Para Clientes

- ✅ **Dashboard Personal**: Resumen de suscripción, compras recientes y total gastado
- ✅ **Catálogo de Medicamentos**: Explorar medicamentos disponibles con precios y stock
- ✅ **Compra Online**: Realizar compras de medicamentos (stock se descuenta automáticamente)

### Seguridad

- ✅ **Autenticación**: Google OAuth + Email/Contraseña
- ✅ **Middleware de Protección**: Rutas protegidas por rol (admin/usuario)
- ✅ **RLS (Row Level Security)**: Políticas en base de datos
- ✅ **Triggers Automáticos**: Descuento de stock al comprar

## 📋 Requisitos Previos

1. **Node.js 18+** instalado
2. **Proyecto Supabase** creado (https://supabase.com)
3. **SQL ejecutado** en tu proyecto Supabase (incluido en este documento)
4. **Google OAuth configurado** en Supabase (opcional pero recomendado)

## ⚙️ Instalación

### 1. Clonar y configurar el proyecto

```bash
# Instalar dependencias
npm install

# O con pnpm
pnpm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` basado en `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

**Cómo obtener estas credenciales:**

1. Ve a tu proyecto Supabase
2. Clic en **Settings** > **API**
3. Copia `URL` del proyecto
4. Copia `anon` key (la clave pública)

### 3. Ejecutar las migraciones SQL

1. En Supabase, ve a **SQL Editor**
2. Clic en **New Query**
3. Copia y pega **TODO** el contenido SQL del archivo de schema (proporcionado previamente)
4. Haz clic en **Run**

Este SQL creará:

- ✅ Tablas (`profiles`, `user_subscriptions`, `medicamentos`, `ventas`)
- ✅ Tipos de datos (`user_role`, `subscription_type`)
- ✅ Funciones y triggers automáticos
- ✅ Políticas de RLS
- ✅ Índices para optimización

### 4. Configurar Google OAuth (Opcional)

1. En Supabase, ve a **Authentication** > **Providers**
2. Habilita **Google** y configura tus credenciales de Google Cloud
3. Agrega los URLs de autorización (ej: `http://localhost:3000/auth/callback`)

### 5. Ejecutar el servidor

```bash
npm run dev
# El app estará en http://localhost:3000
```

## 🗂️ Estructura de Carpetas

```
app/
├── layout.tsx                 # Layout principal con Navbar
├── page.tsx                   # Home público
├── auth/
│   ├── login/page.tsx        # Login
│   ├── sign-up/page.tsx      # Registro
│   ├── callback/route.ts     # OAuth callback
│   ├── confirm/page.tsx      # Confirmación de email
│   └── sign-up-success/page.tsx
├── dashboard/                # 🔒 Rutas protegidas para usuarios
│   ├── page.tsx              # Dashboard usuario
│   └── catalog/page.tsx      # Catálogo de medicamentos
└── admin/                    # 🔒 Rutas protegidas para admins
    ├── page.tsx              # Dashboard admin
    ├── inventory/page.tsx    # Gestión de medicamentos
    └── users/page.tsx        # Gestión de usuarios

components/
├── ui/                       # Componentes base reutilizables
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── modal.tsx
│   └── alert.tsx
├── auth/                     # Componentes de autenticación
├── dashboard/                # Componentes del dashboard usuario
├── admin/                    # Componentes del dashboard admin
└── navbar.tsx                # Navbar principal

lib/
├── supabase/
│   ├── client.ts            # Cliente del navegador (SSR)
│   ├── server.ts            # Cliente del servidor
│   └── middleware.ts        # Actualizar sesión
└── utils.ts

hooks/
├── useAuth.ts               # Hook de autenticación
├── useMedicamentos.ts       # CRUD medicamentos
├── useVentas.ts            # Crear ventas
├── useUsers.ts             # CRUD usuarios (admin)
├── useUserVentas.ts        # Obtener compras del usuario
└── useAdminStats.ts        # Estadísticas para admin

types/
├── database.ts             # Tipos de Supabase
└── entities.ts             # Tipos de entidades
```

## 🔐 Flujo de Autenticación

### Registro

1. Usuario ingresa email, contraseña y nombre
2. Se envía confirmación por email
3. Trigger en BD crea automáticamente `profile` (rol=usuario) y `subscription` (tipo=FREE)
4. Usuario confirma email
5. Redirige a dashboard

### Login

1. Usuario inicia sesión
2. Middleware verifica rol desde tabla `profiles`
3. Si es `admin` → redirige a `/admin`
4. Si es `usuario` → redirige a `/dashboard`

## 💾 Base de Datos - Resumen

### Tablas Principales

**profiles**

```sql
id, user_id, full_name, role (admin|usuario), created_at, updated_at
```

**user_subscriptions**

```sql
id, user_id, subscription_type (FREE|BASIC|PREMIUM),
start_date, end_date, is_active, created_at, updated_at
```

**medicamentos**

```sql
id, nombre, descripcion, precio, stock, fecha_vencimiento, created_at, updated_at
```

**ventas**

```sql
id, user_id, medicamento_id, cantidad, precio_unitario, precio_total, created_at, updated_at
```

### Triggers Automáticos

- **handle_new_user**: Crea profile y subscription cuando se registra un usuario
- **update_medicamento_stock**: Descuenta stock automáticamente al crear una venta

## 🛠️ Operaciones Principales

### Usuario: Comprar Medicamento

```typescript
// 1. Ver catálogo de medicamentos
const { medicamentos } = useMedicamentos();

// 2. Crear venta
const { createVenta } = useVentas();
await createVenta(medicamento_id, cantidad);
// Automáticamente: se crea registro en ventas + se descuenta stock
```

### Admin: Crear Medicamento

```typescript
const { createMedicamento } = useMedicamentos();
await createMedicamento({
  nombre: "Aspirin",
  descripcion: "Analgésico",
  precio: 5.99,
  stock: 100,
  fecha_vencimiento: "2026-12-31",
});
```

### Admin: Actualizar Suscripción de Usuario

```typescript
const { updateSubscription } = useUsers();
await updateSubscription(user_id, "PREMIUM");
```

## 🚨 Errores Comunes y Soluciones

### "NEXT_PUBLIC_SUPABASE_URL not found"

→ Asegúrate de tener `.env.local` con las variables correctas

### "User does not have permission to execute"

→ Verifica que el RLS está correctamente configurado en Supabase

### "Function not found"

→ Asegúrate de haber ejecutado TODO el SQL de schema

### "Session expired"

→ Es normal. El middleware automáticamente pedirá que inicies sesión

## 📱 Rutas Disponibles

**Públicas**

- `/` - Home
- `/auth/login` - Iniciar sesión
- `/auth/sign-up` - Registro
- `/auth/confirm` - Confirmación de email

**Protegidas (Usuario)**

- `/dashboard` - Mi dashboard
- `/dashboard/catalog` - Catálogo de medicamentos

**Protegidas (Admin)**

- `/admin` - Dashboard admin
- `/admin/inventory` - Gestión de inventario
- `/admin/users` - Gestión de usuarios

## 🎨 Estilos

El proyecto usa **Tailwind CSS** con:

- Colores médicos/farmacéuticos (azul, verde, blanco)
- Componentes reusables con shadcn/ui
- Diseño responsive (mobile-first)

## 📦 Dependencias Principales

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "@supabase/ssr": "^0.x.x",
  "@supabase/auth-helpers-nextjs": "^0.x.x",
  "tailwindcss": "^3.x.x",
  "lucide-react": "^latest"
}
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Push a GitHub
2. Ve a https://vercel.com
3. Importa el repo
4. Agrega variables de entorno
5. Deploy

### Variables de entorno en Vercel

```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

## 📞 Soporte

Si tienes problemas:

1. Verifica los logs en la consola del navegador
2. Verifica los logs de Supabase (Dashboard > Logs)
3. Asegúrate de que el SQL fue ejecutado correctamente
4. Verifica que las credenciales de Supabase sean correctas

## 📄 Licencia

MIT - Siéntete libre de usar este código para tus proyectos

---

**Hecho con ❤️ usando Next.js y Supabase**
