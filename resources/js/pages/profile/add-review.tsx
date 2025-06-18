import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function RateAndReview() {
  const [selectedAnime, setSelectedAnime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const animeList = [
    'Attack on Titan',
    'Your Name',
    'Spirited Away',
    'Naruto',
    'One Piece',
    'Demon Slayer',
    'Jujutsu Kaisen',
    'Death Note',
  ];

  const filteredAnime = animeList.filter(anime =>
    anime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    console.log({ selectedAnime, rating, reviewText });
  };

  return (
    <AppLayout>
      <Head title="Rate and Review" />
      <div className="min-h-screen w-full bg-[#1D1A39] p-4 text-white">
        <div className="flex flex-col gap-4 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center">RATE AND REVIEW</h2>
          <div className="border border-[#372948] rounded-xl p-4 bg-[#2D2B55]">

            {/* Custom Dropdown */}
            <label className="block mb-2">Search and Select Anime</label>
            <div className="relative mb-4">
              <input
                type="text"
                className="w-full bg-[#2D2B55] border border-[#6C4AB6] text-white rounded px-3 py-2"
                placeholder="Search or select anime..."
                value={searchTerm || selectedAnime}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  setSelectedAnime('');
                }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <ul className="absolute z-10 w-full bg-[#2D2B55] border border-[#6C4AB6] rounded mt-1 max-h-48 overflow-y-auto">
                  {filteredAnime.length > 0 ? (
                    filteredAnime.map((anime, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-[#372948]"
                        onClick={() => {
                          setSelectedAnime(anime);
                          setSearchTerm('');
                          setIsDropdownOpen(false);
                        }}
                      >
                        {anime}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-400">No results found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Rating */}
            <label htmlFor="rating" className="block mb-2">Rating (1 - 5)</label>
            <input
              type="number"
              id="rating"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full bg-[#2D2B55] border border-[#6C4AB6] text-white rounded px-3 py-2 mb-4"
            />


            {/* Review */}
            <label htmlFor="review" className="block mb-2">Review</label>
            <textarea
              id="review"
              className="w-full bg-[#2D2B55] border border-[#6C4AB6] text-white rounded mb-4"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Type here to review anime..."
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="bg-gray-900 text-white rounded px-4 py-2"
                onClick={() => console.log('Cancel')}
              >
                Cancel
              </button>
              <button
                className="bg-gray-700 text-white rounded px-4 py-2"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}