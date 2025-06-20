import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            {/* Status message */}
            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
            )}

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">
                {/* Email input */}
                <div className="grid gap-2">
                    <Label htmlFor="email" className="text-white">
                        Email address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        value={data.email}
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="email@example.com"
                        className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none"
                    />

                    {/* Error message */}
                    <InputError message={errors.email} />
                </div>

                {/* Submit button */}
                <div className="my-6">
                    <Button
                        type="submit"
                        className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-400"
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                        )}
                        Email password reset link
                    </Button>
                </div>
            </form>

            {/* Link to login */}
            <div className="mt-6 text-center text-sm text-gray-400">
                Or, return to{' '}
                <TextLink href={route('login')} className="text-purple-400 hover:text-purple-500">
                    Log in
                </TextLink>
            </div>
        </AuthLayout>
    );
}