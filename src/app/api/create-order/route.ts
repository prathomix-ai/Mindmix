import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured in environment" },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { plan = "monthly", currency = "USD", receipt } = body;
    const isYearly = plan === "yearly";

    // ── Razorpay Subunit Amount Calculation ──────────────────────────────────
    // Razorpay requires amounts in lowest currency subunit (cents for USD, paise for INR)
    let amountInSubunits: number;

    if (body.amount !== undefined && body.amount !== null && !isNaN(Number(body.amount))) {
      // If frontend already sent the exact subunit amount
      amountInSubunits = Math.round(Number(body.amount));
    } else if (currency.toUpperCase() === "USD") {
      // USD Pricing:
      // Monthly: $5  -> 5 * 100 = 500 cents
      // Yearly:  $49 -> 49 * 100 = 4900 cents
      const priceDollars = isYearly ? 49 : 5;
      amountInSubunits = priceDollars * 100;
    } else if (currency.toUpperCase() === "INR") {
      // INR Fallback:
      // Monthly: $5  ≈ ₹420  -> 420 * 100 = 42000 paise
      // Yearly:  $49 ≈ ₹4100 -> 4100 * 100 = 410000 paise
      const priceInr = isYearly ? 4100 : 420;
      amountInSubunits = priceInr * 100;
    } else {
      const defaultDollars = isYearly ? 49 : 5;
      amountInSubunits = defaultDollars * 100;
    }

    // Minimum 100 subunits validation (Razorpay requirement)
    if (isNaN(amountInSubunits) || amountInSubunits < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 subunits (100 cents / 100 paise)" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const receiptId =
      receipt || `rcpt_${plan}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const options = {
      amount: amountInSubunits,
      currency: currency.toUpperCase(),
      receipt: receiptId,
      notes: {
        plan,
        base_price: isYearly ? 49 : 5,
        service: "PRATHOMIX MindMix Pro",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id,
    });
  } catch (error: any) {
    console.error("Razorpay Create Order Error:", error);

    // Specific currency unsupported warning
    if (error?.statusCode === 400 && error?.error?.description?.includes("currency")) {
      return NextResponse.json(
        {
          error: `${error.error.description}. Try fallback currency: 'INR'.`,
          code: "CURRENCY_NOT_SUPPORTED",
        },
        { status: 400 }
      );
    }

    if (error?.statusCode === 401 || error?.error?.code === "BAD_REQUEST_ERROR") {
      return NextResponse.json(
        { error: error?.error?.description || "Razorpay authentication or validation failure" },
        { status: error?.statusCode || 401 }
      );
    }

    return NextResponse.json(
      { error: error?.error?.description || error?.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
