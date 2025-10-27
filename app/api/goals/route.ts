import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/goals - Fetch all goals for user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const goals = await prisma.goal.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { goalTimeStamp: 'desc' },
      include: {
        studySessions: true
      }
    })

    // Convert DateTime to timestamp for Redux and strip extra fields
    const convertedGoals = goals.map(goal => ({
      id: goal.id,
      goalDescription: goal.goalDescription,
      goalTimeStamp: new Date(goal.goalTimeStamp).getTime(),
      totalTimeStudied: goal.totalTimeStudied
    }))

    return NextResponse.json({ goals: convertedGoals })
  } catch (error) {
    console.error('Error fetching goals:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/goals - Create new goal
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { goalDescription } = await request.json()

    const goal = await prisma.goal.create({
      data: {
        userId: (session.user as any).id,
        goalDescription,
      }
    })

    return NextResponse.json({ goal })
  } catch (error) {
    console.error('Error creating goal:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

