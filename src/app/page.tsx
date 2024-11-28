import { AuthProvider } from '@/lib/authContext';
import Home from './home/page';

export default function Page() {
  return (
    <AuthProvider>
      <Home/>
    </AuthProvider>
  );
}
