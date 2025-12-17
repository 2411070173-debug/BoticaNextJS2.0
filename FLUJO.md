# 🗺️ FLUJO DE APLICACIÓN - BOTICA MVP

## 🔄 Flujo de Usuario: REGISTRO

```
┌─────────────────────┐
│  Página de Inicio   │
│   (Login/Sign-up)   │
└────────────┬────────┘
             │
             ▼
┌─────────────────────────────┐
│  /auth/sign-up              │
│ (Formulario de Registro)    │
│ - Nombre completo           │
│ - Email                     │
│ - Contraseña                │
│ - Google OAuth (opcional)   │
└────────────┬────────────────┘
             │
             ▼
    ┌─────────────────────────────────┐
    │  Trigger: handle_new_user       │
    │  Crea automáticamente:          │
    │  1. Profile (role=usuario)      │
    │  2. UserSubscription (FREE)     │
    └────────────┬────────────────────┘
                 │
                 ▼
    ┌─────────────────────────┐
    │ Email de confirmación   │
    │ enviado al usuario      │
    └────────────┬────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │ /auth/sign-up-success    │
    │ (Información de éxito)   │
    └────────────┬─────────────┘
                 │
        Usuario confirma email
                 │
                 ▼
    ┌─────────────────────────┐
    │ /auth/callback          │
    │ (Redirección de OAuth)  │
    └────────────┬────────────┘
                 │
                 ▼
    ┌─────────────────────────┐
    │ /dashboard (Usuario)    │
    │ ✅ Acceso concedido      │
    └─────────────────────────┘
```

---

## 🔐 Flujo de Usuario: LOGIN

```
┌──────────────────────┐
│ /auth/login          │
│ Formulario de Login  │
│ - Email              │
│ - Contraseña         │
│ - Google OAuth       │
└─────────┬────────────┘
          │
          ▼
  ┌────────────────────────────┐
  │ Middleware verifica sesión │
  │ y lee rol de BD            │
  └────────┬─────────┬─────────┘
           │         │
      admin│         │usuario
           │         │
     ┌─────▼─┐   ┌───▼──────┐
     │ /admin │   │/dashboard│
     │✅Acceso│   │✅Acceso   │
     └────────┘   └──────────┘
```

---

## 👤 Flujo del USUARIO (Cliente)

```
                ┌─────────────────┐
                │    /dashboard   │
                │  (Mi Dashboard) │
                └────────┬────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐     ┌──────────┐   ┌─────────┐
    │Suscripción│  │ Compras  │   │ Total   │
    │ Actual   │  │Recientes │   │Gastado  │
    │(FREE)    │  │(últimas) │   │($xxx)   │
    └──────────┘  └──────────┘   └─────────┘
         │
         ▼
┌─────────────────────────┐
│ /dashboard/catalog      │
│  Catálogo Medicamentos  │
│  ┌───────┬────┬──────┐  │
│  │Nombre │Pvp │Stock │  │
│  ├───────┼────┼──────┤  │
│  │Aspirin│$5  │ 100  │  │
│  │Ibupro │$8  │  50  │  │
│  └───────┴────┴──────┘  │
└────────────┬────────────┘
             │
        Click "Comprar"
             │
             ▼
      ┌───────────────────┐
      │ Modal de Compra   │
      │ Ingresar cantidad │
      │ Ver total         │
      └────────┬──────────┘
               │
           Click "Confirmar"
               │
               ▼
       ┌─────────────────────────┐
       │ INSERT en tabla VENTAS  │
       │ ✅ Venta creada         │
       └────────┬────────────────┘
                │
        ┌───────┴────────┐
        │                │
        ▼                ▼
   ┌─────────────┐  ┌─────────────────────┐
   │ Trigger:   │  │ Stock actualizado   │
   │ Descontar  │  │ (automático)        │
   │ stock      │  └─────────────────────┘
   └─────────────┘
        │
        ▼
┌──────────────────────────┐
│ ✅ Compra Exitosa        │
│ Medicamento en historial │
└──────────────────────────┘
```

