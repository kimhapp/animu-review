import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ReviewFormProps } from '@/types';

export default function ReviewForm({
  animeList,
  onSave,
  onCancel,
  initialReview,
}: ReviewFormProps) {
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(
    initialReview?.anime_id ?? null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rating, setRating] = useState(initialReview?.rating ?? 0);
  const [reviewText, setReviewText] = useState(initialReview?.content ?? '');

  // Find selected anime from animeList or fallback to initialReview.anime
  const selectedAnime =
    animeList.find((a) => a.id === selectedAnimeId) ?? initialReview?.anime ?? null;

  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
    setSelectedAnimeId(null);
  };

  const handleAnimeSelect = (anime: typeof animeList[number]) => {
    setSelectedAnimeId(anime.id);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedAnimeId) {
      alert('Please select an anime');
      return;
    }
    if (rating < 1 || rating > 5) {
      alert('Please provide a rating between 1 and 5');
      return;
    }
    if (!reviewText.trim()) {
      alert('Please enter a review text');
      return;
    }
    onSave({ anime_id: selectedAnimeId, rating, reviewText });
  };

  // Determine if we are in edit mode
  const isEditMode = Boolean(initialReview);

  return (
    <div
      className="border border-[#372948] rounded-xl p-8 text-white max-w-3xl w-full mx-auto"
      style={{ backgroundColor: 'var(--color-card)' }}
    >
      <Label className="block mb-2">Select Anime</Label>
      {isEditMode ? (
        <div className="flex items-center gap-4 mb-4 bg-[#1F1D3D] p-3 rounded">
          <img
            src={selectedAnime?.imageUrl ?? ''}
            alt={selectedAnime?.title ?? 'Selected anime'}
            className="w-14 h-20 object-cover rounded border border-white"
          />
          <span className="text-lg font-semibold">{selectedAnime?.title}</span>
        </div>
      ) : (
        <div className="relative mb-4">
          <Input
            type="text"
            className="bg-[#2D2B55] border-[#6C4AB6] text-white"
            placeholder="Search or select anime..."
            value={searchTerm || selectedAnime?.title || ''}
            onChange={handleSearchChange}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full bg-[#2D2B55] border border-[#6C4AB6] rounded mt-1 max-h-60 overflow-y-auto">
              {filteredAnime.length > 0 ? (
                filteredAnime.map((anime) => (
                  <li
                    key={anime.id}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-[#372948]"
                    onClick={() => handleAnimeSelect(anime)}
                  >
                    <img
                      src={anime.imageUrl}
                      alt={anime.title}
                      className="w-10 h-14 object-cover rounded mr-3 border border-white"
                    />
                    <span>{anime.title}</span>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400">No results found</li>
              )}
            </ul>
          )}
        </div>
      )}

      <Label htmlFor="rating" className="block mb-2">
        Rating (1 - 5)
      </Label>
      <Input
        type="number"
        id="rating"
        min={1}
        max={5}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="bg-[#2D2B55] border-[#6C4AB6] text-white mb-4"
      />

      <Label htmlFor="review" className="block mb-2">
        Review
      </Label>
      <textarea
        id="review"
        className="w-full bg-[#2D2B55] border border-[#6C4AB6] text-white rounded mb-4 px-3 py-2"
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Type here to review anime..."
      />

      <div className="flex justify-between">
        <Button className="bg-gray-900 text-white rounded px-4 py-2" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-gray-700 text-white rounded px-4 py-2" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}
