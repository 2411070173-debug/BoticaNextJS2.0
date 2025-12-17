import { Database } from "./database";

export type UserRole = "admin" | "usuario";
export type SubscriptionType = "FREE" | "BASIC" | "PREMIUM";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  subscription_type: SubscriptionType;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Para respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Para contextos/estado
export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface UserWithProfile extends AuthUser {
  profile: Profile;
  subscription: UserSubscription;
}
