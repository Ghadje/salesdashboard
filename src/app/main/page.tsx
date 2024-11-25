import Dashboard from './dashboard/page'
import { AppProps } from 'next/app';

const Home = ({ Component, pageProps }: AppProps) => {
  return (
      <Dashboard {...pageProps} />
  );
};

export default Home;
