import { Button } from "@/components/ui/button";

export default function EntryLevelFeature() {
  return (
    <>
      <section className="border-b border-zinc-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16">
            Powerful Features for Every Level
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Comprehensive Problem Library
              </h3>
              <p className="text-zinc-400 mb-4 leading-relaxed">
                Access thousands of carefully curated coding problems spanning
                multiple domains including algorithms, data structures,
                databases, system design, and more. Each problem includes
                detailed explanations, multiple solutions, and test cases.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>
                    Problems ranging from Easy to Hard difficulty levels
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Support for 15+ programming languages</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Built-in code editor with syntax highlighting</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Instant test case validation</span>
                </li>
              </ul>
            </div>
            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
              <div className="space-y-3 font-mono text-sm">
                <div className="text-blue-400">
                  // Binary Tree Level Order Traversal
                </div>
                <div className="text-blue-400 mt-4">
                  function levelOrder(root) {"{"}
                </div>
                <div className="text-zinc-400 ml-4">if (!root) return [];</div>
                <div className="text-zinc-400 ml-4">const result = [];</div>
                <div className="text-zinc-400 ml-4">const queue = [root];</div>
                <div className="text-zinc-400 ml-4">// Process queue...</div>
                <div className="text-blue-400">{"}"}</div>
                <div className="text-green-400 mt-4">
                  ✓ All test cases passed
                </div>
                <div className="text-zinc-500 text-xs">
                  Runtime: 45ms | Memory: 32MB
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center md:grid-flow-dense">
            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800 md:order-2">
              <div className="space-y-4">
                <div className="h-12 bg-zinc-800 rounded flex items-center px-4 text-sm text-zinc-400">
                  <span className="text-blue-400">Leaderboard Position:</span>
                  <span className="ml-auto font-bold text-white">#1,234</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-zinc-200">
                      2,847
                    </div>
                    <div className="text-xs text-zinc-400 mt-2">
                      Problems Solved
                    </div>
                  </div>
                  <div className="bg-zinc-800 rounded p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500">87%</div>
                    <div className="text-xs text-zinc-400 mt-2">
                      Success Rate
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-800 rounded p-4">
                  <div className="text-xs text-zinc-400 mb-2">
                    Monthly Activity
                  </div>
                  <div className="flex gap-1 h-6">
                    <div className="flex-1 bg-blue-500/40 rounded"></div>
                    <div className="flex-1 bg-blue-500/60 rounded"></div>
                    <div className="flex-1 bg-blue-500 rounded"></div>
                    <div className="flex-1 bg-blue-500/70 rounded"></div>
                    <div className="flex-1 bg-blue-500/50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl font-bold mb-4">
                Advanced Analytics Dashboard
              </h3>
              <p className="text-zinc-400 mb-4 leading-relaxed">
                Track every aspect of your coding journey with real-time
                analytics. Visualize your progress, identify weak areas, and
                celebrate milestones.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Detailed performance metrics and statistics</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Category-wise problem breakdown</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Streak tracking and achievement badges</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Personalized study recommendations</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Competitive Contests</h3>
              <p className="text-zinc-400 mb-4 leading-relaxed">
                Join weekly and monthly contests to test your skills against
                thousands of developers worldwide. Compete in real-time, climb
                the rankings, and win prizes.
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Weekly contests with diverse problem sets</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Real-time leaderboards and standings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Replay mode to analyze top submissions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-zinc-200 font-bold">•</span>
                  <span>Prizes and recognition for top performers</span>
                </li>
              </ul>
            </div>
            <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
              <div className="space-y-4">
                <div className="pb-4 border-b border-zinc-800">
                  <div className="font-semibold mb-2">Upcoming Contest</div>
                  <div className="text-sm text-zinc-400">
                    DevForce Weekly #47
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Duration:</span>
                    <span className="text-zinc-7" >2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Problems:</span>
                    <span>5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Participants:</span>
                    <span className="text-zinc-300">8,432</span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-800">
                  <Button variant={"destructive"} className="w-full bg-white/90 text-black hover:bg-white/80">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
