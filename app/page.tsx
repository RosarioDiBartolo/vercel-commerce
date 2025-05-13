import { Button } from '@/components/ui/button';
import CategoriesList from 'components/categories-list';
import { MoveUpRight } from 'lucide-react';
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
    <div className="mx-auto max-w-7xl md:p-10">
      <div className="bg-background border border-border border-dashed rounded-t-2xl w-full">
        <Hero />

        <div className="relative flex flex-wrap">
          {/* CTA Button */}
          <div className="rounded-3xl absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background p-3 z-10">
            <Button className="cursor-pointer flex gap-2 p-5 !px-6 group items-center border border-muted-foreground border-dashed rounded-xl">
              Shop Haircare
              <MoveUpRight className="transition-all group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>

          {/* Left Content - Categories & Intro */}
          <div className="p-10 space-y-6 flex-1">
            <CategoriesList />

            <h3 className="text-3xl font-aclonica">
              Groom Bold. Live Sharp.
            </h3>

            <p className="font-abeezee text-muted-foreground">
              Welcome to <strong>StyleLoom</strong> — your go-to destination for expert barbering and our signature line of premium haircare products. Whether you're in the chair or shopping from home, we’ve got your style covered.
            </p>
          </div>

          {/* Right Content - Product Branding */}
          <div className="p-10 space-y-6 flex-1">
            <h4 className="text-2xl font-semibold font-aclonica">Introducing StyleLoom Essentials</h4>
            <p className="font-abeezee text-muted-foreground">
              Crafted for barbers, loved by all. Our exclusive product line is designed to keep your hair healthy, strong, and stylish. Stay fresh — every day.
            </p>

            {/* Placeholder: Featured Products */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-xl shadow-sm text-center">
                <h5 className="text-lg font-semibold">Matte Styling Cream</h5>
                <p className="text-sm text-muted-foreground">Strong hold, no shine.</p>
              </div>
              <div className="bg-muted p-4 rounded-xl shadow-sm text-center">
                <h5 className="text-lg font-semibold">Hydration Shampoo</h5>
                <p className="text-sm text-muted-foreground">Cleanse + nourish every strand.</p>
              </div>
              {/* Add more products here later */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
