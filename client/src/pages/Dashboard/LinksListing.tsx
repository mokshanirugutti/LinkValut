import React, { useState } from "react"
import { LinkIcon } from "lucide-react"
import { useLinks } from "@/hooks/use-links"
import { CreateLinkForm } from "@/components/LinksHandlers/CreateLinkForm"
import { LinkCard } from "@/components/LinksHandlers/LinkCard"
import { LoadingSkeleton } from "@/components/LinksHandlers/LoadingSkeleton"
import { ErrorMessage } from "@/components/LinksHandlers/ErrorMessage"
import { Input, Button, Tag } from "antd"

const LinksListing: React.FC = () => {
  const {
    links, isLoading, error, createLink, deleteLink,
    refetch, filterLinks, searchTerm, clearError, clearFilter
  } = useLinks()
  const [input, setInput] = useState("")

  const handleSearch = () => {
    if (input.trim()) {
      filterLinks(input.trim())
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {error && <ErrorMessage message={error} onRetry={refetch} onDismiss={clearError} />}

        <div className="flex items-center justify-between relative">
          <h2 className="text-xl font-semibold flex items-center gap-2 animate-in slide-in-from-left-4 fade-in-0 duration-500 delay-300">
            <div className="w-1 h-6 rounded-full"></div>
            Your Links ({links.length})
          </h2>
          <CreateLinkForm onSubmit={createLink} />
        </div>

        {/* Filter/Search UI */}
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Filter by tag (e.g. 'react')"
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={handleSearch}
            style={{ maxWidth: 240 }}
          />
          <Button type="primary" onClick={handleSearch}>Filter</Button>
          {searchTerm && (
            <Tag closable onClose={clearFilter} color="blue">
              {searchTerm}
            </Tag>
          )}
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : links.length > 0 ? (
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {links.map((link, index) => (
                  <LinkCard key={link._id} link={link} onDelete={deleteLink} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 animate-in zoom-in-50 fade-in-0 duration-700 delay-500">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 border-dashed">
                <LinkIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white/70 mb-2">No links yet</h3>
                <p className="text-white/50">Start building your collection by adding your first link</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LinksListing