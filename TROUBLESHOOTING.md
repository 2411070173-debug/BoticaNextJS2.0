# 🐛 GUÍA DE SOLUCIÓN DE PROBLEMAS

## ❌ Errores Comunes y Cómo Resolverlos

### 1️⃣ "Cannot find module '@/types/database'"

**Síntoma**: Error en consola, componentes no se cargan

**Solución**:

```bash
# Asegúrate de tener los tipos creados
ls types/

# Si no existen:
# Ejecuta el paso "Crear tipos TypeScript" del SETUP.md
```

---

### 2️⃣ "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Síntoma**:

```
Error: NEXT_PUBLIC_SUPABASE_URL is not defined
```

**Solución**:

1. Verifica que existe `.env.local` en la raíz del proyecto
2. Contiene:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

3. Reinicia el servidor: `npm run dev`

---

### 3️⃣ "Invalid API Key" o "Unauthorized"

**Síntoma**:

```
Error: Invalid API Key
```

**Solución**:

1. Ve a Supabase Dashboard → Settings → API
2. Verifica que copias la **anon** key (no la service_role key)
3. La URL debe ser: `https://xxxxx.supabase.co` (sin barras finales)

---

### 4️⃣ "User does not have permission"

**Síntoma**: Al intentar crear/actualizar datos

```
Error: new row violates row-level security policy
```

**Solución**:

1. Verifica que ejecutaste TODO el SQL de schema
2. Especialmente las políticas RLS en cada tabla:
   - `CREATE POLICY "..."`
3. Comprueba en Supabase → Authentication > Users que el usuario está creado
4. Si problemas persisten:
   - Ve a Supabase > Policies
   - Verifica que están activas todas las políticas

---

### 5️⃣ "Function handle_new_user does not exist"

**Síntoma**: Al registrar un usuario, no se crea automáticamente el perfil

**Solución**:

1. Abre Supabase > SQL Editor
2. Ejecuta esta query para verificar:

```sql
SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
```

3. Si retorna 0 filas, el trigger no existe
4. Ejecuta nuevamente la sección "10. FUNCIÓN: Crear perfil al registrar usuario" del SQL

---

### 6️⃣ "Session expired" o "No authenticated user"

**Síntoma**: Login exitoso pero redirige a login nuevamente

**Solución**:

1. Limpia cookies del navegador (Devtools → Application → Cookies)
2. Limpia localStorage: `localStorage.clear()`
3. Cierra y reabre el navegador
4. Si persiste, verifica que `.env.local` tiene las credenciales correctas
5. Reinicia el servidor: `npm run dev`

---

### 7️⃣ "Stock no se descuenta automáticamente"

**Síntoma**: Compro medicamento pero stock no cambia

**Solución**:

1. Verifica que el trigger existe:

```sql
SELECT * FROM pg_trigger WHERE tgname = 'update_stock_on_venta';
```

2. Si no existe, ejecuta:

```sql
CREATE OR REPLACE FUNCTION update_medicamento_stock()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.medicamentos
  SET stock = stock - NEW.cantidad
  WHERE id = NEW.medicamento_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stock_on_venta AFTER INSERT
  ON public.ventas FOR EACH ROW
  EXECUTE FUNCTION update_medicamento_stock();
```

---

### 8️⃣ "Middleware no funciona, puedo acceder a /admin sin ser admin"

**Síntoma**: Accedo a `http://localhost:3000/admin` sin ser admin

**Solución**:

1. Verifica que `middleware.ts` existe en raíz del proyecto
2. Si no existe, crea el archivo (incluido en este proyecto)
3. Reinicia servidor: `npm run dev`
4. Limpia cookies (Devtools → Clear)

---

### 9️⃣ "¿Cómo hago admin a un usuario?"

**Síntoma**: Necesito que un usuario tenga rol admin

**Solución**:

**Opción A (Via Supabase SQL Editor):**

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE user_id = 'uuid-del-usuario';
```

**Opción B (Crear usuario directamente como admin):**

1. En Supabase > SQL Editor:

```sql
-- Primero crear el usuario en auth
INSERT INTO auth.users (email, email_confirmed_at, raw_user_meta_data, created_at, updated_at)
VALUES ('admin@botica.com', now(), '{"full_name":"Admin User"}', now(), now())
RETURNING id;

-- Copiar el ID retornado y usarlo abajo

-- Luego crear su profile como admin
INSERT INTO public.profiles (user_id, full_name, role)
VALUES ('UUID-COPIADO-ARRIBA', 'Admin User', 'admin');

