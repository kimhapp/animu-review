import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PrivilegeForm } from '@/components/admin/privilege-form';
import AdminLayout from '@/layouts/admin-layout';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';

// 🔁 Define breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Privilege', href: '/privilege' },
];

type PrivilegeUserFormData = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type PrivilegeIndexProps = {
  privilegedUsers: PrivilegeUserFormData[];
  registeredUsers: { id: number; name: string; email: string }[];
};

export default function PrivilegeIndex({ privilegedUsers: initialPrivilegedUsers, registeredUsers }: PrivilegeIndexProps) {
  const [privilegeUsers, setPrivilegeUsers] = useState<PrivilegeUserFormData[]>(initialPrivilegedUsers);
  const [showForm, setShowForm] = useState(false);
  const initialData = { id: 0, name: '', email: '', role: '' };
  const [formData, setFormData] = useState<PrivilegeUserFormData>(initialData);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { props } = usePage() as { props: { flash?: { success?: string }, errors?: Record<string, any> } };

  // Extract flash messages or errors from Inertia props
  const successMessage = props.flash?.success || '';
  const errors = props.errors || {};

  useEffect(() => {
    if (successMessage) {
      alert(successMessage);  // Replace with nicer UI notification
      setShowForm(false);     // Close form on success
      setEditingId(null);     // Clear editing state
      // Optionally refresh or update local privilegeUsers list
    }
  }, [successMessage]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      alert('Error: ' + JSON.stringify(errors));  // Show error alert or notification
    }
  }, [errors]);

  const handleChange = (field: keyof PrivilegeUserFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    const submitData = {
      user_id: formData.id,
      new_role: formData.role,
    };

    if (editingId !== null) {
      const user = privilegeUsers.find((user) => user.id === editingId);
      if (!user) return;
        router.put(route('admin.privilege.update', { user: user.id }), submitData, {
        onSuccess: () => {
          router.visit(route('admin.privilege'))
        },
      });
    } else {
      router.post(route('admin.privilege.store'), submitData, {
        onSuccess: () => {
          router.visit(route('admin.privilege'))
        },
      });
    }
  };

  const handleEdit = (id: number) => {
    const user = privilegeUsers.find((user) => user.id === id);
    if (!user) return;
    setFormData(user);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this privilege user?')) {
      router.delete(route('admin.privilege.destroy', id), {
        onSuccess: () => {
          router.visit(route('admin.privilege'));
        },
      });
    }
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' ? 'Admin' : role === 'reviewer' ? 'Reviewer' : role;
  };

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Privilege Users</h1>
          <Button type="button" onClick={() => setShowForm(true)}>
            <Plus className="mr-2 size-4" />
            Promote User
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingId !== null ? 'Edit User Role' : 'Promote User'}</CardTitle>
            </CardHeader>
            <CardContent>
              <PrivilegeForm
                data={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isEditing={editingId !== null}
                registeredUsers={registeredUsers}
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Privilege Users List</CardTitle>
          </CardHeader>
          <CardContent>
            {privilegeUsers.length === 0 ? (
              <p className="text-muted-foreground">No users found.</p>
            ) : (
              <ul className="space-y-4">
                {privilegeUsers.map((user) => (
                  <li key={user.id} className="border-b pb-4 mb-4 flex justify-between items-start">
                    <div>
                      <p><strong>Name:</strong> {user.name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Role:</strong> {getRoleLabel(user.role)}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(user.id)}>
                        Edit Role
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                        Demote
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
