import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { AnimeForm } from '@/components/admin/anime-form';
import { usePage, router } from '@inertiajs/react';
import { deleteFile, generateAnimeCoverPath, isFirebaseStorageUrl, uploadFile } from '@/lib/storage';
import { BreadcrumbItem } from '@/types';

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Animes', href: '/animes' },
];

type AnimeFormData = {
  id: number
  title: string;
  native_title: string;
  country_id: number;          // country ID
  description: string;
  release_date: string;     // ISO date string, e.g. '2024-06-21'
  duration?: number;        // optional number of minutes
  total_episodes?: number;  // optional number
  is_finished?: boolean;
  director: string;
  studio: string;
  category_id: number;      // category ID
  imageUrl?: string;        // optional image URL
  genre_ids: number[];      // array of genre IDs (required, min 1)
}

type GenreOption = { id: number; name: string };
type CategoryOption = { id: number; name: string };
type CountryOption = { id: number; name: string }; // ✅ define this

type AnimesPageProps = {
  animes: AnimeFormData[];
  genres: GenreOption[];
  categories: CategoryOption[];
  countries: CountryOption[];
};

export default function AnimesIndex() {
  const page = usePage();
  const { animes, genres, categories, countries } = usePage<AnimesPageProps>().props;
  const { errors } = usePage().props;
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState<AnimeFormData>({
    id: 0,
    title: '',
    native_title: '',
    country_id: 0,              // example default country ID
    description: '',
    release_date: '',        // or something like '2024-06-21'
    duration: undefined,
    total_episodes: 0,
    is_finished: false,
    director: '',
    studio: '',
    category_id: 0,
    imageUrl: '',
    genre_ids: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [animeList, setAnimeList] = useState<AnimeFormData[]>(Array.isArray(animes) ? animes : []);

  const handleChange = async (field: string, value: any) => {
    if (field === 'coverFile' && value instanceof File) {
      setUploading(true);
      setUploadProgress(0);
  
      try {
        const path = generateAnimeCoverPath(value);
        const url = await uploadFile(value, path, (progress) => {
          setUploadProgress(progress);
        });
        setFormData((prev) => ({
          ...prev,
          imageUrl: url,
          coverFile: value,
        }));
      } catch (error) {
        alert("Failed to upload cover image.");
        console.error(error);
      } finally {
        setUploading(false);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const submitData = {
      title: formData.title,
      native_title: formData.native_title,
      country_id: formData.country_id,
      description: formData.description,
      release_date: formData.release_date,
      duration: formData.duration || null,
      total_episodes: formData.total_episodes ?? 0,
      is_finished: formData.is_finished ?? false,
      director: formData.director,
      studio: formData.studio,
      category_id: formData.category_id,
      imageUrl: formData.imageUrl,
      genre_ids: formData.genre_ids || [],
    };

    if (editingId !== null) {
      // Update existing anime via PUT
      router.put(route('admin.anime.update', { anime: editingId }), submitData, {
        onSuccess: () => {
          // Optional: refresh or navigate after success
          router.visit(route('admin.anime'));
          // Reset form and state
          setEditingId(null);
          setShowForm(false);
        },
        onError: (errors) => {
          // Optionally handle validation errors here
        },
      });
    } else {
      // Create new anime via POST
      router.post(route('admin.anime.store'), submitData, {
        onSuccess: () => {
          router.visit(route('admin.anime'));
          setShowForm(false);
        },
        onError: (errors) => {
          // Handle errors if needed
        },
      });
    }
  };

  const handleEdit = (id: number) => {
    const animeToEdit = animeList.find((anime) => anime.id === id);
    if (!animeToEdit) return; // fallback if not found
    setFormData(animeToEdit);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    const anime = animeList.find((a) => a.id === id);
    if (!anime) return;
  
    if (window.confirm('Are you sure you want to delete this anime?')) {
      router.delete(route('admin.anime.destroy', anime.id), {
        onSuccess: () => {
          router.visit(route('admin.anime'));
        },
      });
    }
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Animes</h1>
          <Button type="button" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 size-4" />
            Add Anime
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Anime' : 'Add New Anime'}</CardTitle>
            </CardHeader>
            <CardContent>
              <AnimeForm
                key={editingId ?? 'new'}
                data={formData}
                genres={genres}
                categories={categories}
                countries={countries}
                onChange={handleChange}
                onSubmit={handleSubmit}
                errors={errors}
              />
            </CardContent>
          </Card>
        )}

        {/* Anime List */}
        <Card>
          <CardHeader>
            <CardTitle>Anime List</CardTitle>
          </CardHeader>
          <CardContent>
            {animeList.length === 0 ? (
              <p className="text-muted-foreground">No animes found.</p>
            ) : (
              <ul className="space-y-4">
                {animeList.map((anime) => (
                  <li
                    key={anime.id}
                    className="border-b pb-4 mb-4 flex flex-col md:flex-row md:justify-between md:items-start gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{anime.title}</h3>
                      {anime.native_title && (
                        <p className="text-sm text-muted-foreground">
                          Native: {anime.native_title}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {anime.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Genres: {genres
                          .filter(g => (anime.genre_ids || []).includes(g.id))
                          .map(g => g.name)
                          .join(', ')}
                      </p>
                      <div className="mt-2 space-x-2 text-xs text-gray-500 flex flex-wrap gap-2">
                        <span>Studio: {anime.studio || '—'}</span>
                        <span>•</span>
                        <span>Episodes: {anime.total_episodes && anime.total_episodes > 0 ? anime.total_episodes : 'Ongoing'}</span>
                        <span>•</span>
                        <span>Released: {anime.release_date || '—'}</span>
                        <span>•</span>
                        <span>Director: {anime.director || '—'}</span>
                      </div>
                    </div>

                    {anime.imageUrl && (
                      <img
                        src={anime.imageUrl}
                        alt={anime.title}
                        className="w-20 h-28 object-cover rounded mt-2 md:mt-0"
                      />
                    )}

                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(anime.id)}>
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(anime.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
