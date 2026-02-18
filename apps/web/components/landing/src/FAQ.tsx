import { Button } from "@/components/ui/button";
import { FAQAccordion } from "./faq-accordion";

export default function FAQ() {
  return (
    <>
      <section className="border-b border-zinc-800 py-20 px-6 bg-gradient-to-b from-black to-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-zinc-400 text-lg">
              Find answers to common questions about DevForce and how we can
              help you grow as a developer
            </p>
          </div>

          <FAQAccordion />
        </div>
      </section>
    </>
  );
}
