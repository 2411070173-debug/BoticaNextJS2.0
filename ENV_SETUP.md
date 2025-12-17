# 🔧 Configuración de Variables de Entorno

## 📋 Paso 1: Crear archivo .env.local

En la raíz del proyecto, crea un archivo llamado `.env.local` con el siguiente contenido:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

## 🔑 Paso 2: Obtener tus credenciales de Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia la **URL** del proyecto (ejemplo: `https://xxxxx.supabase.co`)
5. Copia la **anon** key (la clave pública, no la service_role)

## ✅ Paso 3: Actualizar .env.local

Reemplaza los valores en `.env.local` con tus credenciales reales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔄 Paso 4: Reiniciar el servidor

Después de crear o modificar el archivo `.env.local`, **debes reiniciar el servidor de desarrollo**:

1. Detén el servidor (Ctrl+C en la terminal)
2. Ejecuta nuevamente: `npm run dev`

## ⚠️ Notas Importantes

- El archivo `.env.local` está en `.gitignore` y NO se subirá al repositorio
- Nunca compartas tus credenciales públicamente
- Usa la **anon key** (clave pública), NO la service_role key
- La URL no debe terminar con una barra `/`

## 🆘 Problemas Comunes

### Error: "Faltan variables de entorno de Supabase"
- Verifica que el archivo se llame exactamente `.env.local` (no `.env` ni `.env.example`)
- Asegúrate de que está en la raíz del proyecto (mismo nivel que `package.json`)
- Reinicia el servidor después de crear/modificar el archivo

### Error: "Invalid API Key"
- Verifica que copiaste la **anon key** completa
- Asegúrate de que no haya espacios antes o después del valor
- Verifica que la URL no tenga barras finales

