import Link from 'next/link';
import { useEffect, useState } from 'react';
import Search from './search';
import { FaSun, FaMoon, FaLaptop } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [top, setTop] = useState(true);
  const [searching, setSearching] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 bg-white dark:bg-gray-900 text-black dark:text-white ${
        !top && 'bg-white dark:bg-gray-800 backdrop-blur-sm shadow-lg'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          {/* Theme Toggle Icon */}
          <button onClick={toggleTheme} aria-label="Toggle Dark Mode" className="mr-4 text-2xl">
            {theme === 'light' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-400" />}
          </button>

          {/* Portfolio Button */}
          <Link
            href="https://far1h.github.io/portfolio-mac-os/"
            aria-label="Portfolio"
            className="mr-4 text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <FaLaptop />
          </Link>

          {/* Blog Title */}
          <h2 className="shrink-0 mr-4 text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <Link href="/" className="block hover:underline" aria-label="My Blog">
              Mo's Blog.
            </Link>
          </h2>

          {/* Search Button */}
          <ul className="flex grow justify-end flex-wrap items-center">
            <li>
              <button
                className="w-4 h-4 my-auto mx-2 border-black"
                aria-label="Search"
                onClick={() => setSearching(!searching)}
                disabled={searching}
              >
                <svg
                  className="w-4 h-4 fill-current text-gray-400"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </li>
          </ul>

          {/* Search Component */}
          <Search visible={searching} setVisible={setSearching} />
        </div>
      </div>
    </header>
  );
};

export default Header;
