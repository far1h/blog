import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getFilesRecursively } from './modules/find-files-recusively.mjs'
import { getMDExcerpt } from './markdownToHtml'

const mdDir = path.join(process.cwd(), process.env.COMMON_MD_DIR)

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md(?:#[^\)]*)?$/, '')
  const fullPath = path.join(mdDir, `${realSlug}.md`)
  const data = parseFileToObj(fullPath);

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })
  return items
}

function parseFileToObj(pathToObj: string) {
  const fileContents = fs.readFileSync(pathToObj, 'utf8')
  const { data, content } = matter(fileContents)

  data['content'] = content

  // modify obj
  if (typeof data['excerpt'] === 'undefined') {
    data['excerpt'] = getMDExcerpt(content, 500);
  }
  if (typeof data['title'] === 'undefined') {
    data['title'] = decodeURI(path.basename(pathToObj, '.md'))
  }
  if (typeof data['date'] === 'object') {
    data['date'] = data['date']?.toISOString()
  } else if (typeof data['date'] !== 'undefined') {
    data['date'] = data['date'].toString()
  }
  return data
}

export function getAllPosts(fields: string[] = []) {
  const files = getFilesRecursively(mdDir, /\.md(?:#[^\)]*)?/);
  
  const posts = files
    .map((slug) => {
      const post = getPostBySlug(slug, fields);
      return post;
    })
    .sort((post1, post2) => {
      const date1 = post1.date ? new Date(post1.date) : null;
      const date2 = post2.date ? new Date(post2.date) : null;

      // If both posts have dates, sort them in descending order
      if (date1 && date2) {
        return date2.getTime() - date1.getTime();
      }

      // If one post has a date and the other doesn't, prioritize the one with a date
      if (date1 && !date2) {
        return -1;
      }
      if (!date1 && date2) {
        return 1;
      }

      // If neither have a date, keep their order
      return 0;
    });

  return posts;
}


export function getLinksMapping() {
  const linksMapping = new Map<string, string[]>();
  const postsMapping = new Map((getAllPosts(['slug', 'content'])).map(i => [i.slug, i.content]));
  const allSlugs = new Set(postsMapping.keys());
  postsMapping.forEach((content, slug) => {
    const mdLink = /\[[^\[\]]+\]\(([^\(\)]+)\)/g
    const matches = Array.from(content.matchAll(mdLink))
    const linkSlugs = []
    for (var m of matches) {
      const linkSlug = getSlugFromHref(slug, m[1])
      if (allSlugs.has(linkSlug)) {
        linkSlugs.push(linkSlug);
      }
    }
    linksMapping[slug] = linkSlugs
  });
  return linksMapping;
}

export function getSlugFromHref (currSlug: string, href: string) {
  return decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md(?:#[^\)]*)?$/, '')
}

export function updateMarkdownLinks(markdown: string, currSlug: string) {
  // remove `.md` from links
  markdown = markdown.replaceAll(/(\[[^\[\]]+\]\([^\(\)]+)(\.md(?:#[^\)]*)?)(\))/g, "$1$3");

  // update image links
  markdown = markdown.replaceAll(/(\[[^\[\]]*\]\()([^\(\)]+)(\))/g, (m, m1, m2: string, m3) => {
    const slugDir = path.join(...currSlug.split(path.sep).slice(0, -1))
    let relLink = m2;
    if (!m2.startsWith(slugDir)) {
      relLink = path.join(slugDir, m2)
    }
    const relAssetDir = path.relative('./public', process.env.MD_ASSET_DIR)
    const fileSlugRel = decodeURI(path.join(mdDir, relLink))
    const fileSlugAbs = decodeURI(path.join(mdDir, m2))
    if (fs.existsSync(fileSlugRel)) {
      const imgPath = path.join(relAssetDir, relLink);
      return `${m1}/${imgPath}${m3}`
    } else if (fs.existsSync(fileSlugAbs)) {
      const imgPath = path.join(relAssetDir, m2);
      return `${m1}/${imgPath}${m3}`
    }
    return m;
  });
  return markdown
}


export function getAllReadingPosts(fields: string[] = []) {
  // Define the reading directory path
  const readingDir = path.join(mdDir, 'reading');

  // Check if the reading directory exists
  if (!fs.existsSync(readingDir)) {
    console.warn(`Reading directory (${readingDir}) does not exist.`);
    return [];
  }

  // Get all files within the /reading directory recursively
  const files = getFilesRecursively(readingDir, /\.md$/);

  // Process files into posts
  const posts = files
    .map((slug) => {
      const realSlug = path.join('reading', slug); // Maintain the correct relative slug
      const post = getPostBySlug(realSlug, fields);
      return post;
    })
    .sort((post1, post2) => {
      const date1 = post1.date ? new Date(post1.date) : null;
      const date2 = post2.date ? new Date(post2.date) : null;

      // Sort posts with dates in descending order
      if (date1 && date2) {
        return date2.getTime() - date1.getTime();
      }

      // Posts with dates come first
      if (date1 && !date2) {
        return -1;
      }
      if (!date1 && date2) {
        return 1;
      }

      // Keep original order for posts without dates
      return 0;
    });

  return posts;
}

export function getAllQuotePosts(fields: string[] = []) {
  // Define the quotes directory path
  const quotesDir = path.join(mdDir, 'quotes');

  // Check if the quotes directory exists
  if (!fs.existsSync(quotesDir)) {
    console.warn(`Quotes directory (${quotesDir}) does not exist.`);
    return [];
  }

  // Get all files within the /quotes directory recursively
  const files = getFilesRecursively(quotesDir, /\.md$/);

  // Process files into posts
  const posts = files
    .map((slug) => {
      const realSlug = path.join('quotes', slug); // Maintain the correct relative slug
      const post = getPostBySlug(realSlug, fields);
      return post;
    })
    .sort((post1, post2) => {
      const date1 = post1.date ? new Date(post1.date) : null;
      const date2 = post2.date ? new Date(post2.date) : null;

      // Sort posts with dates in descending order
      if (date1 && date2) {
        return date2.getTime() - date1.getTime();
      }

      // Posts with dates come first
      if (date1 && !date2) {
        return -1;
      }
      if (!date1 && date2) {
        return 1;
      }

      // Keep original order for posts without dates
      return 0;
    });

  return posts;
}
