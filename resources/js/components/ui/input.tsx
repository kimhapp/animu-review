import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full bg-[#2D2B55] border border-[#6C4AB6] text-white rounded px-3 py-2 text-sm placeholder:text-white/60 outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#6C4AB6] focus-visible:border-white",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Input }
