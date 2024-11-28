'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import { login, LoginCredentials } from '../../lib/auth';
import IrisLogo from '@/app/ui/iris-logo';
import {
  AtSymbolIcon,
  KeyIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/dashboard/button';

const LoginPage = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login: saveToken } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = await login(credentials);
      saveToken(token);
      router.push('/dashboard/home'); // Redirect to the dashboard after login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-orange-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <IrisLogo />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#666',
                textAlign: 'left',
              }}
            >
              Email:
            </label>
            <div className="relative">
            <input
             className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
             <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                color: '#666',
                textAlign: 'left',
              }}
            >
              Password:
            </label>
            <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <Button disabled={loading} className="mt-4 w-full">
            {loading ? 'Logging in...' : 'Se connecter'}<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        </form>
        </div>
      </main>
  );
};

export default LoginPage;
