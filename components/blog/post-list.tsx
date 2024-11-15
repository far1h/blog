import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PostPreview from '../post/post-preview';
import type Post from '../../interfaces/post';
import PopularPosts from './popular-posts';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
  posts: Post[];
  pageType?: string; // New prop to differentiate between pages
  quotes: Post[]; // Array of quotes
};

// Utility function to shuffle an array
function shuffleArray(array: any[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function PostList({ posts, pageType, quotes }: Props) {
  const { theme } = useTheme(); // Use theme context
  const [shuffledQuotes, setShuffledQuotes] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false); // For fade-in animation

  // Shuffle quotes on initial render
  useEffect(() => {
    if (quotes.length > 0) {
      const shuffled = shuffleArray(quotes);
      setShuffledQuotes(shuffled);
      setCurrentIndex(0);
    }
  }, [quotes]);

  // Automatic cycling through quotes
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // Automatically move to the next quote every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [shuffledQuotes]);

  // Handle next and previous buttons
  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledQuotes.length); // Move to the next quote
      setFade(false);
    }, 500); // Fade duration
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? shuffledQuotes.length - 1 : prevIndex - 1
      ); // Move to the previous quote
      setFade(false);
    }, 500); // Fade duration
  };

  const currentQuote = shuffledQuotes[currentIndex];

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Hero Section for Random Quote */}
          {currentQuote && (
            <div
              className={`flex flex-col items-center text-center mb-20 transition-opacity duration-500 ${
                fade ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ minHeight: '6rem' }} // Reserve space for the quote
            >
              <div className="flex items-center justify-center space-x-4">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous Quote"
                  className="text-gray-400 dark:text-gray-500 hover:text-link-light dark:hover:text-link-dark transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Quote Content */}
                <div>
                  <h2
                    className={`text-3xl italic font-bold ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    <Link
                      href={`/${currentQuote.slug}`}
                      className="hover:underline text-link-light dark:text-link-dark"
                    >
                      "{currentQuote.title}"
                    </Link>
                  </h2>
                  {currentQuote.name && (
                    <p
                      className={`mt-2 text-sm uppercase ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {currentQuote.name}
                    </p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next Quote"
                  className="text-gray-400 dark:text-gray-500 hover:text-link-light dark:hover:text-link-dark transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Page Header */}
          <div className="max-w-3xl pb-12 md:pb-20 text-center md:text-left">
            <h1 className="h1 mb-4 px-4">
              {pageType === 'reading' ? '📚 Explore my reading notes' : '🗒️ Explore my blog'}
            </h1>
          </div>

          {/* Main Content */}
          <div className="md:flex md:justify-between">
            {/* Articles Container */}
            <div className="flex-1 md:basis-2/3 -mt-4 overflow-hidden break-words">
              {posts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  author={post.author}
                  slug={post.slug}
                  theme={theme}
                />
              ))}
            </div>

            {/* Sidebar */}
            <aside className="pr-4 relative mt-12 md:mt-0 md:w-64 md:ml-12 lg:ml-20 md:shrink-0">
              <PopularPosts />
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostList;
