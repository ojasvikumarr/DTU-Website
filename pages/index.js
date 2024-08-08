import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// const inter = Inter({ subsets: ["latin"] });

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Replace '/new-page' with your desired route
  }, [router]);

  return null; // Or a loading spinner while redirecting
};

export default IndexPage;
