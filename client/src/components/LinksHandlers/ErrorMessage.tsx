

import type React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, onDismiss }) => {
  return (
    <div
      className="backdrop-blur-xl bg-red-500/10 border border-red-400/20 rounded-2xl p-6
                  animate-in slide-in-from-top-4 fade-in-0 duration-500"
    >
      <div className="flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-red-200 font-medium mb-1">Something went wrong</h3>
          <p className="text-red-300/80 text-sm mb-4">{message}</p>
          <div className="flex gap-2">
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="border-red-400/20 text-red-300 hover:bg-red-500/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            )}
            {onDismiss && (
              <Button onClick={onDismiss} variant="ghost" size="sm" className="text-red-300/70 hover:text-red-300">
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
