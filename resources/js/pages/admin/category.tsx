import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CategoryForm } from '@/components/category-form';
import AdminLayout from '@/layouts/admin-layout';
import { BreadcrumbItem } from '@/types';

// 🔁 Define breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Categories', href: '/categories' },
];

type CategoryFormData = {
  name: string;
  description?: string;
};

export default function CategoriesIndex() {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState<CategoryFormData[]>([]);
  const initialData = { name: '', description: '' };
  const [formData, setFormData] = useState<CategoryFormData>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (field: keyof CategoryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // ✏️ Editing existing category
      const updatedList = [...categories];
      updatedList[editingIndex] = formData;
      setCategories(updatedList);
      setEditingIndex(null);
    } else {
      // ➕ Adding new category
      setCategories((prev) => [...prev, formData]);
    }

    // Reset form
    setFormData(initialData);
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const categoryToEdit = categories[index];
    setFormData(categoryToEdit);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <Button type="button" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 size-4" />
            Add Category
          </Button>
        </div>

        {/* Category Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingIndex !== null ? 'Edit Category' : 'Add New Category'}</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryForm
                data={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        )}

        {/* Category List */}
        <Card>
          <CardHeader>
            <CardTitle>Category List</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <p className="text-muted-foreground">No categories found.</p>
            ) : (
              <ul className="space-y-4">
                {categories.map((category, index) => (
                  <li key={index} className="border-b pb-4 mb-4 flex justify-between items-start">
                    <div>
                      <p><strong>Name:</strong> {category.name}</p>
                      {category.description && (
                        <p><strong>Description:</strong> {category.description}</p>
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