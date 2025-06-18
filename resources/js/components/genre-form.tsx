import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type GenreFormData = {
  name: string;
  description?: string;
};

type Props = {
  data: GenreFormData;
  onChange: (field: keyof GenreFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function GenreForm({ data, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="genre-name">Genre Name</label>
        <Input
          id="genre-name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Horror"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="genre-description">Description (optional)</label>
        <Input
          id="genre-description"
          value={data.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Optional description"
        />
      </div>

      <div className="flex space-x-2 pt-2">
        <Button type="submit">Save Genre</Button>
      </div>
    </form>
  );
}