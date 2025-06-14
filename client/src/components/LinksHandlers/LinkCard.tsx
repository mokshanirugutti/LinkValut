import type React from "react"
import { useState } from "react"
import { ExternalLink, Trash2, Tag, Copy, Check,  AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Link } from "@/types"
import { toast, Toaster } from "react-hot-toast"

interface LinkCardProps {
  link: Link
  onDelete: (id: string) => Promise<boolean>
  index: number
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete, index }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(link._id)
    setIsDeleting(false)
    setShowDeleteModal(false)
    toast.success("Link deleted successfully")
  
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}
/>
      <div
        className={`
          group  bg-white/10 border  rounded-2xl p-6 z-0
          hover:bg-white/15 hover:border-black/40 hover:shadow-2xl
          transition-all duration-500 ease-out transform hover:scale-[1.02]
          animate-in slide-in-from-bottom-4 fade-in-0 w-[20rem] border-2 border-black/20 mx-auto 
        `}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0 w-full ">
            <h3 className="text-lg font-bold  mb-2 truncate  transition-colors">
              {link.title}
            </h3>

            <div className="flex   w-fit items-center gap-2 mb-3">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" text-sm truncate flex-1
                         transition-colors duration-200 hover:underline"
              >
                {link.url}
              </a>
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 " /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {link.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 w-full min-w-0">
                {link.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full
                             bg-gradient-to-r from-emerald-500/20 to-teal-500/20
                             border border-white/20  text-xs
                             hover:from-emerald-500/30 hover:to-teal-500/30
                             transition-all duration-200"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-white/20  hover:bg-white/10 hover:border-white/30"
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              disabled={isDeleting}
              className="border-red-400/20 text-red-500 hover:bg-red-500 hover:border-red-400/30
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-red-500/20">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Link</h3>
            </div>
            
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete this link?
            </p>
            
            <div className="bg-gray-100 rounded-lg p-3 mb-6">
              <p className="font-medium text-gray-900 text-sm truncate mb-1">
                {link.title}
              </p>
              <p className="text-gray-600 text-xs truncate">
                {link.url}
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}