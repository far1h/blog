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
  return  (
    <Link as={`/${slug}`} href="/[...slug]"
      className={`flex flex-row justify-between items-center duration-300 w-full p-4 rounded-lg cursor-pointer ${
        theme === "dark"
          ? "bg-gray-900 hover:bg-gray-800 text-white border-gray-700"
          : "bg-white hover:bg-slate-100 text-black border-slate-100"
      }`}
    >
      <div>
        <header>
          <h2
            className={`h4 mb-2 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            
              {title}

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
      <div className="block shrink-0 ml-6">
        <svg
          className={`w-4 h-4 fill-current ${
            theme === "dark" ? "text-gray-500" : "text-gray-800"
          }`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
<path
                          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                          fill="currentColor"
                        />
                                </svg>
      </div>
    </Link>
  )
};

export default PostPreview;
