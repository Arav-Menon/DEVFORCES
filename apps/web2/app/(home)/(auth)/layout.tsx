import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - DevForce",
  description: "Sign in or sign up to DevForce",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
