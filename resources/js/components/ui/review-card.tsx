import React from "react";

interface TestimonialCardProps {
  imageUrl: string;
  name: string;
  title: string;
  review: string;
  rating: number; // out of 5
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  imageUrl,
  name,
  title,
  review,
  rating,
}) => {
  const MAX_RATING = 5;

  return (
    <div className="bg-white max-w-md dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-700 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-600 transform hover:scale-105">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4 object-cover"
          src={imageUrl}
          alt={name}
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{name}</h4>
          <p className="text-gray-600 dark:text-gray-400">{title}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">"{review}"</p>
      <div className="mt-6 flex items-center">
        {[...Array(MAX_RATING)].map((_, index) => (
          <svg
            key={index}
            aria-hidden="true"
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{`Star ${index + 1}`}</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 
              1 0 00.95.69h3.462c.969 0 1.371 1.24.588 
              1.81l-2.8 2.034a1 1 0 00-.364 
              1.118l1.07 3.292c.3.921-.755 
              1.688-1.54 1.118l-2.8-2.034a1 1 0 
              00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 
              1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 
              1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-gray-600 dark:text-gray-400 ml-2">{rating.toFixed(1)}</span>
      </div>
    </div>
  );
};
