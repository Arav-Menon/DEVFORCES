"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onCancel();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-zinc-400 mt-1">{description}</p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={loading}
            className="text-zinc-400 hover:text-white"
          >
            {cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={
              variant === "danger"
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-white text-black hover:bg-zinc-200"
            }
          >
            {loading ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
