import { Head, useForm, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { GoogleButton } from '@/components/ui/google-button';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    errors?: {
        google?: string;
    };
}

export default function Register({ status, canResetPassword, errors: propErrors }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
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
        router.get(route('google.login'));
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your AnimeRevu account">
            <Head title="Register" />

            {/* Status and Error Messages */}
            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
            )}
            {propErrors?.google && (
                <div className="mb-4 text-center text-sm font-medium text-red-500">
                    {propErrors.google}
                </div>
            )}

            {/* Registration Form */}
            <div className="flex flex-col gap-6">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        {/* Username */}
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-white">
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
                                className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                            />
                            <InputError message={errors.name} className="mt-2 text-red-500" />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-white">
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
                                className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                            />
                            <InputError message={errors.email} className="mt-2 text-red-500" />
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-white">
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
                                className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                            />
                            <InputError message={errors.password} className="mt-2 text-red-500" />
                        </div>

                        {/* Confirm Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation" className="text-white">
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
                                className="bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2 text-red-500" />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className={`mt-2 w-full bg-purple-500 text-white hover:bg-purple-600 transition duration-200 ease-in-out ${
                                processing ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            tabIndex={5}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Create account
                        </Button>
                    </div>
                </form>

                {/* OR Divider */}
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase text-gray-400">
                        <span className="bg-gray-900 px-2">OR CONTINUE WITH</span>
                    </div>
                </div>

                {/* Google Login Button */}
                <GoogleButton onClick={handleGoogleLogin} className="mt-4 w-full" />

                {/* Footer Link */}
                <div className="text-gray-400 text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6} className="text-purple-500 hover:text-purple-600 transition duration-200 ease-in-out">
                       Log in
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}