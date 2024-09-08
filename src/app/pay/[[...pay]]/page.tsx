// src/app/pay/page.tsx (Server Component)
import { auth } from '@clerk/nextjs/server'; // Keep server-side authentication
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import PricingPlans from '@/components/PricingPlans'; // Import the Client Component

const plans = [
  {
    name: "Basic",
    price: "$5",
    description: "Best for personal use",
    features: ["1 user", "5 projects", "2GB storage", "Basic support"],
    planId: 'price_1PwIwUFptKYCbgvragL3EVJt', // Replace with real Stripe Price ID
  },
  {
    name: "Pro",
    price: "$19",
    description: "Perfect for small teams",
    features: ["5 users", "20 projects", "20GB storage", "Priority support", "Advanced analytics"],
    planId: 'price_1PwIyTFptKYCbgvrORjnM7dQ', // Replace with real Stripe Price ID
  },
  {
    name: "Premium",
    price: "$49",
    description: "For large organizations",
    features: ["Unlimited users", "Unlimited projects", "100GB storage", "24/7 support", "Custom integrations", "AI-powered insights"],
    planId: 'price_1PwJ0dFptKYCbgvra8v3VnLt', // Replace with real Stripe Price ID
  },
];

export default async function PayPage() {
  const { userId } = auth(); // Server-side authentication

  if (!userId) {
    redirect('/signin'); // Redirect unauthenticated users to sign-in
  }

  return (
    <div className="relative container mx-auto p-4 mt-16">
      {/* User Profile Button */}
      <div className="absolute -top-10 right-4">
        <UserButton />
      </div>

      {/* Render PricingPlans as a Client Component */}
      <PricingPlans plans={plans} />
    </div>
  );
}
