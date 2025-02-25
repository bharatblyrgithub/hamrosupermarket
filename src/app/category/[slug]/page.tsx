import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Make the page static
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static pages for all categories at build time
export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }));
}

const categories = {
  'fruits-vegetables': {
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Fresh, seasonal produce sourced from local farms",
    products: [
      {
        id: 1,
        name: "Organic Bananas",
        price: 2.99,
        unit: "bunch",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fresh organic bananas, perfect for snacking"
      },
      {
        id: 2,
        name: "Fresh Tomatoes",
        price: 3.49,
        unit: "kg",
        rating: 4.7,
        reviews: 123,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Ripe, juicy tomatoes perfect for salads"
      }
    ]
  },
  'dairy-eggs': {
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Fresh milk, cheese, eggs, and other dairy products",
    products: [
      {
        id: 3,
        name: "Fresh Milk",
        price: 3.99,
        unit: "gallon",
        rating: 4.9,
        reviews: 234,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Farm-fresh whole milk"
      },
      {
        id: 4,
        name: "Organic Eggs",
        price: 4.99,
        unit: "dozen",
        rating: 4.8,
        reviews: 178,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Farm-fresh organic eggs"
      }
    ]
  },
  'bakery': {
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Freshly baked bread, pastries, and desserts",
    products: [
      {
        id: 5,
        name: "Sourdough Bread",
        price: 5.99,
        unit: "loaf",
        rating: 4.9,
        reviews: 145,
        inStock: true,
        isOrganic: false,
        image: "https://images.unsplash.com/photo-1555951015-6da899b5c2cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Artisanal sourdough bread"
      },
      {
        id: 6,
        name: "Croissants",
        price: 2.99,
        unit: "piece",
        rating: 4.7,
        reviews: 167,
        inStock: true,
        isOrganic: false,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Buttery, flaky croissants"
      },
      {
        id: 15,
        name: "Chocolate Muffins",
        price: 3.49,
        unit: "4-pack",
        rating: 4.8,
        reviews: 132,
        inStock: true,
        isOrganic: false,
        image: "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Rich chocolate muffins with chocolate chips"
      },
      {
        id: 16,
        name: "Baguette",
        price: 3.99,
        unit: "piece",
        rating: 4.9,
        reviews: 178,
        inStock: true,
        isOrganic: false,
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Traditional French baguette, freshly baked"
      },
      {
        id: 17,
        name: "Cinnamon Rolls",
        price: 4.99,
        unit: "6-pack",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        isOrganic: false,
        image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Soft cinnamon rolls with cream cheese frosting"
      },
      {
        id: 18,
        name: "Whole Wheat Bread",
        price: 4.49,
        unit: "loaf",
        rating: 4.6,
        reviews: 142,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Healthy whole wheat bread, perfect for sandwiches"
      }
    ]
  },
  'beverages': {
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Refreshing drinks and beverages",
    products: [
      {
        id: 7,
        name: "Green Tea",
        price: 4.99,
        unit: "box",
        rating: 4.6,
        reviews: 189,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Premium organic green tea"
      },
      {
        id: 8,
        name: "Fresh Orange Juice",
        price: 5.99,
        unit: "liter",
        rating: 4.8,
        reviews: 145,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Freshly squeezed orange juice"
      }
    ]
  },
  'meat-seafood': {
    name: "Meat & Seafood",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Quality meat and fresh seafood",
    products: [
      {
        id: 9,
        name: "Chicken Breast",
        price: 8.99,
        unit: "kg",
        rating: 4.7,
        reviews: 167,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fresh organic chicken breast"
      },
      {
        id: 10,
        name: "Atlantic Salmon",
        price: 14.99,
        unit: "kg",
        rating: 4.8,
        reviews: 134,
        inStock: true,
        isOrganic: false,
        image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fresh Atlantic salmon fillet"
      }
    ]
  },
  'snacks': {
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Delicious snacks and treats",
    products: [
      { 
        id: 23, 
        name: "Dark Chocolate",
        price: 3.99,
        unit: "bar",
        rating: 4.9,
        reviews: 189,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1623660053975-cf75a8be0908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "72% dark chocolate bar, rich and smooth"
      },
      { 
        id: 21, 
        name: "Kettle Chips",
        price: 2.99,
        unit: "bag",
        rating: 4.6,
        reviews: 167,
        inStock: true,
        isOrganic: false,
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Crispy kettle-cooked potato chips"
      }
    ]
  },
  'pantry-items': {
    name: "Pantry Items",
    image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Essential cooking and baking ingredients",
    products: [
      {
        id: 11,
        name: "Extra Virgin Olive Oil",
        price: 12.99,
        unit: "bottle",
        rating: 4.9,
        reviews: 234,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Premium organic olive oil"
      },
      {
        id: 12,
        name: "Quinoa",
        price: 6.99,
        unit: "500g",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Organic white quinoa"
      }
    ]
  },
  'household': {
    name: "Household",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Cleaning and household essentials",
    products: [
      {
        id: 13,
        name: "Natural Dish Soap",
        price: 4.99,
        unit: "bottle",
        rating: 4.6,
        reviews: 178,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Eco-friendly dish soap"
      },
      {
        id: 14,
        name: "Bamboo Paper Towels",
        price: 5.99,
        unit: "roll",
        rating: 4.8,
        reviews: 145,
        inStock: true,
        isOrganic: true,
        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Sustainable bamboo paper towels"
      }
    ]
  }
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-yellow-400'
              : star - 0.5 <= rating
              ? 'text-yellow-400'
              : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  );
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = categories[params.slug as keyof typeof categories];

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <div className="relative h-72 rounded-xl overflow-hidden mb-12">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="text-white px-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {category.products.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority={index < 4}
                  quality={80}
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
                {product.isOrganic && (
                  <span className="absolute top-4 left-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                    Organic
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        /{product.unit}
                      </span>
                    </div>
                    <StarRating rating={product.rating} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {product.reviews} reviews
                    </span>
                    <button 
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        product.inStock
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
