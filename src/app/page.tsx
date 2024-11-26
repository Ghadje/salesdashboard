
import { AppProps } from 'next/app';
import Dashboard from './main/dashboard/page';
import { AuthProvider } from '@/lib/authContext';

const Home = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Dashboard {...pageProps} />
    </AuthProvider>
  );
};

export default Home;
