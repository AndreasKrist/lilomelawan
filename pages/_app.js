import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;