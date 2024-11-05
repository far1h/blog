import PreviewLink from "./preview-link";
import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-gray-900 border-t border-neutral-200 dark:border-gray-700">
      <div className="container mx-auto px-5">
        <div className="py-10 flex flex-col lg:flex-row items-center justify-between">
          {/* Original Content with Dark Mode Additions */}
          {/* <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <PreviewLink href="/statically-generated">Statically Generated</PreviewLink> with Next.js.
          </h3> */}
          {/* <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="#"
              className="mx-3 bg-black dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-600 hover:text-black dark:hover:text-white border border-black dark:border-gray-500 text-white dark:text-gray-300 font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Read Documentation
            </a>
            <a
              href={`https://github.com/far1h/my_blog`}
              className="mx-3 font-bold hover:underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              View on GitHub
            </a>  
          </div> */}

          <ul className="flex space-x-6 mb-4 md:order-1">
            <li>
              <Link href="mailto:farih.muhammad@binus.ac.id" aria-label="Email">
                <FaEnvelope className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out" />
              </Link>
            </li>
            <li>
              <Link href="https://linkedin.com/in/farihmhmd" aria-label="LinkedIn">
                <FaLinkedin className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out" />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/far1h" aria-label="GitHub">
                <FaGithub className="w-8 h-8 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out" />
              </Link>
            </li>
          </ul>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            &copy; Farih Muhammad. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
