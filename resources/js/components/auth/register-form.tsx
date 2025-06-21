import { Head, useForm, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GoogleButton } from '@/components/ui/google-button';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export interface RegisterFormProps {
  status?: string;
  canResetPassword: boolean;
  errors?: {
    google?: string;
  };
}

export default function RegisterForm({ status, canResetPassword, errors: propErrors }: RegisterFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = route('google.redirect');
  };

  return (
    <>
      <Head title="Register" />

        {status && (
          <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
        )}
        {propErrors?.google && (
          <div className="mb-4 text-center text-sm font-medium text-destructive">
            {propErrors.google}
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
          <div>
            <Label htmlFor="name" className="font-semibold">
              Username
            </Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder="Username"
              className="mt-1"
            />
            <InputError message={errors.name} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="email" className="font-semibold">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
              className="mt-1"
            />
            <InputError message={errors.email} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Password"
              className="mt-1"
            />
            <InputError message={errors.password} className="mt-1" />
          </div>

          <div>
            <Label htmlFor="password_confirmation" className="font-semibold">
              Confirm password
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirm password"
              className="mt-1"
            />
            <InputError message={errors.password_confirmation} className="mt-1" />
          </div>

          <Button type="submit" className="w-full mt-2" tabIndex={5} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Create account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <span className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase text-gray-400">
            <span className="bg-[#1f1e2e] px-3">Or continue with</span>
          </div>
        </div>

        <GoogleButton onClick={handleGoogleLogin} className="w-full mb-4" />

        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <TextLink href={route('login')} tabIndex={6} className="font-medium">
            Log in
          </TextLink>
        </div>
    </>
  );
}
