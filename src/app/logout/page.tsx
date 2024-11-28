'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';

const LogoutPage = () => {
  const [loading, setLoading] = useState(false);
  const { logout: deleteToken } = useAuth();
  const router = useRouter();
  console.log("🚀 ~ LogoutPage ~ router:", router)


  
    deleteToken();
    router.replace("/");
  
  return (
     <div>
        {
            loading ? <p>Loading ...</p> : <p></p>
        }
     </div>
  );
};

export default LogoutPage;
