import LoginForm from "@/components/auth/login-form";


export default function Login() {
    return (
        <div className="min-h-screen bg-[#1E1A2B] flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <LoginForm />
          </div>
        </div>
      );
}