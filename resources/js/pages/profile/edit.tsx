import React, { useEffect, useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { route } from 'ziggy-js';
import { deleteFile, generateAvatarPath, generateBannerPath, isFirebaseStorageUrl, uploadFile } from '@/lib/storage';

interface User {
  id: number;
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

  useEffect(() => {
    setData({
      name: user.name || '',
      bio: user.bio || '',
      imageUrl: user.imageUrl || '',
      bannerUrl: user.bannerUrl || '',
    }); 

    if (user.imageUrl && typeof user.imageUrl === 'string') {
      setAvatarUrl(user.imageUrl);
    } 

    if (user.bannerUrl && typeof user.bannerUrl === 'string') {
      setBannerUrl(user.bannerUrl);
    }
  }, [user]);

  const { data, setData, post, processing, errors } = useForm({
    name: user.name || '',
    bio: user.bio || '',
    imageUrl: user.imageUrl || '',
    bannerUrl: user.bannerUrl || '',
  });

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData(e.target.name as any, e.target.value);
  };

  const initialAvatar = typeof user.imageUrl === "string" ? user.imageUrl : "";
  const [avatarUrl, setAvatarUrl] = useState<string>(initialAvatar);
  const initialBanner = typeof user.bannerUrl === "string" ? user.bannerUrl : "";
  const [bannerUrl, setBannerUrl] = useState<string>(initialBanner);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadProgressAvatar, setUploadProgressAvatar] = useState(0);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadProgressBanner, setUploadProgressBanner] = useState(0);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;  
    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setAvatarUrl(localUrl); 
    setUploadingAvatar(true);
    setUploadProgressAvatar(0); 
    try {
      if (avatarUrl && isFirebaseStorageUrl(avatarUrl)) {
        await deleteFile(avatarUrl);
      } 
      const path = generateAvatarPath(file, user.id);
      const url = await uploadFile(file, path, setUploadProgressAvatar);  
      // Replace local preview with uploaded URL
      setAvatarUrl(url);
      setData('imageUrl', url);  // sync to form data for submission
    } catch (error) {
      alert("Failed to upload avatar.");
      console.error(error);
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Handle banner file upload
  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;  

    const localUrl = URL.createObjectURL(file);
    setBannerUrl(localUrl); 

    setUploadingBanner(true);
    setUploadProgressBanner(0); 

    try {
      if (bannerUrl && isFirebaseStorageUrl(bannerUrl)) {
        await deleteFile(bannerUrl);
      } 

      const path = generateBannerPath(file, user.id);
      const url = await uploadFile(file, path, setUploadProgressBanner);  

      setBannerUrl(url);
      setData('bannerUrl', url);
    } catch (error) {
      alert("Failed to upload banner.");
      console.error(error);
    } finally {
      setUploadingBanner(false);
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
          onChange={handleBannerChange}
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
              onChange={handleAvatarChange}
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
          {errors.name && <p className="text-red-500">{errors.name}</p>}

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

