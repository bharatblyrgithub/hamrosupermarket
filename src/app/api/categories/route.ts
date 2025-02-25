import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface CategoryCount {
  category: string;
  _count: {
    id: number;
  };
}

interface CategoryResponse {
  name: string;
  productCount: number;
  image: string;
}

export async function GET(request: Request) {
  try {
    // Get all unique categories and count their products
    const categoriesWithCount = await prisma.product.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    });

    // Format the response with category images
    const categories: CategoryResponse[] = categoriesWithCount.map((category: CategoryCount) => ({
      name: category.category,
      productCount: category._count.id,
      image: getCategoryImage(category.category)
    }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to get category images
function getCategoryImage(category: string): string {
  const defaultImage = "https://images.unsplash.com/photo-1542838132-92c53300491e";
  
  const categoryImages: Record<string, string> = {
    'Fruits': 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2',
    'Vegetables': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    'Dairy': 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    'Bakery': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73',
    'Meat': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
    'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e',
    'Snacks': 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60',
    'Household': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f'
  };

  // Add quality and size parameters to the Unsplash URLs
  const imageUrl = categoryImages[category] || defaultImage;
  return `${imageUrl}?auto=format&fit=crop&w=800&q=80`;
}
