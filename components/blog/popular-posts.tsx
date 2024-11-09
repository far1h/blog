import Link from "next/link";
import Author from "../../interfaces/author";
import PreviewLink from "../misc/preview-link";

export type PopularPostProps = {
    slug: string
    title: string
    author?: Author
}[]

const popularPosts: PopularPostProps = [
  {
    slug: "/web-programming",
    title: "Web Programming Notes"
  },
  {
    slug: "/operating-systems",
    title: "Operating Systems Notes"
  },
  {
    slug: "/compilation-techniques",
    title: "Compilation Technique Notes"
  },
]

function PopularPosts() {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold leading-snug tracking-tight mb-4">Popular Posts</h4>
      <ul className="-my-2">
        {popularPosts.map((post) => (
          <li className="flex py-2 border-b border-gray-200" key={post.slug}>
            <svg className="w-4 h-4 shrink-0 fill-current text-gray-400 mt-1 mr-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.686 5.695L10.291.3c-.4-.4-.999-.4-1.399 0s-.4.999 0 1.399l.6.599-6.794 3.697-1-1c-.4-.399-.999-.399-1.398 0-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 13.988 2 15.387l3.696-3.697 3.997 3.996c.5.5 1.199.2 1.398 0 .4-.4.4-.999 0-1.398l-.999-1 3.697-6.694.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499zM8.493 11.79L4.196 7.494l6.695-3.697 1.298 1.299-3.696 6.694z" />
            </svg>
            <article>
              <h3 className="font-medium mb-1">
                <PreviewLink href={`${post.slug}`}>
                  {post.title}
                </PreviewLink>
              </h3>
              {post.author && (
                <div className="text-sm text-gray-800">
                  <span className="text-gray-600">By </span>
                  <a className="font-medium">{post.author.name}</a>
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PopularPosts;