import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type CountryFormData = {
  name: string;
};

type CountryFormProps = {
  data: CountryFormData;
  onChange: (field: 'name', value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function CountryForm({ data, onChange, onSubmit }: CountryFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Country Name</label>
        <Input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          required
        />
      </div>
      <Button type="submit">Save Country</Button>
    </form>
  );
}

