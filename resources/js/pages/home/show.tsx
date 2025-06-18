import { Head, Link, usePage } from '@inertiajs/react';
import { Anime } from '@/types';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Props {
  similarAnime: Anime[];
}

export default function Homepage({similarAnime }: Props) {
  const { props } = usePage<{ selectedAnime: Anime }>();
  const animeToShow = props.selectedAnime;

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <>
    <AppLayout>
        <Head title="Homepage - AnimeRevu" />
          <div className="min-h-screen bg-[#1E1A2B] text-white font-sans">
            {/* Hero Section */}
            <section
              className="relative h-[500px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${animeToShow.imageUrl}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E1A2B]/90 via-[#1E1A2B]/30 to-transparent flex items-center pl-8 max-w-[500px] text-white">
                <div>
                  <h1 className="text-5xl font-bold mb-4 leading-tight">{animeToShow.title}</h1>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">{animeToShow.description}</p>
    
                  <div className="mb-6 text-xs text-gray-400 leading-snug space-y-1">
                    <p>Japanese Title: {animeToShow.nativeTitle}</p>
                    <p>Category: {animeToShow.category.name}</p>
                    <p>Studios: {animeToShow.studio}</p>
                    <p>
                      Date aired: {animeToShow.release_date} (
                      {getTimeAgo(animeToShow.release_date)})
                    </p>
                    <p>
                      Genre: {animeToShow.genres.map(g => g.name).join(', ')}
                    </p>
                  </div>
                    
                  <div className="mb-6">
                    <div className="text-xs text-gray-400">User Rating</div>
                    <div className="font-bold text-lg">{animeToShow.user_rating}/5 ★★★★★</div>
                  </div>
                </div>
              </div>
            </section>
                    
            {/* Content */}
            <main className="p-8">
              {/* Comment & Similar Anime */}
              <section className="mb-12">
                <h2 className="text-lg font-semibold mb-2">a &amp; Similar Anime</h2>
                <hr className="border-gray-700 mb-6" />
                    
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {similarAnime.map(anime => (
                    <Link
                      key={anime.id}
                      href={route('home.show', anime.id)}
                      className="bg-gray-800 rounded-lg overflow-hidden shadow hover:ring-2 ring-purple-500 transition"
                    >
                      <img src={anime.imageUrl} alt={anime.title} className="w-full h-72 object-cover" />
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
                            ★ {anime.review ? anime.review.rating_amount + anime.user_rating : anime.user_rating * 2}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </main>
          </div>
    </AppLayout>
    </>
  );
}
