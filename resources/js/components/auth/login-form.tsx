import { Head, useForm, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { GoogleButton } from '@/components/ui/google-button';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface Props {
    canResetPassword?: boolean;
}

export default function LoginForm({ canResetPassword = true }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = route('google.redirect');
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <div className="w-full max-w-md mx-auto p-6 bg-gray-900 rounded-lg shadow-md">
                {/* Form */}
                <form className="space-y-4 sm:space-y-6" onSubmit={submit}>
                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-sm text-gray-400">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 w-full px-4 py-2 rounded"
                        />
                        <InputError message={errors.email} className="text-red-500" />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2 relative">
                        <Label htmlFor="password" className="block text-sm text-gray-400">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 w-full px-4 py-2 rounded"
                        />
                        <InputError message={errors.password} className="text-red-500" />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-3">
                             {canResetPassword && (
                            <TextLink
                                href={route('password.request')}
                                className="text-sm text-purple-500 hover:text-purple-600"
                                tabIndex={5}
                            >
                                Forgot password?
                            </TextLink>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-3">    
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="border-gray-700 bg-gray-800"
                            />
                            <Label htmlFor="remember" className="text-sm text-gray-400">
                                Remember me
                            </Label>
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-700 disabled:text-gray-400"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Log in
                    </Button>
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

                {/* Sign Up Link */}
                <div className="text-center text-sm mt-4 text-gray-400">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} className="text-purple-500 hover:text-purple-600">
                        Sign up
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}