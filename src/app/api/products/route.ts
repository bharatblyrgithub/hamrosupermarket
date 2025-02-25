import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { z } from "zod";

// Product validation schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  image: z.string().url("Image must be a valid URL"),
  category: z.string().min(1, "Category is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  unit: z.string().min(1, "Unit is required")
});

// Rate limiting
const REQUESTS_PER_MINUTE = 60;
const requestCounts = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  
  const requestData = requestCounts.get(ip) || { count: 0, timestamp: now };
  
  if (now - requestData.timestamp > windowMs) {
    // Reset if window has passed
    requestData.count = 1;
    requestData.timestamp = now;
  } else {
    requestData.count++;
  }
  
  requestCounts.set(ip, requestData);
  return requestData.count <= REQUESTS_PER_MINUTE;
}

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Build where clause
    const where: any = {
      name: { not: "" },
      description: { not: "" },
      price: { gt: 0 },
      image: { not: "" },
      category: { not: "" },
      stock: { gte: 0 },
      unit: { not: "" }
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    // Build order by
    let orderBy: any = { createdAt: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    if (sort === "price_desc") orderBy = { price: "desc" };
    if (sort === "name_asc") orderBy = { name: "asc" };
    if (sort === "name_desc") orderBy = { name: "desc" };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: Math.min(limit, 100), // Limit maximum items
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        category: true,
        stock: true,
        unit: true
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products. Please try again later." },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product (protected, admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = productSchema.parse(body);

    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        image: validatedData.image,
        category: validatedData.category,
        stock: validatedData.stock,
        unit: validatedData.unit
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid product data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product. Please try again later." },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update a product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id = request.url.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Validate request body
    const validatedData = productSchema.partial().parse(body);

    const product = await prisma.product.update({
      where: { id },
      data: validatedData
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid product data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product. Please try again later." },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(request: Request) {
  try {
    const id = request.url.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product. Please try again later." },
      { status: 500 }
    );
  }
}
