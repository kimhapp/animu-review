import { Head, Link, usePage } from '@inertiajs/react';
import { Anime } from '@/types';
import { useState, useCallback, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Heart, Bell, Star, Play, Calendar, Users, Clock, Eye } from 'lucide-react';

interface Props {
  similarAnime: Anime[];
  latestAnime: Anime[];
  selectedAnime: Anime;
}

export default function Homepage({ similarAnime, latestAnime, selectedAnime }: Props) {
  const animeToShow = selectedAnime;

  const [isFavorited, setIsFavorited] = useState(false);
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
    setIsFavorited((prev) => !prev);
    // TODO: Add API call to update favorite status
  }, []);

  const handleNotification = useCallback(() => {
    setIsNotificationEnabled((prev) => !prev);
    // TODO: Add API call to update notification status
  }, []);

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
                        <span className="text-gray-400">Japanese Title:</span>
                        <span className="truncate">{animeToShow.nativeTitle}</span>
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
                              {renderStars(animeToShow.review.rating_amount)}
                            </div>
                            <span className="font-bold text-xl">
                              {animeToShow.review.rating_amount.toFixed(1)}/5
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

                    {!animeToShow.review && (
                      <button
                        onClick={handleNotification}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                          isNotificationEnabled
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        <Bell className={`w-5 h-5 ${isNotificationEnabled ? 'fill-current' : ''}`} />
                        {isNotificationEnabled ? 'Notifications On' : 'Notify Me'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="p-8 max-w-7xl mx-auto">
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

         {/* Footer */}
        <footer className="mt-16 pt-12 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Social Media Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow us:</h3>
              <div className="flex gap-3">
                <a href="#" className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="bg-blue-500 hover:bg-blue-600 p-2 rounded transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="bg-pink-500 hover:bg-pink-600 p-2 rounded transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.219.085.34-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="bg-red-600 hover:bg-red-700 p-2 rounded transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Company Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Meet The Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <a href="mailto:support@anime@gmail.com" className="hover:text-white transition-colors">support@anime@gmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+98 457 899</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Phnom Penh, Cambodia</span>
                </div>
              </div>
            </div>

            {/* Helpful Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Helpful Link</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sponsor</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              <p>© 2025 AnimeRevu Pals &nbsp;&nbsp;&nbsp; All Right Reserved</p>
            </div>
            <div className="mt-2 md:mt-0">
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms and conditions</a>
              <span className="mx-2">|</span>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">privacy and policy</a>
           </div>
           </div>   
        </footer>
      </div>
    </AppLayout>
  );
}
