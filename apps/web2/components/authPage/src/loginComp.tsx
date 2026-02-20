"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SocialLogin } from "@/components/social-login";
import { Eye, EyeOff } from "lucide-react";
import { signin } from "@/utils";
import { useRouter } from "next/navigation";
import Loader from "@/app/loader";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  console.log(email, password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setIsLoading(true);
    const token = await signin(email, password);
    console.log(token);
    localStorage.setItem("token", `Bearer ${token}`);
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="space-y-2 text-center">
        <Link href="/" className="inline-block mb-4">
          <img src="logo.png" className="h-18" alt="" />
        </Link>
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-zinc-400 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-sm font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 h-10"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-white text-sm font-medium"
            >
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-zinc-400 hover:text-blue-300 transition"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 h-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-zinc-600 bg-zinc-900"
          />
          <Label
            htmlFor="remember"
            className="text-zinc-400 text-sm font-normal cursor-pointer"
          >
            Remember me for 30 days
          </Label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white/90 hover:bg-white/80 text-black hover:text-black h-10 font-semibold transition disabled:opacity-50"
        >
          {isLoading ? <Loader /> : "Sign In"}
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-zinc-200 underline hover:text-blue-400 font-semibold transition"
        >
          Sign up for free
        </Link>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-800 pt-6 text-center">
        <p className="text-xs text-zinc-500">
          By signing in, you agree to our{" "}
          <Link
            href="#"
            className="text-blue-400 hover:text-blue-300 underline transition"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-blue-400 hover:text-blue-300 underline transition"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
