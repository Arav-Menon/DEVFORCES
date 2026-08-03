import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type LucideIcon, Plus } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-zinc-900/50 rounded-2xl mb-6">
        <Icon className="w-10 h-10 text-zinc-600" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-300 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>
      {action && (
        <Link href={action.href}>
          <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  );
}
