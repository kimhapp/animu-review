import React from 'react';
import { ReviewerFormData } from '@/types/index';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// 🔁 Define the type directly here
// type ReviewerFormData = {
//   name: string;
//   email: string;
//   role: string;
//};

type Props = {
  data: ReviewerFormData;
  onChange: (field: keyof ReviewerFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function ReviewerForm({ data, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select onValueChange={(value) => onChange('role', value)} value={data.role}>
          <SelectTrigger id="role">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="reviewer">Reviewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Save Reviewer</Button>
    </form>
  );
}