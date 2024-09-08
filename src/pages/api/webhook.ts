// src/pages/api/webhook.ts
import { buffer } from 'micro';
import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let event: Stripe.Event;

    try {
      const buf = await buffer(req);
      const sig = req.headers['stripe-signature'];

      if (typeof sig !== 'string') {
        throw new Error('Invalid stripe-signature header');
      }

      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          await handleSuccessfulCheckout(session);
          break;
        case 'invoice.payment_failed':
          const invoice = event.data.object as Stripe.Invoice;
          await handleFailedPayment(invoice);
          break;
        // Add more cases as needed
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).json({ received: true });
    } catch (err: unknown) {
      console.error(`Error processing webhook:`, err instanceof Error ? err.message : String(err));
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
  console.log('Payment succeeded:', session);
  // Implement your logic to update user's subscription in your database
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  console.log('Payment failed:', invoice);
  // Implement your logic to notify the user about the failed payment
}