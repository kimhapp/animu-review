import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Anime, AnimeListProps } from '@/types';
import { Label } from '@/components/ui/label';

export default function AnimePage({ animes, genres, categories }: AnimeListProps) {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [reviewedOnly, setReviewedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);
  
  // Review modal states
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    reviewText: '',
    reviewerName: '',
    isRecommended: true
  });
  
  // Rating hover state
  const [hoverRating, setHoverRating] = useState(0);

  // Extract unique countries from animes
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

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter(anime =>
        anime.genres?.some(g => g.name.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Filter by category
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
      case 'genre':
        filtered.sort((a, b) => {
          const aGenre = a.genres?.[0]?.name || '';
          const bGenre = b.genres?.[0]?.name || '';
          return aGenre.localeCompare(bGenre);
        });
        break;
      case 'category':
        filtered.sort((a, b) => {
          const aCategory = a.category?.name || '';
          const bCategory = b.category?.name || '';
          return aCategory.localeCompare(bCategory);
        });
        break;
      case 'country':
        filtered.sort((a, b) => {
          const aCountry = (a as any).country || '';
          const bCountry = (b as any).country || '';
          return aCountry.localeCompare(bCountry);
        });
        break;
      case 'rating':
        filtered.sort((a, b) => {
          const aRating = a.review ? a.review.rating_amount + a.user_rating : a.user_rating * 2;
          const bRating = b.review ? b.review.rating_amount + b.user_rating : b.user_rating * 2;
          return bRating - aRating;
        });
        break;
      default:
        break;
    }

    setFilteredAnime(filtered);
  }, [animes, selectedGenre, selectedCategory, reviewedOnly, sortOrder, searchQuery]);

  const openReviewModal = (anime: Anime) => {
    setSelectedAnime(anime);
    setShowReviewModal(true);
    // Reset form
    setReviewData({
      rating: 0,
      reviewText: '',
      reviewerName: '',
      isRecommended: true
    });
    setHoverRating(0);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedAnime(null);
    setHoverRating(0);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the review data to your backend
    console.log('Review submitted:', {
      animeId: selectedAnime?.id,
      ...reviewData
    });
    
    // Show success message (you can replace this with a proper notification)
    alert('Review submitted successfully!');
    closeReviewModal();
  };

  const StarRating = ({ 
    rating, 
    onRatingChange, 
    onHover, 
    hoverRating, 
    size = 'w-6 h-6',
    interactive = true 
  }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    onHover?: (rating: number) => void;
    hoverRating?: number;
    size?: string;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            className={`${size} ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            onClick={() => interactive && onRatingChange?.(star)}
            onMouseEnter={() => interactive && onHover?.(star)}
            onMouseLeave={() => interactive && onHover?.(0)}
          >
            <svg
              className={`w-full h-full ${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-400'
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  const QuickRating = ({ anime }: { anime: Anime }) => {
    const [quickRating, setQuickRating] = useState(0);
    const [showQuickRating, setShowQuickRating] = useState(false);

    const handleQuickRate = (rating: number) => {
      setQuickRating(rating);
      // Here you would send the quick rating to your backend
      console.log('Quick rating:', { animeId: anime.id, rating });
      
      // Hide after a delay
      setTimeout(() => {
        setShowQuickRating(false);
      }, 2000);
    };

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowQuickRating(!showQuickRating);
          }}
          className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-full transition-colors"
        >
          ⚡ Quick Rate
        </button>
        
        {showQuickRating && (
          <div className="absolute top-8 left-0 z-20 bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl min-w-max">
            <p className="text-xs text-gray-300 mb-2">Rate this anime:</p>
            <StarRating
              rating={quickRating}
              onRatingChange={handleQuickRate}
              size="w-4 h-4"
            />
            {quickRating > 0 && (
              <p className="text-xs text-green-400 mt-1">Rated {quickRating}/5 ⭐</p>
            )}
          </div>
        )}
      </div>
    );
  };

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
              className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
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
              className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
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
              className="mt-1 w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default Order</option>
              <option value="genre">Filter by Genre</option>
              <option value="category">Filter by Category</option>
              <option value="country">Filter by Country</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>

          {/* Reviewed Only */}
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

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-400 text-sm">
            Showing {filteredAnime.length} of {animes.length} anime
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Anime Card Grid with Review/Rating Features */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAnime.map(anime => (
            <div key={anime.id} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform relative group">
              <Link href={route('home.show', anime.id)}>
                <img
                  src={anime.imageUrl || 'https://via.placeholder.com/200x280/444/fff?text=Anime'}
                  alt={anime.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              
              <div className="p-3">
                <Link href={route('home.show', anime.id)}>
                  <h3 className="text-sm font-semibold truncate hover:text-purple-400">{anime.title}</h3>
                </Link>
                
                <div className="text-xs text-gray-400 flex justify-between mt-1">
                  <span className="truncate">{anime.studio}</span>
                  <span>{anime.release_date?.split('-')[0]}</span>
                </div>
                
                {(anime as any).country && (
                  <div className="text-xs text-gray-500 mt-1">
                    📍 {(anime as any).country}
                  </div>
                )}

                {/* Rating Display */}
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <StarRating
                      rating={anime.user_rating || 0}
                      size="w-3 h-3"
                      interactive={false}
                    />
                    <span className="text-xs text-gray-400">
                      {anime.user_rating || 0}/5
                    </span>
                  </div>
                </div>

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

                {/* Review/Rating Action Buttons */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      openReviewModal(anime);
                    }}
                    className="flex-1 text-xs bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded transition-colors"
                  >
                    📝 Review
                  </button>
                  <QuickRating anime={anime} />
                </div>
              </div>
            </div>
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

        {/* Review Modal */}
        {showReviewModal && selectedAnime && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Review Anime</h2>
                    <p className="text-gray-400 text-sm">{selectedAnime.title}</p>
                  </div>
                  <button
                    onClick={closeReviewModal}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Rating Section */}
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Your Rating</Label>
                    <div className="flex items-center gap-3">
                      <StarRating
                        rating={reviewData.rating}
                        onRatingChange={(rating) => setReviewData({ ...reviewData, rating })}
                        onHover={setHoverRating}
                        hoverRating={hoverRating}
                        size="w-8 h-8"
                      />
                      <span className="text-sm text-gray-400">
                        {hoverRating || reviewData.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Reviewer Name */}
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Your Name (Optional)</Label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      value={reviewData.reviewerName}
                      onChange={(e) => setReviewData({ ...reviewData, reviewerName: e.target.value })}
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Your Review</Label>
                    <textarea
                      rows={4}
                      placeholder="Write your review here..."
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                      value={reviewData.reviewText}
                      onChange={(e) => setReviewData({ ...reviewData, reviewText: e.target.value })}
                    />
                  </div>

                  {/* Recommendation */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="recommend"
                      checked={reviewData.isRecommended}
                      onChange={(e) => setReviewData({ ...reviewData, isRecommended: e.target.checked })}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <label htmlFor="recommend" className="text-sm text-gray-300">
                      I recommend this anime
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeReviewModal}
                      className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reviewData.rating === 0}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

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
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.219.085.34-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.756-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.90-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
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