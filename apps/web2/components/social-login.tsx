"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function SocialLogin() {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-zinc-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="border-zinc-700 bg-white/90 hover:bg-white/80 text-black w-full"
        >
          <img
            src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
            alt="google_icon"
            className="h-4 w-4 "
          />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="border-zinc-700 bg-white/90 hover:bg-white/80 text-black w-full"
        >
          <img src="github-svgrepo-com.svg" className="h-4 w-4" alt="" />
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
}
