import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { Plan_Price_Id, stripe } from '../../../lib/stripe'
import { getSessionData } from '@/lib/session/getSession'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

     const body = await request.json()  
    const { planId } = body
    const priseId = Plan_Price_Id[planId]

    const user = await getSessionData()
    const userEmail = user.email
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({

      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priseId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      mode: 'subscription',
      success_url: `${origin}/plan/success?session_id={CHECKOUT_SESSION_ID}`,
    });
     return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}