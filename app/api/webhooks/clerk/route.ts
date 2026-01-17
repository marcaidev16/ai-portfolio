import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Handle the webhook
    const eventType = evt.type;

    if (eventType === 'user.created') {
        // Welcome email or initial setup
        console.log(`User created: ${evt.data.id}`);
    }

    // Handle Billing Events
    // Note: Adjust these based on the actual plan IDs/names from your Clerk Billing setup
    if (eventType === 'subscription.created' || eventType === 'subscription.updated') {
        // @ts-ignore - Billing events might not be fully typed in current SDK version
        const subscription = evt.data;
        // @ts-ignore
        const userId = subscription.user_id;
        // @ts-ignore
        const status = subscription.status;

        // Check if there are active items and what plan they belong to
        // @ts-ignore
        const items = subscription.items || [];
        // @ts-ignore
        const activeItem = items.find(item => item.status === 'active');

        let planName = 'free';

        if (status === 'active' && activeItem) {
            // In a real scenario, you'd map price_ids or product_ids to plan names
            // For now, if there's an active billing subscription, we assume it's 'recruiter'
            // unless we can identify strictly it's the free plan (if free is also a subscription)
            planName = 'recruiter';
        }

        if (userId) {
            await (await clerkClient()).users.updateUserMetadata(userId, {
                publicMetadata: {
                    subscriptionPlan: planName
                }
            });
            console.log = {`Updated user ${userId} plan to ${planName}`);
        }
    }

    return new Response('', { status: 200 })
}
