import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Anime, Genre, Category } from '@/types';
import { Label } from '@/components/ui/label';

interface AnimeListProps {
  animes: Anime[];
  genres: Genre[];
  categories: Category[];
}

export default function AnimePage({ animes, genres, categories }: AnimeListProps) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [reviewedOnly, setReviewedOnly] = useState(false);
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);

  const countries = [...new Set(animes.map(anime => (anime as any).country).filter(Boolean))];

  useEffect(() => {
    let filtered = [...animes];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(anime =>
        anime.title.toLowerCase().includes(query) ||
        anime.studio?.toLowerCase().includes(query) ||
        anime.genres?.some(g => g.name.toLowerCase().includes(query))
      );
    }

    // Filter by genre (match name from anime.genres array)
    if (selectedGenre) {
      filtered = filtered.filter(anime =>
        anime.genres?.some(g => g.name.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Filter by category (anime.category can be string or object)
    if (selectedCategory) {
      filtered = filtered.filter(anime =>
        anime.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
      );
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
  }, [animes, selectedGenre, selectedCategory, reviewedOnly, sortOrder, searchQuery]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Explore Anime</h1>
          <p className="text-gray-400">Discover amazing anime series and movies</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Label className="text-sm text-gray-300">Search</Label>
          <input
            type="text"
            placeholder="Search by title, studio, or genre..."
            className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="grid gap-6 md:grid-cols-4 mb-10">
          {/* Genre Filter */}
          <div>
            <Label className="text-sm text-gray-300">Genre</Label>
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
            <Label className="text-sm text-gray-300">Category</Label>
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
            <Label className="text-sm text-gray-300">Sort By</Label>
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

          {/* Reviewed Only */}
          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              id="reviewed-only"
              className="form-checkbox h-4 w-4 text-purple-600"
              checked={reviewedOnly}
              onChange={(e) => setReviewedOnly(e.target.checked)}
            />
            <Label htmlFor="reviewed-only" className="text-sm text-gray-300">
              Reviewed Only
            </Label>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            Showing {filteredAnime.length} of {animes.length} anime
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Anime Card Grid - Compact Version */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAnime.map(anime => (
            <Link
              key={anime.id}
              href={route('home.show', anime.id)}
              className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform"
            >
              <img
                src={anime.imageUrl || 'https://via.placeholder.com/200x280/444/fff?text=Anime'}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold truncate">{anime.title}</h3>
                <div className="text-xs text-gray-400 flex justify-between mt-1">
                  <span className="truncate">{anime.studio}</span>
                  <span>{anime.release_date?.split('-')[0]}</span>
                </div>
                {(anime as any).country && (
                  <div className="text-xs text-gray-500 mt-1">
                    📍 {(anime as any).country}
                  </div>
                )}
                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-wrap gap-1">
                    {anime.genres?.slice(0, 2).map(g => (
                      <span
                        key={g.id}
                        className="text-[10px] bg-gray-700 px-2 py-0.5 rounded-full"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] bg-purple-600 px-2 py-0.5 rounded-full">
                    ★ {anime.review ? anime.review.rating_amount + anime.user_rating : anime.user_rating * 2}
                  </span>
                </div>
              </div>
            </Link>
          ))} 
        </div>

        {/* No Results Message */}
        {filteredAnime.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No anime found matching your criteria</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
