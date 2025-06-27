import React, { useEffect } from 'react';
import ReactSelect from 'react-select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type AnimeFormData = {
  title: string;
  native_title: string;
  country_id: number;          // country ID
  description: string;
  release_date: string;     // ISO date string, e.g. '2024-06-21'
  duration?: number;        // optional number of minutes
  total_episodes?: number;  // optional number
  is_finished?: boolean;
  director: string;
  studio: string;
  category_id: number;      // category ID
  imageUrl?: string;        // optional image URL
  genre_ids: number[];      // array of genre IDs (required, min 1)
}

type GenreOption = { id: number; name: string };
type CategoryOption = { id: number; name: string };
type CountryOption = { id: number; name: string };

type Props = {
  data: AnimeFormData
  genres: GenreOption[];
  categories: CategoryOption[];
  countries: CountryOption[];
  onChange: (field: keyof AnimeFormData | 'coverFile' | 'imageUrl', value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors?: Record<string, string>;
};

export function AnimeForm({ data, genres, categories, countries, onChange, onSubmit, errors }: Props) {
  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      console.error('Validation failed', errors);
    }
  }, [errors]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

    reader.onload = (event) => {
      // Only use this for preview
      const previewUrl = event.target?.result as string;
      onChange('coverFile', file);           // store the file for preview or later upload
      onChange('imageUrl', '');              // clear the imageUrl (or keep the old one)
    };
    
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* English Title */}
      <div className="space-y-2">
        <label htmlFor="title">English Title</label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>

      {/* Native Title */}
      <div className="space-y-2">
        <label htmlFor="native_title">Native Title</label>
        <Input
          id="native_title"
          value={data.native_title}
          onChange={(e) => onChange('native_title', e.target.value)}
        />
      </div>

      {/* Country Dropdown */}
      <div className="space-y-2">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          value={data.country_id}
          onChange={(e) => onChange('country_id', e.target.value ? Number(e.target.value) : null)}
          className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>

      {/* Better Genre Multi-Select */}
      <div className="space-y-2">
        <label htmlFor="genres">Genres</label>
        <ReactSelect
          options={genres}
          isMulti
          getOptionLabel={(genre) => genre.name}
          getOptionValue={(genre) => genre.id.toString()}
          value={genres.filter((genre) => (data.genre_ids || []).includes(genre.id))}
          onChange={(selected) => {
            const ids = Array.isArray(selected) ? selected.map((g) => g.id) : [];
            onChange('genre_ids', ids);
          }}
          className="text-sm"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: '#1f2937', // Tailwind bg-gray-800
              borderColor: state.isFocused ? '#7c3aed' : '#374151', // purple-600 focus or gray-700 default
              boxShadow: state.isFocused ? '0 0 0 1px #7c3aed' : 'none',
              color: '#d1d5db', // Tailwind text-gray-300
              '&:hover': {
                borderColor: '#7c3aed', // purple-600 on hover
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: '#1f2937', // bg-gray-800
              color: '#d1d5db',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused
                ? '#4c1d95' // purple-900 hover/focus
                : '#1f2937', // bg-gray-800
              color: state.isFocused ? '#f9fafb' : '#d1d5db', // text-gray-50 or text-gray-300
              cursor: 'pointer',
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: '#6b7280', // Tailwind bg-gray-500
              color: '#f9fafb', // Tailwind text-gray-50
            }),
            multiValueLabel: (base) => ({
              ...base,
              color: '#f9fafb', // text-gray-50
            }),
            multiValueRemove: (base) => ({
              ...base,
              color: '#d1d5db', // text-gray-300
              ':hover': {
                backgroundColor: '#7c3aed', // purple-600
                color: 'white',
              },
            }),
            singleValue: (base) => ({
              ...base,
              color: '#d1d5db', // text-gray-300
            }),
            placeholder: (base) => ({
              ...base,
              color: '#9ca3af', // text-gray-400
            }),
          }}
        />
      </div>

      {/* Category Dropdown */}
      <div className="space-y-2">
        <label>Category</label>
        <select
          value={data.category_id}
          onChange={(e) => onChange('category_id', e.target.value ? Number(e.target.value) : null)}
          className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Release Date */}
      <div className="space-y-2">
        <label>Release Date</label>
        <input
          type="date"
          value={data.release_date}
          onChange={(e) => onChange('release_date', e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      {/* Director */}
      <div className="space-y-2">
        <label>Director</label>
        <Input
          value={data.director}
          onChange={(e) => onChange('director', e.target.value)}
        />
      </div>

      {/* Studio */}
      <div className="space-y-2">
        <label>Studio</label>
        <Input
          value={data.studio}
          onChange={(e) => onChange('studio', e.target.value)}
        />
      </div>

      {/* Episodes */}
      <div className="space-y-2">
        <label>Total Episodes (0 if ongoing)</label>
        <Input
          type="number"
          min="0"
          value={data.total_episodes?.toString() || ''}
          onChange={(e) => onChange('total_episodes', parseInt(e.target.value) || 0)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="is_finished">Finished?</label>
        <input
          type="checkbox"
          id="is_finished"
          checked={!!data.is_finished}
          onChange={(e) => onChange('is_finished', e.target.checked)}
        />
      </div>

      {/* Cover Image URL */}
      <div className="space-y-2">
        <label htmlFor="coverFile">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          id="coverFile"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt="Cover Preview"
            className="mt-2 w-32 h-auto rounded border"
          />
        )}
      </div>

      <Button type="submit">Save Anime</Button>
    </form>
  );
}