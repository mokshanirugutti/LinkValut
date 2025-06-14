import type React from "react"

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6
                   animate-pulse"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="space-y-4">
            <div className="h-6 bg-white/20 rounded-lg w-3/4"></div>
            <div className="h-4 bg-white/15 rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-white/15 rounded-full w-16"></div>
              <div className="h-6 bg-white/15 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
