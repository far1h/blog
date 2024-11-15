import { getAllPosts, getAllQuotePosts } from '../../lib/api'; // Include quotes API
import Post from '../../interfaces/post';
import PostList from '../../components/blog/post-list';
import Pagination from '../../components/blog/pagination';
import Layout from '../../components/misc/layout';

type Props = {
  posts: Post[];
  pid: number;
  maxPid: number;
  quotes: Post[]; // Include quotes as part of props
};

export default function Index({ posts, pid, maxPid, quotes }: Props) {
  return (
    <Layout>
      <section id="posts">
        <PostList posts={posts || []} quotes={quotes || []} /> {/* Pass quotes */}
        <Pagination currPage={pid} maxPage={maxPid} />
      </section>
    </Layout>
  );
}

const pageSize = 6;

const filterPosts = (posts: any[]) => {
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
};

export const getStaticProps = async ({ params }: { params: { pid: string } }) => {
  // Fetch blog posts
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
  const quotes = await getAllQuotePosts(['title', 'slug']); // Include relevant fields

  const pid = parseInt(params.pid, 10);
  const maxPid = Math.ceil(posts.length / pageSize);
  const start = (pid - 1) * pageSize;
  posts = posts.slice(start, start + pageSize);

  return {
    props: { posts, pid, maxPid, quotes },
  };
};

export const getStaticPaths = async () => {
  let posts = await getAllPosts(['slug']);
  posts = filterPosts(posts);

  const paths = [];
  let pid = 1;
  for (let i = 0; i < posts.length; i += pageSize) {
    paths.push({
      params: {
        pid: (pid++).toString(),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};
