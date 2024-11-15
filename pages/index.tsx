import { useEffect } from 'react';
import { getAllPosts, getAllQuotePosts } from '../lib/api'; // Import getAllQuotePosts
import Post from '../interfaces/post';
import PostList from '../components/blog/post-list';
import Pagination from '../components/blog/pagination';
import Layout from '../components/misc/layout';

type Props = {
  posts: Post[];
  pid: number;
  maxPid: number;
  quotes: Post[]; // Add quotes to props
};

const pageSize = 6;

export default function Home({ posts, pid, maxPid, quotes }: Props) {
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      e.preventDefault();
      const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach((link) => link.addEventListener('click', handleSmoothScroll));

    return () => {
      scrollLinks.forEach((link) => link.removeEventListener('click', handleSmoothScroll));
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      {/* <section
        className="relative flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-blue-500 to-blue-700 text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Welcome to My Blog</h1>
        <p className="text-lg md:text-xl font-medium mb-6">
          Explore posts, insights, and thoughts about the web, tech, and beyond!
        </p>
        <a
          href="#posts"
          className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-100 transition"
        >
          Start Exploring
        </a>
      </section> */}

      {/* Posts Section */}
      <section id="posts">
        <PostList posts={posts || []} quotes={quotes || []} pageType="home" />
        <Pagination currPage={pid} maxPage={maxPid} />
      </section>
    </Layout>
  );
}

const filterPosts = (posts: any[]) => {
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

export const getStaticProps = async () => {
  // Fetch posts
  let posts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);
  posts = filterPosts(posts);

  // Fetch quotes
  const quotes = await getAllQuotePosts(['title', 'slug']); // Fetch quotes for random display

  const pid = 1; // Hardcoded for homepage
  const maxPid = Math.ceil(posts.length / pageSize); // Calculate total pages
  const start = (pid - 1) * pageSize; // Calculate starting index
  posts = posts.slice(start, start + pageSize); // Paginate posts

  return {
    props: { posts, pid, maxPid, quotes },
  };
};
