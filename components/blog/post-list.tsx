import React from 'react';
import PostPreview from '../post/post-preview';
import type Post from '../../interfaces/post';
import PopularPosts from './popular-posts';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
  posts: Post[];
  pageType?: string; // New prop to differentiate between pages
};

function PostList({ posts, pageType }: Props) {
  const { theme } = useTheme(); // Use theme context

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl pb-12 md:pb-20 text-center md:text-left">
            <h1 className="h1 mb-4 px-4">
              {pageType === 'reading' ? '📚 Explore my reading notes' : '🗒️ Explore my blog'}
            </h1>
          </div>

          {/* Main content */}
          <div className="md:flex md:justify-between">

            {/* Articles container */}
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
