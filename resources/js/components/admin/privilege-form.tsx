import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';

type PrivilegeUserFormData = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type RegisteredUser = {
  id: number; name: string; email: string
};

type PrivilegeFormProps = {
  data: PrivilegeUserFormData;
  onChange: (field: keyof PrivilegeUserFormData, value: string | number) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing?: boolean;
  registeredUsers: RegisteredUser[];
};

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'reviewer', label: 'Reviewer' }
];

export function PrivilegeForm({ data, onChange, onSubmit, isEditing = false, registeredUsers }: PrivilegeFormProps) {
  const handleEmailChange = (email: string) => {
    onChange('email', email);
    const selectedUser = registeredUsers.find(user => user.email === email);
    if (selectedUser) {
      onChange('name', selectedUser.name);
      onChange('id', selectedUser.id);
    } else {
      onChange('name', '');
      onChange('id', 0);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
        {isEditing ? (
          <input
            type="text"
            value={data.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        ) : (
          <Select value={data.email} onValueChange={handleEmailChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select an email" />
            </SelectTrigger>
            <SelectContent>
              {registeredUsers.map((user) => (
                <SelectItem key={user.email} value={user.email}>
                  {user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
        <input
          id="name"
          type="text"
          value={data.name}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
          placeholder="Name will auto-fill after selecting email"
        />
      </div>

      {/* Role Selector */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-white mb-2">Function Role</label>
        <Select value={data.role} onValueChange={(value) => onChange('role', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={!data.email || !data.role}>
        {isEditing ? 'Update Privilege' : 'Save Privilege'}
      </Button>
    </form>
  );
}
