import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CountryForm } from '@/components/country-form';
import AdminLayout from '@/layouts/admin-layout';
import { BreadcrumbItem } from '@/types';

// 🔁 Define breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Countries', href: '/countries' },
];

type CountryFormData = {
  name: string;
};

export default function CountriesIndex() {
  const [showForm, setShowForm] = useState(false);
  const [countries, setCountries] = useState<CountryFormData[]>([]);
  const initialData = { name: '' };
  const [formData, setFormData] = useState<CountryFormData>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (field: 'name', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // ✏️ Editing existing country
      const updatedList = [...countries];
      updatedList[editingIndex] = formData;
      setCountries(updatedList);
      setEditingIndex(null);
    } else {
      // ➕ Adding new country
      setCountries((prev) => [...prev, formData]);
    }

    // Reset form
    setFormData(initialData);
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const countryToEdit = countries[index];
    setFormData(countryToEdit);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      setCountries(countries.filter((_, i) => i !== index));
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
              <CardTitle>{editingIndex !== null ? 'Edit Country' : 'Add New Country'}</CardTitle>
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
              <div className="grid gap-4">
                {countries.map((country, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{country.name}</h3>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(index)}>
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

