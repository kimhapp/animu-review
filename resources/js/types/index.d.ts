import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

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
    [key: string]: unknown; // This allows for additional properties...
}

export interface Anime {
    id: number;
    title: string;
    nativeTitle: string;
    studio: string;
    year: number;
    imageUrl: string;
    description: string;
    favorite_count: number;
    user_rating: number;
    release_date: string;
    review?: Review | null;
    genres: Genre[];
    category: Category;
}

export interface AnimeListProps {
    animes: Anime[];
    genres: Genre[];
    categories: Category[];
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

export type Review = { rating_amount: number };

type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
};

export interface ProfilePageProps {
    user: User;
    favoriteAnime: Paginated<Anime>;
    reviewedAnime: Paginated<ReviewWithAnime>;
  }

export interface ReviewWithAnime {
    id: number;
    anime: Anime;
    rating: number;
    // other review fields if any
}

export type ReviewerFormData = {
    name: string;
    email: string;
    role: string;
};