---

## 👨‍💼 Flujo del ADMIN

```
                ┌─────────────┐
                │   /admin    │
                │  Dashboard  │
                └──────┬──────┘
                       │
         ┌─────────────┼─────────────┐
         │             │             │
         ▼             ▼             ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │Ventas    │ │Ingresos  │ │Stock Bajo│
    │Totales   │ │Totales   │ │(<5)      │
    │(#100)    │ │($5,000)  │ │(#3)      │
    └──────────┘ └──────────┘ └──────────┘
         │
         ├─────────────┬─────────────┐
         │             │             │
         ▼             ▼             ▼
    ┌─────────┐  ┌──────────┐  ┌─────────┐
    │Inventario│ │ Usuarios │  │ Estadis │
    │(CRUD)   │  │(Suscripc)│  │ticas    │
    └────┬────┘  └─────┬────┘  └─────────┘
         │              │
    ┌────┴──────┐  ┌────┴──────────┐
    │            │  │               │
  Crear      Editar │           Actualizar
  Editar      Ver   │           suscripción
  Eliminar    Stock │           (FREE→PREMIUM)
    │               │
    ▼               ▼
 MEDICAMENTOS    USUARIOS
  - Aspirin      - User1 (FREE)
  - Ibuprofeno   - User2 (PREMIUM)
  - Paracetamol  - User3 (FREE)
```

---

## 🔒 SEGURIDAD: Capas de Protección

```
┌──────────────────────────────────────────────────┐
│       MIDDLEWARE (Next.js)                       │
│  - Verifica token de sesión                      │
│  - Lee rol de tabla profiles                     │
│  - Redirige según rol                            │
│  - Protege rutas /admin y /dashboard             │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│       RLS (Row Level Security)                   │
│  - Políticas en la base de datos                 │
│  - Valida permisos en cada query                 │
│  - Usuario solo ve sus datos                     │
│  - Admin ve todo                                 │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────▼───────────────────────────────┐
│       TRIGGERS (Validaciones)                    │
│  - handle_new_user: crea profile automático      │
│  - update_medicamento_stock: descuenta stock     │
│  - update_updated_at: actualiza timestamps       │
└──────────────────────────────────────────────────┘
```

---

## 📊 Modelos de Datos: Relaciones

```
┌──────────────┐         ┌─────────────────────┐
│  auth.users  │         │    profiles         │
├──────────────┤         ├─────────────────────┤
│ id (UUID)    │────1:1──│ user_id (FK)        │
│ email        │         │ full_name           │
│ password     │         │ role (admin|usuario)│
└──────────────┘         └──────────┬──────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                    ▼                               ▼
            ┌──────────────────┐        ┌─────────────────────┐
            │ user_subscriptions       │   ventas             │
            ├──────────────────┤        ├─────────────────────┤
            │ user_id (FK)     │        │ user_id (FK)        │
            │ subscription_type│        │ medicamento_id (FK) │
            │ start_date       │        │ cantidad            │
            │ end_date         │        │ precio_total        │
            │ is_active        │        └─────────────────────┘
            └──────────────────┘
                                        ┌──────────────────┐
                                        │  medicamentos    │
                                        ├──────────────────┤
                                        │ id               │
                                        │ nombre           │
                                        │ precio           │
                                        │ stock            │
                                        │ vencimiento      │
                                        └──────────────────┘
```

---

## 🎬 Timeline de Ejecución Completa

