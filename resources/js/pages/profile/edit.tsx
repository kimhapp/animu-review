import React from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { route } from 'ziggy-js';

interface User {
  name: string;
  bio: string;
  email: string;
  imageUrl: string;
  bannerUrl: string;
}

interface Props {
  user: User;
  [key: string]: any;
}

export default function EditProfile() {
  const { props } = usePage<Props>();
  const user = props.user;

  const { data, setData, post, processing, errors } = useForm({
    name: user.name || '',
    bio: user.bio || '',
    email: user.email || '',
    password: '',
    password_confirmation: '',
    imageUrl: user.imageUrl || '',
    bannerUrl: user.bannerUrl || '',
  });

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(e.target.name as any, e.target.value);
  };

  // Handle image upload: here just URL input or drag & drop; adjust if you want actual file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setData(e.target.name as any, url);
      // If you want to upload file, you'd need a separate upload logic here
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.patch(route('profile.update'), data);
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <Head title="Edit Profile" />

      {/* Banner */}
      <div
        className="relative max-w-6xl mx-auto h-80 overflow-hidden cursor-pointer bg-gradient-to-r from-purple-700 via-purple-900 to-indigo-900 flex items-center justify-center"
        onClick={() => document.getElementById('bannerUrlInput')?.click()}
      >
        {data.bannerUrl ? (
          <img
            src={data.bannerUrl}
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
        ) : (
          <div className="text-purple-300 font-semibold select-none">
            Click to upload banner photo
          </div>
        )}
        <Input
          id="bannerUrlInput"
          type="file"
          name="bannerUrl"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 bg-black/40 px-3 py-1 rounded-md text-sm font-semibold">
          Edit Banner
        </div>
      </div>

      {/* Profile form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#2D2B55] rounded-b-2xl -mt-15 relative z-10 shadow-xl max-w-6xl mx-auto px-4"
        noValidate
      >
        {/* Profile image */}
        <div className="flex items-center justify-between mb-8 pt-6">
          <div
            className="relative w-28 h-28 rounded-full border-2 border-white bg-black overflow-hidden cursor-pointer hover:ring-4 ring-purple-500 transition"
            onClick={() => document.getElementById('imageUrlInput')?.click()}
          >
            <img
              src={
                data.imageUrl ||
                'https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg'
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <Input
              id="imageUrlInput"
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="absolute bottom-0 w-full text-center text-sm bg-black/60 text-white py-1 select-none">
              Edit
            </div>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          {/* Username */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="name" className="w-40 text-lg font-semibold">Username</Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Username"
              className="flex-1 bg-[#3a3572] border border-purple-500"
              autoComplete="name"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col md:flex-row md:items-start gap-3">
            <Label htmlFor="bio" className="w-40 text-lg font-semibold pt-2 md:pt-0">Bio</Label>
            <textarea
              id="bio"
              name="bio"
              value={data.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="flex-1 bg-[#3a3572] border border-purple-500 rounded-md px-4 py-3 resize-none focus:outline-none"
              rows={4}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="email" className="w-40 text-lg font-semibold">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1 bg-[#3a3572] border border-purple-500"
              autoComplete="email"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="password" className="w-40 text-lg font-semibold">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="New Password"
              className="flex-1 bg-[#3a3572] border border-purple-500"
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <Label htmlFor="password_confirmation" className="w-40 text-lg font-semibold">Confirm Password</Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="flex-1 bg-[#3a3572] border border-purple-500"
              autoComplete="new-password"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10 pb-10">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
            className="border border-gray-500 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={processing}
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}
function patch(arg0: string, data: { username: string; bio: string; email: string; password: string; password_confirmation: string; imageUrl: string; bannerUrl: string; }) {
  throw new Error('Function not implemented.');
}

