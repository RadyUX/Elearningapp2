import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("Webhook event constructed successfully.");
  } catch (error: any) {
    console.error("Webhook signature verification failed.", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  console.log("Webhook received: ", event.type);
  console.log("Session metadata: ", session.metadata);

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.error("Missing userId or courseId in session metadata.");
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }

    try {
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
      console.log(`Purchase created for user ${userId} and course ${courseId}.`);
    } catch (error: any) {
      console.error("Error creating purchase in the database:", error.message);
      return new NextResponse(`Database Error: ${error.message}`, { status: 500 });
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 });
  }

  return new NextResponse(null, { status: 200 });
}
