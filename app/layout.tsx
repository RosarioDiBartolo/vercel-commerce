import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import AnimatedHr from 'components/layout/navbar/animated-hr';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './styles/globals.css';
import './styles/style.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  robots: {
    follow: true,
    index: true
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE
      }
    })
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className=" w-screen  bg-secondary text-foreground selection:bg-pink-500 selection:text-white 
       h-svh flex flex-col">
        <header className=' sticky top-0 z-50'>
          <Navbar />
          <AnimatedHr />
        </header> 
          <main className=' flex-1'>
            {children}
            </main>
         <Suspense>
          <Footer />
         </Suspense>
      </body>
    </html>
  );
}