```
USUARIO NUEVO (Diego)
├─ T0:00 ┌─ Accede a /auth/sign-up
├─ T0:05 ├─ Llena formulario y da clic en "Crear cuenta"
├─ T0:10 ├─ Trigger handle_new_user se ejecuta:
│        │  ├─ INSERT en profiles (diego, role=usuario)
│        │  └─ INSERT en user_subscriptions (FREE, 30 días)
├─ T0:15 ├─ Email de confirmación enviado
├─ T0:30 ├─ Diego confirma email
├─ T1:00 ├─ Accede a /auth/login
├─ T1:05 ├─ Login exitoso
├─ T1:10 ├─ Middleware verifica: role=usuario
├─ T1:15 ├─ Redirige a /dashboard ✅
├─ T2:00 ├─ Diego navega a /dashboard/catalog
├─ T2:05 ├─ Ve lista de medicamentos
├─ T2:30 ├─ Busca "Aspirin" y da clic "Comprar"
├─ T2:35 ├─ Ingresa cantidad: 2
├─ T2:40 ├─ Confirma compra (precio: $10)
├─ T2:41 ├─ Trigger update_medicamento_stock se ejecuta:
│        │  ├─ Stock de Aspirin: 100 → 98
│        │  └─ INSERT en ventas (cantidad=2, total=10)
├─ T2:45 ├─ ✅ "¡Compra realizada exitosamente!"
├─ T3:00 ├─ Diego vuelve a /dashboard
│        └─ Ve su compra en "Compras recientes"

ADMIN (Maria)
├─ T0:00 ┌─ Accede a /auth/login (ya es admin)
├─ T0:10 ├─ Middleware verifica: role=admin
├─ T0:15 ├─ Redirige a /admin ✅
├─ T0:30 ├─ Navega a /admin/inventory
├─ T0:35 ├─ Ve lista de medicamentos (incluyendo Aspirin: 98 unidades)
├─ T1:00 ├─ Clic "Nuevo medicamento"
├─ T1:05 ├─ Llena formulario:
│        │  ├─ Nombre: "Ibuprofeno 400mg"
│        │  ├─ Precio: 8.50
│        │  └─ Stock: 150
├─ T1:10 ├─ INSERT en medicamentos
├─ T1:15 ├─ ✅ Medicamento creado
├─ T2:00 ├─ Navega a /admin/users
├─ T2:05 ├─ Ve lista de usuarios (incluyendo Diego)
├─ T2:15 ├─ Clic en "Actualizar" para Diego
├─ T2:20 ├─ Cambia suscripción: FREE → PREMIUM
├─ T2:25 ├─ UPDATE en user_subscriptions
└─ T2:30 └─ ✅ Suscripción actualizada
```

---

## 🎯 Endpoints / Rutas Principales

### Públicas

```
GET  /                      → Home (Sin auth requerida)
GET  /auth/login            → Formulario de Login
POST /auth/login            → Procesar Login (via Supabase)
GET  /auth/sign-up          → Formulario de Sign-up
POST /auth/sign-up          → Procesar Sign-up (via Supabase)
GET  /auth/callback         → OAuth Callback
GET  /auth/confirm          → Confirmación Email
GET  /auth/sign-up-success  → Éxito del Registro
```

### Protegidas - Usuario

```
GET  /dashboard             → Dashboard Usuario (🔒 requiere role=usuario)
GET  /dashboard/catalog     → Catálogo de Medicamentos
```

### Protegidas - Admin

```
GET  /admin                 → Dashboard Admin (🔒 requiere role=admin)
GET  /admin/inventory       → Gestión de Medicamentos
GET  /admin/users           → Gestión de Usuarios
```

### Operaciones (via Hooks/Componentes)

```
POST /medicamentos          → Crear medicamento (admin)
PUT  /medicamentos/:id      → Actualizar medicamento (admin)
DEL  /medicamentos/:id      → Eliminar medicamento (admin)
GET  /medicamentos          → Listar medicamentos (todos)

POST /ventas                → Crear venta (usuario)
GET  /ventas                → Listar ventas del usuario

GET  /users                 → Listar usuarios (admin)
PUT  /users/:id/subscription → Actualizar suscripción (admin)
```

---

**Este documento sirve como referencia visual del flujo completo de la aplicación.**
