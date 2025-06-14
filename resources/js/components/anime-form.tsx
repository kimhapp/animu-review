import React from 'react';
import ReactSelect from 'react-select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type GenreOption = { id: number; name: string };
type CategoryOption = { id: number; name: string };

type Props = {
  data: {
    title: string;
    native_title: string;
    country : string;
    description: string;
    type: string;
    release_date: string;
    director: string;
    studio: string;
    episodes: number;
    genre_ids: number[];
    category_id: number;
    cover?: string;
    coverFile?: File;
  };
  genres: GenreOption[];
  categories: CategoryOption[];
  onChange: (field: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function AnimeForm({ data, genres, categories, onChange, onSubmit }: Props) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        onChange('cover', event.target?.result as string);
        onChange('coverFile', file);
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
      {/* country */}
      <div className="space-y-2">
        <label htmlFor="country">Country</label>
        <Input
          id="country"
          value={data.country}
          onChange={(e) => onChange('country', e.target.value)}
        />
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

      {/* Type */}
      <div className="space-y-2">
        <label>Type</label>
        <select
          value={data.type}
          onChange={(e) => onChange('type', e.target.value)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="">Select Type</option>
          <option value="TV Series">TV Series</option>
          <option value="Movie">Movie</option>
          <option value="OVA">OVA</option>
          <option value="Special">Special</option>
        </select>
      </div>

 {/* Better Genre Multi-Select */}
<div className="space-y-2">
  <label htmlFor="genres">Genres</label>
  <ReactSelect
    options={genres}
    isMulti
    getOptionLabel={(genre) => genre.name}
    getOptionValue={(genre) => genre.id.toString()}
    value={genres.filter((g) => data.genre_ids.includes(g.id))}
    onChange={(selected) => {
      const ids = selected ? selected.map((g) => g.id) : [];
      onChange('genre_ids', ids);
    }}
    className="text-sm"
  />
</div>

      {/* Category Dropdown */}
      <div className="space-y-2">
        <label>Category</label>
        <select
          value={data.category_id}
          onChange={(e) => onChange('category_id', Number(e.target.value))}
          className="w-full border rounded-md px-3 py-2"
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
          value={data.episodes || ''}
          onChange={(e) => onChange('episodes', parseInt(e.target.value) || 0)}
        />
      </div>

      {/* Cover Upload */}
      <div className="space-y-2">
        <label>Cover Image</label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="cover-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="cover-upload"
            className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90"
          >
            Choose Image
          </label>
          <span className="text-sm text-muted-foreground truncate max-w-xs">
            {data.coverFile?.name || 'No file chosen'}
          </span>
        </div>
        {data.cover && (
          <img
            src={data.cover}
            alt="Preview"
            className="mt-2 w-32 h-auto rounded border"
          />
        )}
      </div>

      <Button type="submit">Save Anime</Button>
    </form>
  );
}