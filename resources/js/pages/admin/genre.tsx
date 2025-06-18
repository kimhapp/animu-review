import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GenreForm } from '@/components/genre-form';
import AdminLayout from '@/layouts/admin-layout';
import { BreadcrumbItem } from '@/types';

// 🔁 Define breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Genres', href: '/genres' },
];

type GenreFormData = {
  name: string;
  description?: string;
};

export default function GenresIndex() {
  const [showForm, setShowForm] = useState(false);
  const [genres, setGenres] = useState<GenreFormData[]>([]);
  const initialData = { name: '', description: '' };
  const [formData, setFormData] = useState<GenreFormData>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (field: keyof GenreFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // ✏️ Editing existing genre
      const updatedList = [...genres];
      updatedList[editingIndex] = formData;
      setGenres(updatedList);
      setEditingIndex(null);
    } else {
      // ➕ Adding new genre
      setGenres((prev) => [...prev, formData]);
    }

    // Reset form
    setFormData(initialData);
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const genreToEdit = genres[index];
    setFormData(genreToEdit);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this genre?')) {
      setGenres(genres.filter((_, i) => i !== index));
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
              <CardTitle>{editingIndex !== null ? 'Edit Genre' : 'Add New Genre'}</CardTitle>
            </CardHeader>
            <CardContent>
              <GenreForm
                data={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
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
                {genres.map((genre, index) => (
                  <li key={index} className="border-b pb-4 mb-4 flex justify-between items-start">
                    <div>
                      <p><strong>Name:</strong> {genre.name}</p>
                      {genre.description && (
                        <p><strong>Description:</strong> {genre.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(index)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>
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