import React from 'react'
import { LinkIcon } from 'lucide-react'
const Footer: React.FC = () => {
  return (
    <div className="pagePadding">
        <div className="flex justify-between items-center py-14">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-6 h-6" />
            <p>LinkVault</p>
          </div>
          <div className="flex items-center">
            <p>Copyright 2025 LinkVault</p>
          </div>
        </div>
    </div>
  )
}

export default Footer