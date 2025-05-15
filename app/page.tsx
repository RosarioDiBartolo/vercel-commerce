import ProductOverviewCarousel from '@/components/products-overview-carousl';
import { BackgroundPaths } from '@/components/ui/background-paths';
import Hero from './hero';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours

export const metadata = {
  title: 'StyleLoom | Where Sharp Looks Begin',
  description: 'Premium grooming, timeless style. Explore the best in barbering and haircare products.',
  openGraph: {
    type: 'website',
    title: 'StyleLoom | Where Sharp Looks Begin',
    description: 'Premium grooming, timeless style. Explore the best in barbering and haircare products.',
  },
};

export default async function HomePage() {
  return (
    <BackgroundPaths className={'  '}> 
              <Hero />
             
             <ProductOverviewCarousel />

   
 </BackgroundPaths>   
  );
}