-- Y la suscripción
INSERT INTO public.user_subscriptions (user_id, subscription_type, end_date, is_active)
VALUES ('UUID-COPIADO-ARRIBA', 'PREMIUM', now() + interval '365 days', true);
```

---

### 🔟 "Login no funciona, dice credenciales inválidas"

**Síntoma**:

```
Error: Invalid login credentials
```

**Solución**:

1. Asegúrate de que el usuario está confirmado en Supabase > Authentication
2. En Supabase > Settings > Auth:
   - ✅ Email Confirmations: **ON** o **OFF** (pero consistente)
3. Si el usuario tiene email_confirmed_at = NULL:

```sql
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email = 'usuario@email.com';
```

---

### 1️⃣1️⃣ "Componentes no muestran datos, pero no hay errores"

**Síntoma**: Página carga pero sin datos

**Solución**:

1. Abre Devtools → Network → mira las requests a Supabase
2. Si ves errores 403/401, es problema de permisos RLS
3. Abre Console → verifica si hay errores silenciosos
4. Verifica que el usuario tiene sesión activa:

```javascript
// En Console del navegador:
const { createClient } = require("@supabase/ssr");
const client = createClient("...", "...");
client.auth.getSession().then((r) => console.log(r));
```

---

### 1️⃣2️⃣ "Google OAuth no funciona"

**Síntoma**: Click en "Continuar con Google" no hace nada o error

**Solución**:

1. En Supabase > Authentication > Providers > Google:
   - ¿Está habilitado?
   - ¿Tiene Client ID y Secret?
2. Ve a Google Cloud Console:
   - Ve a tu proyecto
   - OAuth 2.0 Credentials
   - Autorized redirect URIs debe incluir:
     - `https://tu-proyecto.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (para desarrollo)
3. Si no funciona, desactiva temporalmente Google y prueba email/contraseña

---

### 1️⃣3️⃣ "npm install falla con errores de dependencias"

**Síntoma**:

```
npm ERR! peer dep missing: react@^18
```

**Solución**:

```bash
# Intenta con --legacy-peer-deps
npm install --legacy-peer-deps

# O usa pnpm (suele ser más tolerante)
pnpm install
```

---

### 1️⃣4️⃣ "Aplicación muy lenta o freezea"

**Síntoma**: Todo funciona pero está lentísimo

**Solución**:

1. Desactiva DevTools React:
   - Devtools → ⚙️ > Desabilitar
2. Verifica que no hay loops infinitos de hooks:
   - Busca `useEffect` sin dependencias
3. Si está en desarrollo, intenta:

```bash
npm run build
npm run start
```

4. Verifica que tu conexión a internet es estable
5. Supabase puede estar lento → verifica en https://status.supabase.com

---

### 1️⃣5️⃣ "Cambios en BD no aparecen en la app"

**Síntoma**: Creo un medicamento en la BD pero no aparece en catálogo

**Solución**:

1. Limpia caché del navegador: Ctrl+Shift+Delete
2. Reinicia el servidor: `npm run dev`
3. En el componente, busca `.refetch()` y llámalo:

```javascript
const { medicamentos, refetch } = useMedicamentos();

// Luego:
await createMedicamento(...);
await refetch(); // Force recargar
```

---

## 🔍 Debugging Avanzado

### Ver qué queries se envían a Supabase

**En la consola del navegador:**

```javascript
// Supabase normalmente loguea en consola
// Si no ves logs, intenta:
const { createClient } = require("@supabase/ssr");
const client = createClient(
  "URL",
  "KEY",
  { debug: true } // Habilita debug
);
```

### Ver todas las políticas RLS activas

**En Supabase SQL Editor:**

```sql
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### Ver todos los triggers

**En Supabase SQL Editor:**

```sql
SELECT
  trigger_name,
  table_schema,
  table_name,
  event_object_columns
FROM information_schema.triggers
WHERE table_schema = 'public'
ORDER BY table_name, trigger_name;
```

---

## 📞 Recursos de Ayuda

1. **Supabase Docs**: https://supabase.com/docs
2. **Next.js Docs**: https://nextjs.org/docs
3. **Tailwind Docs**: https://tailwindcss.com/docs
4. **Comunidad Supabase**: https://discord.supabase.com

---

## ✅ Checklist Final de Verificación

Antes de reportar un bug, verifica:

- [ ] Ejecuté TODO el SQL de schema
- [ ] `.env.local` tiene las credenciales correctas
- [ ] Ejecuté `npm install` sin errores
- [ ] Reinicié el servidor: `npm run dev`
- [ ] Limpié caché del navegador
- [ ] Verificué en Supabase Dashboard que los datos existen
- [ ] No hay errores en Devtools > Console
- [ ] No hay errores en Supabase > Logs

Si aún tienes problemas, sigue estos pasos:

1. Copia el error completo
2. Verifica si es en Devtools Console o Supabase Logs
3. Prueba en incógnito (para evitar caché)
4. Reinicia todo: editor, servidor, navegador

---

**¡Esperamos que esto resuelva tus problemas! 🚀**
