import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ReviewerForm } from '@/components/reviewer-form';
import { ReviewerFormData } from '@/types';
import AdminLayout from '@/layouts/admin-layout'; 
import { BreadcrumbItem } from '@/types';


// 🔁 Define breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Reviewers', href: '/reviewers' },
];

export default function ReviewersIndex() {
  const [showForm, setShowForm] = useState(false);
  const [reviewers, setReviewers] = useState<ReviewerFormData[]>([]);
  const initialData = { name: '', email: '', role: '' };
  const [formData, setFormData] = useState(initialData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (field: keyof ReviewerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (editingIndex !== null) {
    // ✏️ Editing existing reviewer
    const updatedList = [...reviewers];
    updatedList[editingIndex] = formData;
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
              <CardTitle>Add New Reviewer</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewerForm
                data={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
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
              <ul className="space-y-4">
                {reviewers.map((reviewer, index) => (
                   <li key={index} className="border-b pb-4 mb-4 flex justify-between items-start">
          <div>
            <p><strong>Name:</strong> {reviewer.name}</p>
            <p><strong>Email:</strong> {reviewer.email}</p>
            <p><strong>Role:</strong> {reviewer.role}</p>
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