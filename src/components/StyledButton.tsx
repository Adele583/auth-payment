// src/components/StyledButton.tsx
import Link from 'next/link';

const StyledButton: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <Link href={href} className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
      {children}
    </Link>
  );
};

export default StyledButton;