'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './authContext';

export const withAuth = (Component: React.FC) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push('/');
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return <div>Loading...</div>; 
    }

    if (!isAuthenticated) {
      return null; 
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
