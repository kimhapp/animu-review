import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// User & Auth
export interface User {
  id: number;
  name: string;
  email: string;
  imageUrl?: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  bio?: string;
  follower_count: number;
  [key: string]: unknown;
}

export interface Auth {
  user: User;
}

// Navigation
export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon | null;
  isActive?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

// Shared Layout Data
export interface SharedData {
  name: string;
  quote: { message: string; author: string };
  auth: Auth;
  ziggy: Config & { location: string };
  sidebarOpen: boolean;
  [key: string]: unknown;
}

// Anime Domain
export interface Anime {
  id: number;
  title: string;
  native_title: string;
  description: string
  studio: string;
  release_date: string;
  user_rating: number;
  favorite_count: number;
  imageUrl: string;
  genres?: Genre[];
  category?: Category;
  review?: Review;
  country?: Country;
}

export type Genre = {
  id: number;
  name: string;
  description?: string | null;
};

export type Category = {
  id: number;
  name: string;
  description?: string | null;
};

export type Country = {
  id: number;
  name: string;
};

// Review Domain
export interface Review {
  id: number;
  content: string;
  rating_amount: number;
  user: User;
}

export interface ReviewWithAnime {
  id: number;
  anime: Anime;
  rating: number;
}

// Pagination Utility
export type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
};

// Profile Page Props
export interface ProfilePageProps {
  user: User;
  favoriteAnime: Paginated<Anime>;
  reviewedAnime: Paginated<ReviewWithAnime>;
  ratingAnime: PaginatedResponse<Anime>;
}

// Review Form Props
export type ReviewFormProps = {
  animeList: { id: number; title: string; imageUrl: string }[];
  onSave: (data: { anime_id: number; rating: number; reviewText: string }) => void;
  onCancel: () => void;
  initialReview?: {
    anime_id: number;
    rating: number;
    content: string;
    anime: { id: number; title: string; imageUrl: string };
  };
  is_rating?: boolean;
};

