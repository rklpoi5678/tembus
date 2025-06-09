// /app/api/clerk-webhook/route.ts (예시)
// 이 파일은 Clerk Dashboard에서 웹훅 URL로 등록해야 합니다.
import { clerkClient, WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET; // .env.local에 저장

export async function POST(req: Request) {
  if (!webhookSecret) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set');
  }

  const payloadString = await req.text();
  const svixHeaders = {
    'svix-id': req.headers.get('svix-id')!,
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    'svix-signature': req.headers.get('svix-signature')!,
  };

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return new NextResponse('Error occurred', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const userId = evt.data.id;
    // Clerk Backend SDK를 사용하여 사용자 publicMetadata 업데이트
    // 이 부분은 여러분의 서버 사이드 환경에 맞게 조정해야 합니다.
    // 예: import { clerkClient } from '@clerk/nextjs/server'; (Next.js App Router API Route)
    // 또는 다른 백엔드 프레임워크의 Clerk SDK
    console.log(`User created: ${userId}. Assigning default role.`);
    try {
        // 실제 구현에서는 여기에 clerkClient를 사용하여 user.publicMetadata를 업데이트하는 로직을 추가
        const client = await clerkClient();
        await client.users.updateUser(userId, {
          publicMetadata: {
            role: 'seller', // 기본 역할 할당
          },
        });
        console.log(`Assigned default role to user ${userId}`);
    } catch (updateError) {
        console.error(`Failed to update publicMetadata for user ${userId}:`, updateError);
    }
  }

  return new NextResponse('Webhook received', { status: 200 });
}