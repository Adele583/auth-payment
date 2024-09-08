// src/components/PricingPlans.tsx
'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Plan {
  name: string;
  description: string;
  price: string;
  features: string[];
  planId: string | null;
}

interface PricingPlansProps {
  plans: Plan[];
}

export default function PricingPlans({ plans }: PricingPlansProps) {
  const handleCheckout = async (planId: string | null) => {
    if (!planId) {
      alert('This plan does not require payment.');
      return;
    }

    const stripe = await stripePromise;

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId }),
    });

    const { sessionId } = await res.json();

    const { error } = await stripe!.redirectToCheckout({
      sessionId,
    });

    if (error) {
      console.error('Stripe Checkout error', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch">
      {plans.map((plan) => (
        <Card key={plan.name} className="w-full lg:w-1/3 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-3xl font-bold mb-4">{plan.price}<span className="text-sm font-normal">/year</span></p>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => handleCheckout(plan.planId)}
            >
              {plan.name === "Free" ? "Get Started" : "Upgrade to " + plan.name}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
