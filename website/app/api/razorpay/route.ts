import Razorpay from 'razorpay'
import { NextRequest, NextResponse } from 'next/server'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'demo_secret',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, receipt, customerInfo, items } = await request.json()

    const options = {
      amount: amount * 100, // Amount in paisa (₹1 = 100 paisa)
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        customer_email: customerInfo?.email,
        customer_phone: customerInfo?.phone,
        items: JSON.stringify(items),
        upi_receiver: '9315112442@upi', // Your UPI ID where payments will be received
        brand: 'Chaos & Comedy Co.',
        test_mode: 'true'
      },
      payment_capture: 1, // Auto capture payment
    }

    const order = await razorpay.orders.create(options)
    
    return NextResponse.json({
      success: true,
      order_id: order.id,
      currency: order.currency,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo',
      receiver_upi: '9315112442@upi'
    })

  } catch (error: any) {
    console.error('Razorpay error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Payment order creation failed' 
      }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Razorpay Payment Gateway for Chaos & Comedy Co.',
    status: 'active',
    receiver_upi: '9315112442@upi',
    supported_methods: ['UPI', 'Cards', 'Net Banking', 'Wallets']
  })
}