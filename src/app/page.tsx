import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/layout/Newsletter";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
}
