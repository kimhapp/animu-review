import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Head } from '@inertiajs/react';

export default function Dashboard() {
  const defaultFormData = {
    username: '',
    bio: '',
    email: '',
    newPassword: '',
    confirmPassword: '',
    image: '',
    banner: '',
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [initialData, setInitialData] = useState(defaultFormData);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('profileFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setInitialData(parsedData);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result as string,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('profileFormData', JSON.stringify(formData));
    setInitialData(formData);
    setSaveMessage('Profile saved successfully!');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setSaveMessage('Changes discarded');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const handleVerifyEmail = () => {
    alert(`Verification email sent to ${formData.email || 'your email'}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#1c0e2b] p-4 text-white">
      <form
        onSubmit={handleSave}
        className="border border-[#372948] rounded-xl p-4 flex flex-col items-center bg-[#2D2B55] max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 w-full">
          <img
            src={formData.image || "https://i.pinimg.com/736x/1d/ec/e2/1dece2c8357bdd7cee3b15036344faf5.jpg"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="font-semibold text-lg">Edit Profile</div>
          <div className="ml-auto flex gap-2">
            <Link
              href={route('profile')}
              className="mt-4 inline-block bg-[#6C4AB6] hover:bg-[#7E5AEF] text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Cancel
            </Link>
            <Button type="submit" className="rounded-full px-4 py-1">
              Save
            </Button>
          </div>
        </div>

        {/* Success message */}
        {saveMessage && (
          <div className="mb-4 text-green-400 font-medium">{saveMessage}</div>
        )}

        {/* Form Fields */}
        <div className="space-y-4 w-full">
          {/* Username */}
          <div className="flex items-center gap-4">
            <label htmlFor="username" className="w-32 text-sm font-medium">Username</label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {/* Bio */}
          <div className="flex items-start gap-4">
            <label htmlFor="bio" className="w-32 text-sm font-medium pt-2">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
              className="flex-1 bg-[#1c0e2b] border border-[#372948] rounded px-3 py-2 text-white"
              rows={3}
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <label htmlFor="email" className="w-32 text-sm font-medium">Email</label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {/* Verify Email Button */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm font-medium">Verify Email</label>
            <Button
              type="button"
              variant="secondary"
              onClick={handleVerifyEmail}
              className="px-4"
            >
              Send Verification
            </Button>
          </div>

          {/* New Password */}
          <div className="flex items-center gap-4">
            <label htmlFor="newPassword" className="w-32 text-sm font-medium">New Password</label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-4">
            <label htmlFor="confirmPassword" className="w-32 text-sm font-medium">Confirm Password</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <label htmlFor="image" className="w-32 text-sm font-medium">Profile Image</label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="flex-1"
            />
          </div>

          {/* Banner Upload */}
          <div className="flex items-center gap-4">
            <label htmlFor="banner" className="w-32 text-sm font-medium">Banner Image</label>
            <Input
              id="banner"
              name="banner"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="flex-1"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
