import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CountryForm } from '@/components/admin/country-form';
import AdminLayout from '@/layouts/admin-layout';
import { BreadcrumbItem } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Countries', href: '/countries' },
];

type CountryFormData = {
  id: number;
  name: string;
};

type PageProps = {
  countries: CountryFormData[];
};

export default function CountriesIndex() {
  const { countries } = usePage<PageProps>().props;
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CountryFormData>({ id: 0, name: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (field: 'name', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const {
      data,
      setData,
      post,
      put,
      delete: destroy,
      processing,
      reset,
      errors,
    } = useForm<CountryFormData>({ id: 0, name: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      router.put(route('admin.country.update', { country: editingId }), formData, {
        onSuccess: () => {
          setEditingId(null); 
          router.visit(route('admin.country'));
        },
      });
    } else {
      router.post(route('admin.country.store'), formData, {
        onSuccess: () => {
          router.visit(route('admin.country'));
        },
      });
    }
  };

  const handleEdit = (id: number) => {
    const country = countries.find((country) => country.id === id);
    if (!country) return; // fallback if not found
    setFormData(country);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      router.delete(route('admin.country.destroy', id), {
        onSuccess: () => {
          router.visit(route('admin.country'));
        },
      });
    }
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Countries</h1>
          <Button type="button" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 size-4" />
            Add Country
          </Button>
        </div>

        {/* Country Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingId !== null ?'Edit Country' : 'Add New Country'}</CardTitle>
            </CardHeader>
            <CardContent>
              <CountryForm
                data={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        )}

        {/* Country List */}
        <Card>
          <CardHeader>
            <CardTitle>Country List</CardTitle>
          </CardHeader>
          <CardContent>
            {countries.length === 0 ? (
              <p className="text-muted-foreground">No countries found.</p>
            ) : (
              <ul className="space-y-4">
                {countries.map((country, index) => (
                  <li
                    key={index}
                    className="border-b pb-4 mb-4 flex justify-between items-start"
                  >
                    <div>
                      <p><strong>Name:</strong> {country.name}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(country.id)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(country.id)}>
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