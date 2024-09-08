// src/app/page.tsx
import StyledButton from '@/components/StyledButton';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <StyledButton href="/signup">Get Started</StyledButton>
    </div>
  );
}