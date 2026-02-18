import { Code, Rocket, TrendingUp, Zap } from "lucide-react";

export default function Features() {
  return (
    <>
      <section className="border-b border-zinc-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Why DevForce?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Cards */}
            <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
              <Code className="w-8 h-8 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Real Coding Challenges
              </h3>
              <p className="text-sm text-zinc-400">
                Practice with thousands of problems ranging from beginner to
                expert level.
              </p>
            </div>

            <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
              <Zap className="w-8 h-8 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Live Contests</h3>
              <p className="text-sm text-zinc-400">
                Compete with developers worldwide in real-time programming
                contests.
              </p>
            </div>

            <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
              <TrendingUp className="w-8 h-8 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Performance Analytics
              </h3>
              <p className="text-sm text-zinc-400">
                Track your progress with detailed analytics and performance
                metrics.
              </p>
            </div>

            <div className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition">
              <Rocket className="w-8 h-8 text-zinc-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Judge System</h3>
              <p className="text-sm text-zinc-400">
                Get instant feedback with our high-performance code judging
                engine.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
