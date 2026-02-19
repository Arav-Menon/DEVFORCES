import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const navContent = [
    { name: "Problems", href: "/" },
    { name: "Contests", href: "/contest" },
    { name: "Help", href: "/help" },
  ];

  return (
    <>
      <nav className="border-zinc-800 sticky top-0 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="logo.png" className="w-50 h-18" alt="logo" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navContent.map((link, index) => {
              return (
                <Link key={index} href={link.href} className="text-white">
                  {link.name}
                </Link>
              );
            })}
            <Button
              // href={"/signin"}
              variant={"default"}
              className="bg-white text-zinc-950 hover:bg-zinc-200 transition-colors font-semibold px-6"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
