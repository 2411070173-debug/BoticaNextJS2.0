"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthUser, Profile, UserSubscription } from "@/types/entities";

interface UseAuthReturn {
  user: AuthUser | null;
  profile: Profile | null;
  subscription: UserSubscription | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (authUser) {
          setUser({
            id: authUser.id,
            email: authUser.email,
            user_metadata: authUser.user_metadata,
          });

          // Obtener perfil
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", authUser.id)
            .single();

          if (profileError) throw profileError;
          setProfile(profileData);

          // Obtener suscripción
          const { data: subData, error: subError } = await supabase
            .from("user_subscriptions")
            .select("*")
            .eq("user_id", authUser.id)
            .single();

          // Si no hay suscripción o hay error, crear una suscripción FREE por defecto
          if (subError || !subData) {
            setSubscription({
              id: "default-free",
              user_id: authUser.id,
              subscription_type: "FREE",
              is_active: true,
              start_date: new Date().toISOString(),
              end_date: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          } else {
            setSubscription(subData);
          }
        }
      } catch (err) {
        // Si el error es por variables de entorno faltantes, no establecer error
        const errorMessage = err instanceof Error ? err.message : String(err);
        if (!errorMessage.includes("Faltan variables de entorno")) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Suscribirse a cambios de autenticación
    let authSubscription: ReturnType<
      ReturnType<typeof createClient>["auth"]["onAuthStateChange"]
    >["data"]["subscription"];

    try {
      const supabase = createClient();
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_OUT" || !session) {
          setUser(null);
          setProfile(null);
          setSubscription(null);
        }
      });
      authSubscription = subscription;

      return () => {
        authSubscription?.unsubscribe();
      };
    } catch {
      // Si no hay variables de entorno, no suscribirse a cambios
      return undefined;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSubscription(null);
    } catch {
      // Si hay error (ej: variables de entorno faltantes), solo limpiar estado local
      setUser(null);
      setProfile(null);
      setSubscription(null);
    }
  }, []);

  const isAdmin = profile?.role === "admin";

  return { user, profile, subscription, loading, error, signOut, isAdmin };
}
