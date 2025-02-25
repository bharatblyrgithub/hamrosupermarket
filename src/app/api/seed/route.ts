import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const initialProducts = [
  {
    name: "Fresh Organic Apples",
    description: "Sweet and crispy organic apples, perfect for snacking or baking",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3",
    category: "Fruits",
    stock: 50,
    unit: "kg"
  },
  {
    name: "Fresh Carrots",
    description: "Locally grown organic carrots, rich in vitamins and minerals",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3",
    category: "Vegetables",
    stock: 75,
    unit: "kg"
  },
  {
    name: "Whole Grain Bread",
    description: "Freshly baked whole grain bread, made with organic flour",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3",
    category: "Bakery",
    stock: 30,
    unit: "piece"
  },
  {
    name: "Organic Milk",
    description: "Fresh organic whole milk from local dairy farms",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3",
    category: "Dairy",
    stock: 40,
    unit: "liter"
  }
];

// POST /api/seed - Seed initial products
export async function POST(request: Request) {
  try {
    // Check if products already exist
    const existingProducts = await prisma.product.findMany();
    
    if (existingProducts.length > 0) {
      return NextResponse.json(
        { message: "Database already seeded" },
        { status: 400 }
      );
    }

    // Create all products
    const products = await Promise.all(
      initialProducts.map(product =>
        prisma.product.create({
          data: product
        })
      )
    );

    return NextResponse.json({
      message: "Database seeded successfully",
      products
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
