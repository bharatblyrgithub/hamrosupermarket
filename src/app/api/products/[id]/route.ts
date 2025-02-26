import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Input validation
  if (!params?.id || typeof params.id !== 'string') {
    return NextResponse.json(
      { error: "Missing or invalid product ID" },
      { status: 400 }
    );
  }

  try {
    console.log(`Fetching product with ID: ${params.id}`);
    
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    // Log the full error for debugging
    console.error("Error fetching product:", {
      error,
      productId: params.id,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
