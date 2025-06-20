import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ReviewerForm } from '@/components/reviewer-form';
import AdminLayout from '@/layouts/admin-layout'; 
import { BreadcrumbItem } from '@/types';

// 🔁 Define breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Reviewers', href: '/reviewers' },
];

type ReviewerFormData = {
  name: string;
  email: string;
  role: string;
};

export default function ReviewersIndex() {
  const [showForm, setShowForm] = useState(false);
  const [reviewers, setReviewers] = useState<ReviewerFormData[]>([]);
  const initialData = { name: '', email: '', role: '' };
  const [formData, setFormData] = useState<ReviewerFormData>(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (field: keyof ReviewerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingIndex !== null) {
      // ✏️ Editing existing reviewer - only role can be changed
      const updatedList = [...reviewers];
      updatedList[editingIndex] = { ...updatedList[editingIndex], role: formData.role };
      setReviewers(updatedList);
      setEditingIndex(null);
    } else {
      // ➕ Adding new reviewer
      setReviewers((prev) => [...prev, formData]);
    }

    // Reset form
    setFormData(initialData);
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    const reviewerToEdit = reviewers[index];
    setFormData(reviewerToEdit);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this reviewer?')) {
      setReviewers(reviewers.filter((_, i) => i !== index));
    }
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' ? 'Admin' : role === 'reviewer' ? 'Reviewer' : role;
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Reviewers</h1>
          <Button type="button" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 size-4" />
            Add Reviewer
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingIndex !== null ? 'Edit Reviewer Role' : 'Add New Reviewer'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewerForm
                data={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isEditing={editingIndex !== null}
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Reviewers List</CardTitle>
          </CardHeader>
          <CardContent>
            {reviewers.length === 0 ? (
              <p className="text-muted-foreground">No reviewers found.</p>
            ) : (
              <div className="grid gap-4">
                {reviewers.map((reviewer, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{reviewer.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reviewer.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {getRoleLabel(reviewer.role)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Email:</span> {reviewer.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Role:</span> {getRoleLabel(reviewer.role)}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(index)}>
                          Edit Role
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

