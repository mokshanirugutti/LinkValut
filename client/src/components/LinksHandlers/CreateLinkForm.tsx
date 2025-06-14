import type React from "react"
import { useState } from "react"
import { Plus, LinkIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock"
import { toast, Toaster } from "react-hot-toast"

interface CreateLinkFormProps {
    onSubmit: (data: { title: string; url: string; tags: string[] }) => Promise<boolean>
    isLoading?: boolean
}

export const CreateLinkForm: React.FC<CreateLinkFormProps> = ({ onSubmit, isLoading }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    useBodyScrollLock(isExpanded)
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        tags: [] as string[],
        currentTag: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        toast.loading("Saving link...")
        const success = await onSubmit({
            title: formData.title,
            url: formData.url,
            tags: formData.tags,
        })
        toast.dismiss()
        if (success) {
            setFormData({ title: "", url: "", tags: [], currentTag: "" })
            setIsExpanded(false)
            toast.success("Link Saved successfully")
        }
    }

    const addTag = () => {
        if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, prev.currentTag.trim()],
                currentTag: "",
            }))
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }
    }

    return (

        <div className="relative">
            <Toaster
  position="top-right"
  reverseOrder={false}
/>

            {!isExpanded && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center justify-center gap-3 p-4 rounded-xl
                     bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                     hover:from-blue-500/30 hover:to-purple-500/30
                     border transition-all duration-300
                     group hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-medium">Add New Link</span>
                </button>
            )}

            {isExpanded && (
                <>
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setIsExpanded(false)}
                />
         
            <form
                onSubmit={handleSubmit}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                 w-96 space-y-6 p-5 backdrop-blur-xl border rounded-2xl bg-white/90 
                 border-2 border-black/20 z-50
                 animate-in zoom-in-50 fade-in-0 duration-300"
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <LinkIcon className="w-5 h-5" />
                        Create Link
                    </h3>
                    <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="p-2 rounded-lg transition-colors duration-200"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="formLabel">
                            Title
                        </label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            className="transition-all duration-200"
                            placeholder="Enter link title..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="url" className="formLabel">
                            URL
                        </label>
                        <Input
                            id="url"
                            type="url"
                            value={formData.url}
                            onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                            className="transition-all duration-200"
                            placeholder="https://example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="tags" className="formLabel">
                            Tags
                        </label>
                        <div className="flex gap-2">
                            <Input
                                value={formData.currentTag}
                                onChange={(e) => setFormData((prev) => ({ ...prev, currentTag: e.target.value }))}
                                onKeyPress={handleKeyPress}
                                className="transition-all duration-200"
                                placeholder="Add a tag..."
                            />
                            <Button
                                type="button"
                                onClick={addTag}
                                variant="outline"
                                size="sm"
                            >
                                Add
                            </Button>
                        </div>

                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                             bg-gradient-to-r from-blue-500/30 to-purple-500/30
                             border border-white/20 text-sm
                             animate-in slide-in-from-bottom-2 duration-300"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 
                     hover:from-blue-600 hover:to-purple-600
                     text-white font-medium py-3 rounded-xl
                     transition-all duration-300 transform
                     hover:scale-[1.02] active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Creating...
                        </div>
                    ) : (
                        "Create Link"
                    )}
                </Button>
            </form>
        </>
    )
}

        </div >
        
    )
    }
