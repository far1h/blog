import { AppProps } from 'next/app';
import '../styles/index.css';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { ThemeProvider } from '../components/contexts/ThemeContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
