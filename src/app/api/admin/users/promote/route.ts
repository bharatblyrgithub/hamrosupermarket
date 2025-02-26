import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Role, Prisma } from "@prisma/client";

export async function POST(request: Request) {
  try {
    // Check if the requester is an admin
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 }
      );
    }

    if (session.user.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    // Validate request body
    let userId: string;
    try {
      const body = await request.json();
      userId = body.userId;

      if (!userId || typeof userId !== 'string') {
        return NextResponse.json(
          { error: "Missing or invalid user ID" },
          { status: 400 }
        );
      }
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Prevent self-demotion
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "Cannot modify your own role" },
        { status: 400 }
      );
    }

    // Get current user role
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Toggle role between USER and ADMIN
    const newRole = currentUser.role === Role.USER ? Role.ADMIN : Role.USER;

    // Update user role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        ...updatedUser,
        createdAt: updatedUser.createdAt.toISOString()
      }
    });
  } catch (error) {
    console.error('Error updating user role:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Handle specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
