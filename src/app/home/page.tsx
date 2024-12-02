"use client"

import Image from 'next/image'
import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'
import IrisLogo from '../ui/iris-logo'
import {
    ArrowRightIcon,
  } from '@heroicons/react/24/outline';
import { Button } from '../dashboard/button'
import { useEffect } from 'react'

function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }else if (!loading && isAuthenticated){
        router.push('/dashboard/home');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if(!loading && !isAuthenticated){ // todo
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-orange-500 p-4 md:h-52">
                <IrisLogo />
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                  <strong>Bienvenue.</strong> Ceci est le tableau de bord {' '}
                  <a href="https://iris.dz/" className="text-orange-500">
                  Iris
                  </a>
                  , pour les achats.
                </p>
                <Button
                  onClick={()=> router.push('/login')}
                  className="flex items-center gap-5 self-start rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-400 md:text-base"
                >
                Se connecter <ArrowRightIcon className="w-5 md:w-6" />
                </Button>
                </div>
                <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-0">
                    <Image
                      src="/hero-desktop1.png"
                      width={1000}
                      height={760}
                      className="hidden md:block"
                      alt="Screenshots of the dashboard project showing desktop version"
                    />
                </div>
            </div>
        </main>
      );
  }
}

export default Home
