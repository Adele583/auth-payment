// src/app/pay/page.tsx (Server Component)
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import PricingPlans from '@/components/PricingPlans';

const plans = [
  {
    name: "Basic",
    price: "$5",
    description: "Best for personal use",
    features: ["1 user", "5 projects", "2GB storage", "Basic support"],
    planId: 'price_1PwIwUFptKYCbgvragL3EVJt',
  },
  {
    name: "Pro",
    price: "$19",
    description: "Perfect for small teams",
    features: ["5 users", "20 projects", "20GB storage", "Priority support", "Advanced analytics"],
    planId: 'price_1PwIyTFptKYCbgvrORjnM7dQ',
  },
  {
    name: "Premium",
    price: "$49",
    description: "For large organizations",
    features: ["Unlimited users", "Unlimited projects", "100GB storage", "24/7 support", "Custom integrations", "AI-powered insights"],
    planId: 'price_1PwJ0dFptKYCbgvra8v3VnLt',
  },
];

export default async function PayPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/signin');
  }

  return (
    <div className="relative container mx-auto p-4 mt-16">
      <div className="absolute -top-10 right-4">
        <UserButton />
      </div>

      <PricingPlans plans={plans} />
    </div>
  );
}
