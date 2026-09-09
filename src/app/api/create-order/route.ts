import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "USD", plan = "monthly" } = body;

    // Default prices if amount not sent
    // amount in dollars: $5 for monthly, $49 for yearly
    const finalAmountDollars = amount || (plan === "yearly" ? 49 : 5);
    // Razorpay accepts amount in lowest currency subunit (cents for USD, paise for INR)
    const amountInSubunits = Math.round(finalAmountDollars * 100);

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // If Razorpay keys are configured, create real order
    if (key_id && key_secret) {
      const razorpay = new Razorpay({
        key_id,
        key_secret,
      });

      const options = {
        amount: amountInSubunits,
        currency,
        receipt: `receipt_${plan}_${Date.now()}`,
        notes: {
          plan,
          service: "PRATHOMIX MindMix Pro",
        },
      };

      const order = await razorpay.orders.create(options);
      return NextResponse.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        key_id,
      });
    }

    // Fallback for development / mock when keys are not yet configured in .env.local
    const mockOrderId = `order_mock_${Date.now()}`;
    return NextResponse.json({
      id: mockOrderId,
      currency,
      amount: amountInSubunits,
      key_id: key_id || "rzp_test_placeholder",
      is_mock: true,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
