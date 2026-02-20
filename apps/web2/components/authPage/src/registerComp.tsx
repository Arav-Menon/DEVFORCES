"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SocialLogin } from "@/components/social-login";
import { Eye, EyeOff, Check, X } from "lucide-react";
import { register } from "@/utils";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const passwordStrength = {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password),
  };

  const isPasswordStrong =
    Object.values(passwordStrength).filter(Boolean).length >= 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !username) {
      setError("Please fill in all fields");
      return;
    }

    if (!isPasswordStrong) {
      setError("Password is not strong enough");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);

    const token = await register(username, email, password);
    console.log(token);
    localStorage.setItem("token", token);
    router.push("/dashboard");
    setIsLoading(false);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="space-y-2 text-center">
        <Link href="/" className="inline-block mb-4">
          <img src={"logo.png"} alt="devforce_logo" className="h-18"></img>
        </Link>
        <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
        <p className="text-zinc-400 text-sm">
          Join thousands of developers improving their coding skills
        </p>
      </div>

      {/* Social Login */}
      <SocialLogin />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-white text-sm font-medium">
            Username
          </Label>
          <Input
            id="username"
            type="username"
            placeholder="jhon doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 h-10"
          />
        </div>

        {/*start changing from here*/}

        <div className="space-y-2">
          <Label htmlFor="Email" className="text-white text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Input
              id="Email"
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:ring-blue-500/20 h-10 pr-10 transition`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
            ></button>
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="Email" className="text-white text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="text"
              placeholder="********"
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

          {/* Password Strength Indicator */}
          {password && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                {passwordStrength.hasMinLength ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-zinc-500" />
                )}
                <span
                  className={
                    passwordStrength.hasMinLength
                      ? "text-green-500"
                      : "text-zinc-500"
                  }
                >
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {passwordStrength.hasUppercase ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-zinc-500" />
                )}
                <span
                  className={
                    passwordStrength.hasUppercase
                      ? "text-green-500"
                      : "text-zinc-500"
                  }
                >
                  One uppercase letter
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {passwordStrength.hasNumber ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-zinc-500" />
                )}
                <span
                  className={
                    passwordStrength.hasNumber
                      ? "text-green-500"
                      : "text-zinc-500"
                  }
                >
                  One number
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {passwordStrength.hasSpecial ? (
                  <Check className="w-3 h-3 text-green-500" />
                ) : (
                  <X className="w-3 h-3 text-zinc-500" />
                )}
                <span
                  className={
                    passwordStrength.hasSpecial
                      ? "text-green-500"
                      : "text-zinc-500"
                  }
                >
                  One special character (!@#$%^&*)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
            className="border-zinc-600 bg-zinc-900 mt-1"
          />
          <Label
            htmlFor="terms"
            className="text-zinc-400 text-xs font-normal cursor-pointer leading-relaxed"
          >
            I agree to the{" "}
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
          disabled={isLoading || !isPasswordStrong}
          className="w-full bg-white/90 hover:bg-white/80 text-zinc-800 h-10 font-semibold transition disabled:opacity-50"
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-blue-400 hover:text-blue-300 font-semibold transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
