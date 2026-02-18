import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Master
            <span className="block text-zinc-500">Competitive Coding?</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Join thousands of developers on their journey to becoming better
            engineers. Start coding today, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="rounded-full border-zinc-800 bg-white text-zinc-800 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 px-8 h-12 text-base transition-all">
              Start Free
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 px-8 h-12 text-base transition-all"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
