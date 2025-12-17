#!/bin/bash

# Script de verificación - Botica MVP
# Verifica que todos los archivos fueron creados correctamente

echo "🔍 Verificando archivos de Botica MVP..."
echo ""

# Arrays de archivos esperados
types=("types/database.ts" "types/entities.ts")
supabase=("lib/supabase/client.ts" "lib/supabase/server.ts" "lib/supabase/middleware.ts")
hooks=("hooks/useAuth.ts" "hooks/useMedicamentos.ts" "hooks/useVentas.ts" "hooks/useUsers.ts" "hooks/useUserVentas.ts" "hooks/useAdminStats.ts")
ui_components=("components/ui/button.tsx" "components/ui/input.tsx" "components/ui/card.tsx" "components/ui/loading-spinner.tsx" "components/ui/alert.tsx" "components/ui/modal.tsx")
auth_components=("components/auth/login-form.tsx" "components/auth/sign-up-form.tsx")
dashboard_components=("components/dashboard/user-dashboard.tsx" "components/dashboard/catalog-list.tsx")
admin_components=("components/admin/admin-dashboard.tsx" "components/admin/inventory-table.tsx" "components/admin/users-table.tsx")
navbar=("components/navbar.tsx")
pages=("app/auth/login/page.tsx" "app/auth/sign-up/page.tsx" "app/auth/confirm/page.tsx" "app/auth/sign-up-success/page.tsx" "app/dashboard/page.tsx" "app/dashboard/catalog/page.tsx" "app/dashboard/layout.tsx" "app/admin/page.tsx" "app/admin/inventory/page.tsx" "app/admin/users/page.tsx" "app/admin/layout.tsx")
middleware=("middleware.ts")
routes=("app/auth/callback/route.ts")
docs=("SETUP.md" "FLUJO.md" "TROUBLESHOOTING.md" "GENERATED_FILES.md" "README_GENERACIÓN.md")

# Función para verificar archivos
verify_files() {
    local category=$1
    shift
    local files=("$@")
    
    echo "📁 $category:"
    local found=0
    local missing=0
    
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            echo "  ✅ $file"
            ((found++))
        else
            echo "  ❌ $file (FALTA)"
            ((missing++))
        fi
    done
    
    echo "  Total: $found encontrados, $missing faltantes"
    echo ""
    
    return $missing
}

# Verificar cada categoría
verify_files "Tipos TypeScript" "${types[@]}"
verify_files "Clientes Supabase" "${supabase[@]}"
verify_files "Hooks Personalizados" "${hooks[@]}"
verify_files "Componentes UI Base" "${ui_components[@]}"
verify_files "Componentes Auth" "${auth_components[@]}"
verify_files "Componentes Dashboard" "${dashboard_components[@]}"
verify_files "Componentes Admin" "${admin_components[@]}"
verify_files "Navbar" "${navbar[@]}"
verify_files "Páginas" "${pages[@]}"
verify_files "Middleware" "${middleware[@]}"
verify_files "Rutas API" "${routes[@]}"
verify_files "Documentación" "${docs[@]}"

echo ""
echo "================================"
echo "✅ VERIFICACIÓN COMPLETADA"
echo "================================"
echo ""
echo "📋 Próximos pasos:"
echo "1. Lee SETUP.md para instrucciones de instalación"
echo "2. Ejecuta el SQL en Supabase"
echo "3. Crea .env.local con tus credenciales"
echo "4. Ejecuta: npm install"
echo "5. Ejecuta: npm run dev"
echo ""
echo "💡 Tip: Si algún archivo falta, verifica que lo creaste correctamente"
