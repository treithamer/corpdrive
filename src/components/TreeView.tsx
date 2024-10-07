import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFile, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
}

interface TreeViewProps {
  data: FileNode
  onSelect: (folderId: string) => void
}

export const TreeView: React.FC<TreeViewProps> = ({ data, onSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']))

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(folderId)) {
        newSet.delete(folderId)
      } else {
        newSet.add(folderId)
      }
      return newSet
    })
  }

  const renderNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id)

    return (
      <div key={node.id} style={{ marginLeft: `${depth * 20}px` }}>
        <div
          className="flex items-center py-1 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id)
              onSelect(node.id)
            }
          }}
        >
          {node.type === 'folder' && (
            <FontAwesomeIcon
              icon={isExpanded ? faChevronDown : faChevronRight}
              className="mr-1 w-4"
            />
          )}
          <FontAwesomeIcon
            icon={node.type === 'folder' ? faFolder : faFile}
            className={`mr-2 ${node.type === 'folder' ? 'text-yellow-400' : 'text-blue-400'}`}
          />
          <span className="text-sm">{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && node.children?.map((child) => renderNode(child, depth + 1))}
      </div>
    )
  }

  return <div className="border rounded-md p-4">{renderNode(data)}</div>
}