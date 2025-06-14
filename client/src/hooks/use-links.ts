import { useState, useEffect, useCallback } from "react"
import { GetLinks, CreateLink, DeleteLink } from "@/api"
import type { Link } from "@/types"

interface CreateLinkData {
  title: string
  url: string
  tags: string[]
}

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const fetchLinks = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await GetLinks()
      setLinks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch links")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // New: fetch with filter
  const filterLinks = useCallback(async (tag: string) => {
    try {
      setIsLoading(true)
      setError(null)
      setSearchTerm(tag)
      const data = await GetLinks(tag)
      setLinks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to filter links")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createLink = useCallback(
    async (linkData: CreateLinkData) => {
      try {
        await CreateLink(linkData)
        // If a filter is active, refetch with filter
        if (searchTerm) {
          await filterLinks(searchTerm)
        } else {
          await fetchLinks()
        }
        return true
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create link")
        return false
      }
    },
    [fetchLinks, filterLinks, searchTerm],
  )

  const deleteLink = useCallback(async (id: string) => {
    try {
      await DeleteLink(id)
      setLinks((prev) => prev.filter((link) => link._id !== id))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete link")
      return false
    }
  }, [])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  return {
    links,
    isLoading,
    error,
    createLink,
    deleteLink,
    refetch: fetchLinks,
    filterLinks,
    searchTerm,
    setSearchTerm,
    clearError: () => setError(null),
    clearFilter: () => {
      setSearchTerm("")
      fetchLinks()
    }
  }
}