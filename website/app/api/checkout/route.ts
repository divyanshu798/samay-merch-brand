import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_demo', {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo } = await request.json()

    // Create Checkout Sessions from body params for ₹1 test transactions
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Chaos & Comedy Co. Pre-order',
              description: 'Test pre-order for Samay\'s merchandise collection',
              images: ['https://sharkshirts.in/wp-content/uploads/2022/10/Samay-Raina-T-Shirt1.jpg'],
            },
            unit_amount: 100, // ₹1 in paisa
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
      customer_email: customerInfo?.email,
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(items),
        test_mode: 'true',
        customer_info: JSON.stringify(customerInfo),
      },
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // Expires in 30 minutes
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err: any) {
    console.error('Stripe error:', err)
    return NextResponse.json(
      { 
        error: err.message || 'Payment processing failed',
        type: err.type || 'api_error'
      }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Chaos & Comedy Co. Payment Gateway',
    status: 'active',
    test_mode: true 
  })
}