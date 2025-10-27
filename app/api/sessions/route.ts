import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST /api/sessions - Create new study session
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { goalId, duration, completed } = await request.json()

    const studySession = await prisma.studySession.create({
      data: {
        userId: (session.user as any).id,
        goalId: goalId || null,
        duration,
        completed,
      }
    })

    // Update goal's total time studied
    if (goalId) {
      await prisma.goal.update({
        where: { id: goalId },
        data: {
          totalTimeStudied: {
            increment: duration
          }
        }
      })
    }

    return NextResponse.json({ studySession })
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/sessions - Get all sessions for a user or a specific goal
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const goalId = searchParams.get('goalId')
    const userId = (session.user as any).id

    const where = goalId 
      ? { userId, goalId }
      : { userId }

    const studySessions = await prisma.studySession.findMany({
      where,
      orderBy: { sessionDate: 'desc' }
    })

    // Convert DateTime to timestamp for Redux and strip extra fields
    const sessions = studySessions.map(s => ({
      id: s.id,
      goalId: s.goalId || '',
      sessionDate: new Date(s.sessionDate).getTime(),
      duration: s.duration,
      completed: s.completed
    }))

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching sessions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

