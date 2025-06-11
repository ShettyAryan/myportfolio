'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // simulate load delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0715]/90 backdrop-blur-sm transition">
        <div className='flex flex-col gap-0.5 items-center'>
            <Image 
         src="/images/logo.png"
         alt='loading logo'
         className='animate-pulse h-35 w-80'
         width={1280}
         height={720}/>
        </div>
        
    </div>
  ) : null;
}
