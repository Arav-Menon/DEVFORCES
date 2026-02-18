import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <>
      <section className="border-b border-zinc-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Simple, Transparent Pricing
          </h2>
          <p className="text-zinc-400 text-center mb-16">
            Choose the plan that fits your needs. Always free to start.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border border-zinc-800 rounded-lg p-8 hover:border-zinc-700 transition">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>500+ problems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Basic analytics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Contest participation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-600">✗</span>
                  <span>Ad-free experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-600">✗</span>
                  <span>Premium solutions</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-zinc-600 text-zinc-950 hover:bg-white/90"
              >
                Get Started
              </Button>
            </div>

            {/* Pro Plan (Featured) */}
            <div className="border-2 border-zinc-400 rounded-lg p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black border-white border text-white px-4 py-1 rounded text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">$9</span>
                <span className="text-zinc-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>2000+ problems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Priority in contests</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Ad-free experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Premium solutions</span>
                </li>
              </ul>
              <Button className="w-full bg-black border-white border text-white hover:bg-blue-600">
                Start Free Trial
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-zinc-800 rounded-lg p-8 hover:border-zinc-700 transition">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8 text-sm text-zinc-400">
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Unlimited problems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Custom analytics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Team management</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>API access</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500">✓</span>
                  <span>Dedicated support</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="w-full border-zinc-600 text-zinc-950 hover:bg-zinc-900"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
