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
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
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

                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div>
                        <Label htmlFor="email" className="font-semibold">
                            Email address
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
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="mt-1"
                        />
                        <InputError message={errors.password} className="mt-1" />

                        {canResetPassword && (
                            <div className="text-left mt-2">
                                <TextLink href={route('password.request')} tabIndex={5} className="text-sm">
                                    Forgot password?
                                </TextLink>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember" className="select-none cursor-pointer">
                            Remember me
                        </Label>
                    </div>

                    <Button type="submit" className="w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Log in
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
                    Don't have an account?{' '}
                    <TextLink href={route('register')} tabIndex={5} className="font-medium">
                        Sign up
                    </TextLink>
                </div>
        </AuthLayout>
    );
}
