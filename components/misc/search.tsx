import { useEffect, useRef, useState } from "react";
import PostPreview from "../post/post-preview";
import { useRouter } from "next/router";
import { useTheme } from "../contexts/ThemeContext";

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, callback]);
}

function Search({ visible, setVisible }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const { theme } = useTheme(); // Use theme context

  // Focus input when search is visible
  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  // Keyboard shortcuts for toggling search
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        setVisible(true);
      }
      if (e.key === "Escape") {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [setVisible]);

  // Hide search on outside click
  useOutsideAlerter(containerRef, (e: MouseEvent) => {
    setVisible(false);
    e.stopPropagation();
  });

  // Hide search when route changes
  useEffect(() => {
    setVisible(false);
  }, [router.asPath, setVisible]);

  // Handle search input change
  async function handleChangeInput(e) {
    const res = await fetch(`/api/search?q=${e.target.value}`);
    setSearchResults(await res.json());
  }

  return (
    <div
      className={`absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-y-auto overscroll-none overflow-x-hidden ${
        visible ? "block" : "hidden"
      } ${
        theme === "dark"
          ? "bg-gray-900/95 text-white"
          : "bg-white/95 text-gray-800"
      }`}
    >
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto flex flex-wrap mt-5 px-5"
      >
        {/* Search Bar */}
        <div className="w-full">
          <label className="block text-sm sr-only" htmlFor="search">
            Search
          </label>
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              id="search"
              type="search"
              className={`form-input w-full px-3 py-2 pl-10 ${
                theme === "dark"
                  ? "bg-gray-800 text-white placeholder-gray-400"
                  : "text-gray-800"
              }`}
              placeholder="Search my blog"
              onChange={handleChangeInput}
            />
            <button
              type="submit"
              className="absolute inset-0 right-auto"
              aria-label="Search"
            >
              <svg
                className="w-4 h-4 fill-current text-gray-400 mx-3 shrink-0"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.map((res) => (
          <div
            key={res.item.slug}
            onClick={() => {
              setSearchResults([]); // Clear search results
              inputRef.current.value = ""; // Clear the input field
            }}
          >
            <PostPreview
              title={res.item.title}
              excerpt={res.item.excerpt}
              slug={res.item.slug}
              date={res.item.date}
              author={res.item.author}
              theme={theme} // Pass theme prop
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
