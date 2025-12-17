export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

// Nota: mantener un único `export type Database` generado por Supabase.
// El contenido siguiente proviene del esquema generado automáticamente.
// Tipos generados automáticamente de Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          role: "admin" | "usuario";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          role?: "admin" | "usuario";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          role?: "admin" | "usuario";
          created_at?: string;
          updated_at?: string;
        };
      };
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          subscription_type: "FREE" | "BASIC" | "PREMIUM";
          start_date: string;
          end_date: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          subscription_type?: "FREE" | "BASIC" | "PREMIUM";
          start_date?: string;
          end_date?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          subscription_type?: "FREE" | "BASIC" | "PREMIUM";
          start_date?: string;
          end_date?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {
      update_updated_at_column: {
        Args: Record<string, never>;
        Returns: undefined;
      };
      handle_new_user: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: {
      user_role: "admin" | "usuario";
      subscription_type: "FREE" | "BASIC" | "PREMIUM";
    };
  };
};
