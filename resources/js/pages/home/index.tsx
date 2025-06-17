import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Anime, AnimeListProps } from '@/types';

export default function AnimePage({ animes, genres, categories }: AnimeListProps) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [reviewedOnly, setReviewedOnly] = useState(false);
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);

  useEffect(() => {
    let filtered = [...animes];

    // Filter by genre (match name from anime.genres array)
    if (selectedGenre) {
      filtered = filtered.filter(anime =>
        anime.genres?.some(g => g.name.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Filter by category (anime.category can be string or object)
    if (selectedCategory) {
      filtered = filtered.filter(anime => {
        if (anime.category.name) {
          return anime.category.name.toLowerCase() === selectedCategory.toLowerCase();
        }
        return false;
      });
    }

    // Filter only reviewed
    if (reviewedOnly) {
      filtered = filtered.filter(anime => anime.review !== null && anime.review !== undefined);
    }

    // Sort logic
    switch (sortOrder) {
      case 'popular':
        filtered.sort((a, b) => b.favorite_count - a.favorite_count);
        break;
      case 'recent':
        filtered.sort((a, b) =>
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
        );
        break;
      case 'rating':
        filtered.sort((a, b) => {
          const aRating = a.review ? a.review.rating_amount + a.user_rating : a.user_rating * 2;
          const bRating = b.review ? b.review.rating_amount + b.user_rating : b.user_rating * 2;
          return bRating - aRating;
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredAnime(filtered);
  }, [animes, selectedGenre, selectedCategory, reviewedOnly, sortOrder]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900 text-white px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Explore Anime</h1>
          <p className="text-gray-400">Discover amazing anime series and movies</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-10">
          {/* Genre Filter */}
          <div>
            <label className="text-sm text-gray-300">Genre</label>
            <select
              className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.name}>{genre.name}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm text-gray-300">Category</label>
            <select
              className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="text-sm text-gray-300">Sort By</label>
            <select
              className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>

          {/* Reviewed Only Toggle */}
          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              id="reviewed"
              checked={reviewedOnly}
              onChange={() => setReviewedOnly(!reviewedOnly)}
              className="accent-purple-600 w-4 h-4"
            />
            <label htmlFor="reviewed" className="text-sm text-gray-300">
              Show Reviewed Only
            </label>
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAnime.map(anime => (
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
      </div>
    </AppLayout>
  );
}
