import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-zinc-800 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img src="logo.png" alt="devforce_logo" />
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  Master competitive coding and level up your engineering
                  skills.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full border border-zinc-700 hover:border-blue-500 flex items-center justify-center text-zinc-400 hover:text-blue-400 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full border border-zinc-700 hover:border-blue-500 flex items-center justify-center text-zinc-400 hover:text-blue-400 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 rounded-full border border-zinc-700 hover:border-blue-500 flex items-center justify-center text-zinc-400 hover:text-blue-400 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.541 3.845c-3.619 0-5.921 2.485-5.921 7.284 0 4.716 2.302 7.284 5.921 7.284 3.618 0 5.921-2.568 5.921-7.284 0-4.799-2.303-7.284-5.921-7.284zm0 1.566c2.459 0 3.924 1.822 3.924 5.718 0 3.896-1.465 5.718-3.924 5.718-2.458 0-3.924-1.822-3.924-5.718 0-3.896 1.466-5.718 3.924-5.718zm-8.891 2.136H2v10.348h2.65v-10.348zm1.325-4.232c-.92 0-1.658.738-1.658 1.658s.738 1.658 1.658 1.658 1.658-.738 1.658-1.658-.738-1.658-1.658-1.658zm11.315 0c-.92 0-1.658.738-1.658 1.658s.738 1.658 1.658 1.658 1.658-.738 1.658-1.658-.738-1.658-1.658-1.658z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div className="animate-fade-in-up delay-100">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Problems
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Contests
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Discuss
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Premium
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="animate-fade-in-up delay-200">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Links */}
            <div className="animate-fade-in-up delay-300">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                Community
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="animate-fade-in-up delay-400">
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-blue-400 transition text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-zinc-800 pt-12 mb-12">
            <div className="max-w-md">
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-zinc-400 text-sm mb-4">
                Get the latest problems, contests, and tips delivered to your
                inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition text-sm"
                />
                <Button className="px-4 py-2 rounded-lg bg-white text-zinc-950 hover:bg-blue-600 transition font-semibold text-sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-zinc-500 text-sm">
              &copy; 2026 DevForce. All rights reserved. Built with passion for
              developers.
            </p>
            <div className="flex gap-6 mt-6 md:mt-0">
              <Link
                href="#"
                className="text-zinc-500 hover:text-blue-400 transition text-sm"
              >
                Status
              </Link>
              <Link
                href="#"
                className="text-zinc-500 hover:text-blue-400 transition text-sm"
              >
                API
              </Link>
              <Link
                href="#"
                className="text-zinc-500 hover:text-blue-400 transition text-sm"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
