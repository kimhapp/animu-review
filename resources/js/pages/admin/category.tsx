import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CategoryForm } from '@/components/admin/category-form';
import AdminLayout from '@/layouts/admin-layout';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';

// 🔁 Define breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Categories', href: '/categories' },
];

type CategoryFormData = {
  id: number;
  name: string;
  description?: string;
};

type PageProps = {
  categories: CategoryFormData[];
};

export default function CategoriesIndex() {
  const [showForm, setShowForm] = useState(false);
  const { categories } = usePage<PageProps>().props;
  const [categoryList, setCategoryList] = useState<CategoryFormData[]>(categories);
  const initialData: CategoryFormData = { id: 0, name: '', description: '' };
  const [formData, setFormData] = useState<CategoryFormData>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (field: keyof CategoryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (editingIndex !== null) {
      const id = categoryList[editingIndex]?.id;
    
      if (!id) return; // failsafe in case the category is missing
    
      router.put(route('admin.category.update', { category: id }), formData, {
        onSuccess: () => {
          router.visit(route('admin.category'));
        }
      });
    }
     else {
      // Send POST request to create
      router.post(route('admin.category.store'), formData, {
        onSuccess: () => {
          router.visit(route('admin.category'));
        },
      });
    }
  };

  const handleEdit = (index: number) => {
    const categoryToEdit = categoryList[index];
    setFormData(categoryToEdit);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const category = categoryList[index];
  
    if (!category) return;
  
    if (window.confirm('Are you sure you want to delete this category?')) {
      router.delete(route('admin.category.destroy', category.id), {
        onSuccess: () => {
          setCategoryList((prev) => prev.filter((_, i) => i !== index));
        },
      });
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
          {categoryList.length === 0 ? (
            <p className="text-muted-foreground">No categories found.</p>
          ) : (
            <ul className="space-y-4">
              {categoryList.map((category, index) => (
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