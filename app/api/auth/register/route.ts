import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        // In production, you'd hash the password here
        // For now, we'll skip password storage for simplicity
      }
    })

    // Create default user preferences
    await prisma.userPreferences.create({
      data: {
        userId: user.id,
        studyDuration: 1500, // 25 minutes
        breakDuration: 420,  // 7 minutes
        breakMode: 'manual',
        soundEnabled: true,
        darkMode: false,
      }
    })

    return NextResponse.json({ 
      message: 'User created successfully',
      user: { id: user.id, name: user.name, email: user.email }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
