export default function Stats() {
  return (
    <>
      <section className="border-b border-zinc-800 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white/95 mb-2">50K+</div>
              <p className="text-zinc-400">Problems Solved</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white/95 mb-2">25K+</div>
              <p className="text-zinc-400">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white/95 mb-2">500+</div>
              <p className="text-zinc-400">Contests Hosted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white/95 mb-2">1M+</div>
              <p className="text-zinc-400">Submissions Processed</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
