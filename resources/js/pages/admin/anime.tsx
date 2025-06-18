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
import { BreadcrumbItem } from '@/types';
import { AnimeForm } from '@/components/anime-form';

// 🔁 Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Animes', href: '/animes' },
];

type GenreOption = { id: number; name: string };
type CategoryOption = { id: number; name: string };

type AnimeType = {
  id: number;
  title: string;
  native_title: string;
  country: string;
  description: string;
  type: string;
  release_date: string;
  director: string;
  studio: string;
  episodes: number;
  genre_ids: number[];
  genre_names: string[];
  category_id: number;
  category_name: string;
  cover?: string;
  coverFile?: File;
};

export default function AnimesIndex() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [animes, setAnimes] = useState<AnimeType[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    native_title: '',
    country: '',
    description: '',
    type: '',
    release_date: '',
    director: '',
    studio: '',
    episodes: 0,
    genre_ids: [] as number[],
    genre_names: [] as string[],
    category_id: 0,
    category_name: '',
    cover: '',
    coverFile: undefined as File | undefined,
  });

  // Mock data
  const mockGenres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Romance' },
    { id: 3, name: 'Fantasy' },
  ];

  const mockCategories = [
    { id: 1, name: 'TV Series' },
    { id: 2, name: 'Movie' },
    { id: 3, name: 'OVA' },
  ];

  const handleChange = (
    field: string,
    value: string | number | number[] | File | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedGenres = mockGenres.filter((g) =>
  formData.genre_ids.includes(g.id)
);
const genreNames = selectedGenres.map((g) => g.name);
    const newCategoryName =
      mockCategories.find((c) => c.id === formData.category_id)?.name || '';

    const commonData = {
      ...formData,
      genre_names: genreNames,
      category_name: newCategoryName,
    };
  if (editingId !== null) {
    setAnimes(
      animes.map((anime) =>
        anime.id === editingId
          ? { ...commonData, id: editingId }
          : anime
      )
    );
    setEditingId(null);
  } else {
    const newAnime = {
      id: Date.now(),
      ...commonData, // Includes updated genre_names
    };
    setAnimes([...animes, newAnime]);
}
    // Reset form
    setFormData({
      title: '',
      native_title: '',
      country: '',
      description: '',
      type: '',
      release_date: '',
      director: '',
      studio: '',
      episodes: 0,
      genre_ids: [],
      genre_names: [],
      category_id: 0,
      category_name: '',
      cover: '',
      coverFile: undefined,
    });
    setShowForm(false);
  };

  const handleEdit = (anime: AnimeType) => {
    setFormData({
      title: anime.title,
      native_title: anime.native_title,
      country: anime.country,
      description: anime.description,
      type: anime.type,
      release_date: anime.release_date,
      director: anime.director,
      studio: anime.studio,
      episodes: anime.episodes,
      genre_ids: anime.genre_ids,
      genre_names: anime.genre_names,
      category_id: anime.category_id,
      category_name: anime.category_name,
      cover: anime.cover || '',
      coverFile: anime.coverFile,
    });
    setEditingId(anime.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this anime?')) {
      setAnimes(animes.filter((anime) => anime.id !== id));
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

        {/* Anime Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Anime' : 'Add New Anime'}</CardTitle>
            </CardHeader>
            <CardContent>
              <AnimeForm
                data={{
                  title: formData.title,
                  native_title: formData.native_title,
                  country: formData.country,
                  description: formData.description,
                  type: formData.type,
                  release_date: formData.release_date,
                  director: formData.director,
                  studio: formData.studio,
                  episodes: formData.episodes,
                  genre_ids: formData.genre_ids,
                  category_id: formData.category_id,
                  cover: formData.cover,
                  coverFile: formData.coverFile,
                }}
                genres={mockGenres}
                categories={mockCategories}
                onChange={handleChange}
                onSubmit={handleSubmit}
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
            {animes.length === 0 ? (
              <p className="text-muted-foreground">No animes found.</p>
            ) : (
              <ul className="space-y-4">
                  {animes.map((anime) => (
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
                        {anime.genre_names && anime.genre_names.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            Genres: {anime.genre_names.join(', ')}
                          </p>
                        )}
                        <div className="mt-2 space-x-2 text-xs text-gray-500 flex flex-wrap gap-2">
                          <span>Type: {anime.type || '—'}</span>
                          <span>•</span>
                          <span>Studio: {anime.studio || '—'}</span>
                          <span>•</span>
                          <span>Episodes: {anime.episodes > 0 ? anime.episodes : 'Ongoing'}</span>
                          <span>•</span>
                          <span>Released: {anime.release_date || '—'}</span>
                          <span>•</span>
                          <span>Director: {anime.director || '—'}</span>
                        </div>
                      </div>

                      {anime.cover && (
                        <img
                          src={anime.cover}
                          alt={anime.title}
                          className="w-20 h-28 object-cover rounded mt-2 md:mt-0"
                        />
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-2 md:mt-0">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(anime)}>
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