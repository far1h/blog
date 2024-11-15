import { getAllReadingPosts, getAllQuotePosts } from '../../lib/api';
import Post from '../../interfaces/post';
import PostList from '../../components/blog/post-list';
import Pagination from '../../components/blog/pagination';
import Layout from '../../components/misc/layout';

type Props = {
  posts: Post[];
  pid: number;
  maxPid: number;
  quotes: Post[]; // Pass all quotes to the client
};

export default function Index({ posts, pid, maxPid, quotes }: Props) {
  return (
    <Layout>
      <section id="reading-posts">
        <PostList posts={posts || []} pageType="reading" quotes={quotes} />
        <Pagination currPage={pid} maxPage={maxPid} />
      </section>
    </Layout>
  );
}

const pageSize = 6;

export const getStaticProps = async ({ params }: { params: { pid: string } }) => {
  const posts = getAllReadingPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  const quotes = getAllQuotePosts(['title', 'slug']); // Fetch all quotes

  const pid = parseInt(params.pid, 10);
  const maxPid = Math.ceil(posts.length / pageSize);
  const start = (pid - 1) * pageSize;
  const paginatedPosts = posts.slice(start, start + pageSize);

  return {
    props: { posts: paginatedPosts, pid, maxPid, quotes },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllReadingPosts(['slug']);

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
