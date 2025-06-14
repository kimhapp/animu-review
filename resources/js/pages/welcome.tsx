import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome to our Anime">
        <link rel="preconnect" href="https://fonts.bunny.net"  />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>

      {/* Main Container */}
      <div className="relative flex min-h-screen items-center justify-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"> 
        {/* Fullscreen Anime Background */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <img
            src="/anime-bg.jpg"
            alt="Anime Characters"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Centered Content */}
        <div className="z-10 flex flex-col items-center gap-8 px-6 text-center">
          {/* Welcome Text */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            “Welcome to our Anime website!”
          </h1>
          <p className="max-w-md text-lg leading-7 text-[#dbdbd7]">
            Explore the world of anime with us! Discover your favorite shows,
            watch episodes, and connect with fellow anime enthusiasts.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                {auth.user ? (
                    <Link
                        href={route('home')}
                        className="w-40 rounded-md bg-[#581c87] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4f1878] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#581c87]"
                    >
                        Home
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="w-40 rounded-md bg-transparent border border-white/30 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/10"
                        >
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="w-40 rounded-md bg-[#581c87] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#4f1878] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#581c87]"
                        >
                            Register
                        </Link>
                    </>
                )}
          </div>
        </div>
      </div>
    </>
  );
}