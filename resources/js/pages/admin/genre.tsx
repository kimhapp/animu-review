import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GenreForm } from '@/components/admin/genre-form';
import AdminLayout from '@/layouts/admin-layout';
import { BreadcrumbItem } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';

type GenreFormData = {
  id: number;
  name: string;
  description?: string;
};

type PageProps = {
  genres: GenreFormData[];
};

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Genres', href: '/genres' },
];

export default function GenresIndex() {
  const { genres } = usePage<PageProps>().props;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<GenreFormData>({ id: 0, name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (field: keyof GenreFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { post, put, delete: destroy } = useForm<GenreFormData>(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      router.put(route('admin.genre.update', { genre: editingId }), formData, {
        onSuccess: () => {
          setEditingId(null);
          setShowForm(false);
          router.visit(route('admin.genre'));
        },
      });
    } else {
      router.post(route('admin.genre.store'), formData, {
        onSuccess: () => {
          setShowForm(false);
          router.visit(route('admin.genre'));
        },
      });
    }
  };

  const handleEdit = (id: number) => {
    const genre = genres.find((genre) => genre.id === id);
    if (!genre) return;
    setFormData(genre);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      router.delete(route('admin.genre.destroy', { genre: id }), {
        onSuccess: () => router.visit(route('admin.genre')),
      });
    }
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Genres</h1>
          <Button type="button" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 size-4" />
            Add Genre
          </Button>
        </div>

        {/* Genre Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingId !== null ? 'Edit Genre' : 'Add New Genre'}</CardTitle>
            </CardHeader>
            <CardContent>
              <GenreForm data={formData} onChange={handleChange} onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        )}

        {/* Genre List */}
        <Card>
          <CardHeader>
            <CardTitle>Genre List</CardTitle>
          </CardHeader>
          <CardContent>
            {genres.length === 0 ? (
              <p className="text-muted-foreground">No genres found.</p>
            ) : (
              <ul className="space-y-4">
                {genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="border-b pb-4 mb-4 flex justify-between items-start"
                  >
                    <div>
                      <p><strong>Name:</strong> {genre.name}</p>
                      {genre.description && (
                        <p><strong>Description:</strong> {genre.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(genre.id)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(genre.id)}>
                        Delete
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
