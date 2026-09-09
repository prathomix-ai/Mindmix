export type UserRole = "user" | "admin";

export type SubscriptionStatus = "free" | "pro" | "enterprise";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  subscription_status: SubscriptionStatus;
  created_at: string;
  updated_at?: string;
  last_sign_in_at?: string;
}

export interface SiteSettings {
  id: string;
  hero_headline: string;
  hero_subheadline: string;
  cta_text: string;
  pro_price_monthly: number;
  pro_price_yearly: number;
  announcement_banner?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface AdminStats {
  totalUsers: number;
  proUsers: number;
  freeUsers: number;
  mrr: number;
}
