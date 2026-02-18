export default function Working() {
  return (
    <>
      <section className="border-b border-zinc-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center text-black font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Pick a Challenge</h3>
              <p className="text-zinc-400">
                Browse our comprehensive library of coding problems with
                detailed problem statements and examples.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center text-black font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">Submit Solution</h3>
              <p className="text-zinc-400">
                Write your solution and submit it to our fast judge system. Get
                instant feedback on correctness and performance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center text-black font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Track Performance</h3>
              <p className="text-zinc-400">
                Monitor your progress with analytics, ratings, and achievements
                as you climb the leaderboards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
