import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-gray-900 border-t border-neutral-200 dark:border-gray-700">
      <div className="container mx-auto py-10 max-w-6xl sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 px-4">
          {/* Links Section */}
          <ul className="flex flex-wrap justify-center lg:justify-start space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link href="/portfolio" className="hover:text-gray-900 dark:hover:text-white transition duration-150">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/resume" className="hover:text-gray-900 dark:hover:text-white transition duration-150">
                Resume
              </Link>
            </li>
            <li>
              <Link href="/about-me" className="hover:text-gray-900 dark:hover:text-white transition duration-150">
                About Me
              </Link>
            </li>
            <li>
              <Link href="/reading/1" className="hover:text-gray-900 dark:hover:text-white transition duration-150">
                Reading
              </Link>
            </li>
          </ul>

          {/* Social Links Section */}
          <ul className="flex justify-center space-x-6">
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
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Farih Muhammad. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
