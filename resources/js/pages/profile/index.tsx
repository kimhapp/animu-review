import { useEffect, useRef, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Anime, Genre, ProfilePageProps, ReviewWithAnime } from '@/types';
import AppLayout from '@/layouts/app-layout';

export default function ProfilePage({ user, favoriteAnime, reviewedAnime }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'favorites' | 'reviews'>('favorites');

  const [favList, setFavList] = useState<Anime[]>(favoriteAnime.data);
  const [revList, setRevList] = useState<ReviewWithAnime[]>(reviewedAnime.data);

  const list = activeTab === 'favorites'
    ? favList
    : revList.map((r) => r.anime);

  const [favPage, setFavPage] = useState(2);
  const [revPage, setRevPage] = useState(2);

  const favHasMore = favoriteAnime.next_page_url !== null;
  const revHasMore = reviewedAnime.next_page_url !== null;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    const bottom = containerRef.current?.getBoundingClientRect().bottom ?? 0;
    if (bottom <= window.innerHeight + 100) {
      if (activeTab === 'favorites' && favHasMore) {
        const res = await fetch(`/profile?page=${favPage}&type=favorites`);
        const json = await res.json();
        setFavList((prev) => [...prev, ...json.favoriteAnime.data]);
        setFavPage((p) => p + 1);
      }
      if (activeTab === 'reviews' && revHasMore) {
        const res = await fetch(`/profile?page=${revPage}&type=reviews`);
        const json = await res.json();
        setRevList((prev) => [...prev, ...json.reviewedAnime.data]);
        setRevPage((p) => p + 1);
      }
    }
  };

  useEffect(() => {
    const onScroll = () => loadMore();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeTab, favPage, revPage]);

  return (
    <AppLayout>
      <div className="min-h-screen w-full bg-[#1c0e2b] p-4 text-white">
        <Head title="My Profile" />

        {/* User Info */}
        <div className="border border-[#372948] rounded-xl p-6 flex flex-col items-center bg-[#2D2B55] max-w-6xl mx-auto">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-white mb-4"
          />
          <h1 className="text-3xl font-semibold">{user.name}</h1>

          {/* Follower Count */}
          <div className="mt-2 text-sm text-gray-300">
            <span className="font-medium text-white">{user.follower_count ?? 0}</span> followers
          </div>

          {/* Bio */}
            <p className="mt-2 text-gray-300 text-center max-w-xl">
              {user.bio?.trim() ? user.bio : 'No bio'}
            </p>

          {/* Edit Profile Button */}
          <Link
            href={route('profile.edit')}
            className="mt-4 inline-block bg-[#6C4AB6] hover:bg-[#7E5AEF] text-white px-4 py-2 rounded-lg text-sm transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-8">
          <div className="flex w-[300px] md:w-[400px] border border-[#6C4AB6] rounded-lg bg-[#2D2B55] p-1">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex-1 py-2 rounded-l-md mx-1 transition
                ${activeTab === 'favorites' ? 'text-[#6C4AB6] font-semibold' : 'text-gray-300'}
                hover:text-[#9C7EEA]`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-2 rounded-r-md mx-1 transition
                ${activeTab === 'reviews' ? 'text-[#6C4AB6] font-semibold' : 'text-gray-300'}
                hover:text-[#9C7EEA]`}
            >
              Reviewed
            </button>
          </div>
        </div>

        {/* Anime List Grid */}
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {list.length === 0 ? (
            <p className="text-gray-400 col-span-full text-center">
              No {activeTab === 'favorites' ? 'favorites' : 'reviews'} found.
            </p>
          ) : (
            list.map((anime: Anime) => (
              <Link
                key={anime.id}
                href={route('home.show', anime.id)}
                className="bg-white/10 border border-white/20 backdrop-blur rounded-lg overflow-hidden shadow hover:ring-2 ring-purple-500 transition"
              >
                <img
                  src={anime.imageUrl}
                  alt={anime.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{anime.title}</h3>
                  <div className="text-sm text-gray-400 flex justify-between mt-1">
                    <span>{anime.studio}</span>
                    <span>{anime.release_date?.split('-')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex flex-wrap gap-1">
                    {anime.genres?.map(g => (
                        <span
                          key={g.id}
                          className="text-xs bg-gray-700 px-3 py-1 rounded-full"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">
                      ★{' '}
                      {anime.review
                        ? anime.review.rating + anime.user_rating
                        : anime.user_rating * 2}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
