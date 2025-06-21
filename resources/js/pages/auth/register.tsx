import AuthLayout from '@/layouts/auth-layout';
import RegisterForm, { RegisterFormProps } from '@/components/auth/register-form';

export default function RegisterPage(props: RegisterFormProps) {
  return (
    <AuthLayout title="Create an account" description="Enter your details below to create your account">
      <RegisterForm {...props} />
    </AuthLayout>
  );
}
