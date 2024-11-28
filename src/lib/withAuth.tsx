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
        router.push('/'); // Redirect to login if not authenticated
      }
    }, [loading, isAuthenticated, router]);

    if (loading) {
      return <div>Loading...</div>; // Show a loading spinner while checking auth
    }

    if (!isAuthenticated) {
      return null; // Prevent rendering if the user is not authenticated
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};
