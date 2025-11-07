import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const width = searchParams.get('width') || '400'
  const height = searchParams.get('height') || '400'
  
  // Redirect to a placeholder image service
  return NextResponse.redirect(`https://via.placeholder.com/${width}x${height}/00BFFF/FFFFFF?text=Chaos+%26+Comedy+Co.`)
}

export async function POST() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
}