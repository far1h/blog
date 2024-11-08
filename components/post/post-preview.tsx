import Link from "next/link";
import type Author from "../../interfaces/author";
import PostMeta from "./post-meta";

type Props = {
  title: string;
  date?: string;
  excerpt: string;
  author?: Author;
  slug: string;
  theme: string; // Add theme prop
};

const PostPreview = ({
  title,
  date,
  excerpt,
  author,
  slug,
  theme,
}: Props) => {
  return (
    <article
      className={`flex items-center py-4 justify-between w-full border-b ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div>
        <header>
          <h2
            className={`h4 mb-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            <Link
              as={`/${slug}`}
              href="/[...slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h2>
        </header>
        <div
          className={`text-lg mb-4 text-ellipsis ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {excerpt.slice(0, 500)}
        </div>
        <footer className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-800"}`}>
          <PostMeta date={date} author={author} />
        </footer>
      </div>
      <Link as={`/${slug}`} href="/[...slug]" className="block shrink-0 ml-6">
        <span className="sr-only">Read more</span>
        <svg
          className={`w-4 h-4 fill-current ${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
        </svg>
      </Link>
    </article>
  );
};

export default PostPreview;
