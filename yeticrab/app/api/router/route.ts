import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
    const body: {amount: number} = await request.json();
    const {amount = 1} = body;

    return NextResponse.json({data: amount});
}
