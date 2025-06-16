import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { withApiMiddleware } from '@/lib/api-middleware'

// Handler for user registration
async function registerHandler(request: NextRequest) {
  const { email, password, name } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required', code: 'missing_fields' },
      { status: 400 }
    )
  }

  // Email validation with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email format', code: 'invalid_email' },
      { status: 400 }
    )
  }

  // Password validation - at least 8 chars with at least one number and one letter
  if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    return NextResponse.json(
      { 
        error: 'Password must be at least 8 characters and contain at least one letter and one number',
        code: 'invalid_password'
      },
      { status: 400 }
    )
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists', code: 'user_exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'CUSTOMER', // Default role for new users
      },
      // Only select fields that are safe to return
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })

    return NextResponse.json(
      { user, message: 'Registration successful' },
      { status: 201 }
    )
  } catch (error) {
    throw error; // The middleware will handle this error
  }
}

// Export the POST handler with middleware
export const POST = (request: NextRequest) => withApiMiddleware(
  request, 
  registerHandler, 
  { rateLimit: true, corsEnabled: true }  // Apply rate limiting, but no auth required
);
