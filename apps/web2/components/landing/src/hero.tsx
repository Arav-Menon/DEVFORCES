import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <>
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">
              Train. Compete.
              <span className="block">Improve.</span>
            </h1>
            <p className="text-lg text-zinc-400">
              DevForce is a competitive coding platform designed for developers
              who want to sharpen their problem-solving skills through real-time
              challenges and contests.
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Button className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 px-8 h-12 text-base font-semibold transition-all shadow-xl shadow-white/10">
                Start Coding
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 px-8 h-12 text-base transition-all"
              >
                View Challenges
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-950 rounded-lg p-8 border border-zinc-800 leading-none flex items-center divide-x divide-gray-600">
              <div className="space-y-4 w-full">
                <div className="text-sm text-zinc-500 font-mono flex justify-between">
                  <span>$ devforce run challenge</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  </div>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-green-400">
                    &gt; Challenge loaded: make authentication system
                  </div>
                  <div className="text-green-400">&gt; Difficulty: Medium</div>
                  <div className="text-blue-400 mt-4">
                    const auth = () =&gt; {"{"}
                  </div>
                  <div className="text-zinc-400 ml-4">
                    // Your solution here
                  </div>
                  <div className="text-blue-400">{"}"}</div>
                  <div className="text-green-400 mt-4">
                    &gt; Ready to submit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
