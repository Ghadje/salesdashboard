import { AuthProvider } from '@/lib/authContext';
import Home from './home/page'
import { AppProps } from 'next/app';

const Dashboard = ({ Component, pageProps }: AppProps) => {
  return (
    <Home {...pageProps} />
  );
};

export default Dashboard;
