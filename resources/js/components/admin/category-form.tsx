
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type CategoryFormData = {
  name: string;
  description?: string;
};

type Props = {
  data: CategoryFormData;
  onChange: (field: keyof CategoryFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function CategoryForm({ data, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="category-name">Category Name</label>
        <Input
          id="category-name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Fiction"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category-description">Description (optional)</label>
        <Input
          id="category-description"
          value={data.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Optional description"
        />
      </div>

      <div className="flex space-x-2 pt-2">
        <Button type="submit">Save Category</Button>
      </div>
    </form>
  );
}