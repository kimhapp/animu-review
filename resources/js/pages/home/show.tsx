import { Head, Link, router, usePage } from '@inertiajs/react';
import { Anime } from '@/types';
import { useState, useCallback, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Heart, Bell, Star, Play, Calendar, Users, Clock, Eye } from 'lucide-react';

interface Props {
  similarAnime: Anime[];
  latestAnime: Anime[];
  selectedAnime: Anime;
  isFavorited: boolean;
}

export default function Homepage({ similarAnime, latestAnime, selectedAnime, isFavorited: initialFavorite }: Props) {
  const animeToShow = selectedAnime;
  const reviewRating = Number(animeToShow.review?.rating_amount) || 0;

  const [isFavorited, setIsFavorited] = useState(initialFavorite);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [showMoreSimilar, setShowMoreSimilar] = useState(false);
  const [showMoreLatest, setShowMoreLatest] = useState(false);

  const displayedSimilar = useMemo(
    () => (showMoreSimilar ? similarAnime : similarAnime.slice(0, 5)),
    [showMoreSimilar, similarAnime]
  );

  const displayedLatest = useMemo(
    () => (showMoreLatest ? latestAnime : latestAnime.slice(0, 5)),
    [showMoreLatest, latestAnime]
  );

  const getTimeAgo = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    }
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }, []);

  const handleFavorite = useCallback(() => {
    setIsFavorited((prev) => !prev); // UI update
  
    router.post(
      route('home.show.favorite', animeToShow.id), // e.g. favorite/{id}
      {},
      {
        preserveScroll: true,
        preserveState: true,
      }
    );
  }, [animeToShow.id]);

  const renderStars = useCallback((rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-400" />);
    }

    return stars;
  }, []);

  const calculateRating = useCallback((anime: Anime): number => {
    if (anime.review) {
      return anime.review.rating_amount + anime.user_rating;
    }
    return anime.user_rating * 2;
  }, []);

  const AnimeCard = useCallback(
    ({ anime }: { anime: Anime }) => (
      <Link
        key={anime.id}
        href={route('home.show', anime.id)}
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:ring-2 ring-purple-400 hover:scale-105 transition-all duration-300"
      >
        <img
          src={anime.imageUrl}
          alt={anime.title}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-2 truncate" title={anime.title}>
            {anime.title}
          </h3>
          <div className="text-xs text-gray-400 flex justify-between mb-3">
            <span className="truncate" title={anime.studio}>
              {anime.studio}
            </span>
            <span>{anime.release_date?.split('-')[0] || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {anime.genres?.slice(0, 2).map((genre) => (
                <span
                  key={genre.id}
                  className="text-[10px] bg-gray-700 px-2 py-1 rounded-full"
                  title={genre.name}
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <span className="text-[10px] bg-purple-600 px-2 py-1 rounded-full">
              ★ {calculateRating(anime).toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    ),
    [calculateRating]
  );

  if (!animeToShow) {
    return (
      <AppLayout>
        <Head title="Homepage - AnimeRevu" />
        <div className="min-h-screen bg-[#1E1A2B] text-white font-sans flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">No Anime Selected</h1>
            <p className="text-gray-400">Please select an anime to view details.</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Head title={`${animeToShow.title} - AnimeRevu`} />
      <div className="min-h-screen bg-[#1E1A2B] text-white font-sans">
        {/* Hero Section */}
        <section
          className="relative h-[600px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${animeToShow.imageUrl}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1A2B]/95 via-[#1E1A2B]/70 to-transparent">
            <div className="flex items-center h-full px-8 max-w-7xl mx-auto">
              <div className="flex gap-8 items-center w-full">
                <div className="flex-shrink-0">
                  <img
                    src={animeToShow.imageUrl}
                    alt={animeToShow.title}
                    className="w-80 h-96 object-cover rounded-lg shadow-2xl"
                  />
                </div>
                <div className="flex-1 max-w-2xl">
                  <h1 className="text-6xl font-bold mb-6 leading-tight">{animeToShow.title}</h1>
                  <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                    {animeToShow.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8 text-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400">Native Title:</span>
                        <span className="truncate">{animeToShow.native_title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400">Category:</span>
                        <span>{animeToShow.category?.name || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400">Studios:</span>
                        <span className="truncate">{animeToShow.studio}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400">Date aired:</span>
                        <span>
                          {animeToShow.release_date} ({getTimeAgo(animeToShow.release_date)})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400">Genre:</span>
                        <span className="truncate">
                          {animeToShow.genres?.map((g) => g.name).join(', ') || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">User Rating</div>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderStars(animeToShow.user_rating)}</div>
                          <span className="font-bold text-xl">
                            {animeToShow.user_rating.toFixed(1)}/5
                          </span>
                        </div>
                      </div>
                      {animeToShow.review && (
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Review Rating</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {renderStars(reviewRating)}
                            </div>
                            <span className="font-bold text-xl">
                              {reviewRating.toFixed(1)}/5
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleFavorite}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                        isFavorited
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                      {isFavorited ? 'Favorited' : 'Add to Favorites'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="p-8 max-w-7xl mx-auto">
          {/* Review Section */}
          <section className="mb-12 text-white rounded-lg p-8 ">
            <h2 className="text-3xl font-bold mb-4">Review</h2>
            {animeToShow.review ? (
              <>
                <p className="text-sm text-gray-600 mb-2">Written by {animeToShow.review.user.name}</p>
                <p className="leading-relaxed">{animeToShow.review.content}</p>
              </>
            ) : (
              <p className="text-gray-500">No review</p>
            )}
          </section>

          {similarAnime.length > 0 && (
            <section className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Similar Anime</h2>
                {similarAnime.length > 5 && (
                  <button
                    onClick={() => setShowMoreSimilar((prev) => !prev)}
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    {showMoreSimilar ? 'Show Less' : 'See More'}
                  </button>
                )}
              </div>
              <hr className="border-gray-700 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {displayedSimilar.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            </section>
          )}

          {latestAnime.length > 0 && (
            <section className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Latest Anime</h2>
                {latestAnime.length > 5 && (
                  <button
                    onClick={() => setShowMoreLatest((prev) => !prev)}
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    {showMoreLatest ? 'Show Less' : 'See More'}
                  </button>
                )}
              </div>
              <hr className="border-gray-700 mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {displayedLatest.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </AppLayout>
  );
}