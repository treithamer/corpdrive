import React, { useState } from 'react'
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
}

const mockFileSystem: FileNode = {
  id: 'root',
  name: 'Root',
  type: 'folder',
  children: [
    {
      id: 'folder1',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 'file1', name: 'Report.pdf', type: 'file' },
        { id: 'file2', name: 'Presentation.pptx', type: 'file' },
      ],
    },
    {
      id: 'folder2',
      name: 'Images',
      type: 'folder',
      children: [
        { id: 'file3', name: 'Logo.png', type: 'file' },
        { id: 'file4', name: 'Banner.jpg', type: 'file' },
      ],
    },
    { id: 'file5', name: 'Notes.txt', type: 'file' },
  ],
}

const FileExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']))
  const { t } = useTranslation()

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

  const renderFileTree = (node: FileNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id)

    return (
      <div key={node.id} style={{ marginLeft: `${depth * 20}px` }}>
        <div
          className="flex items-center py-1 cursor-pointer hover:bg-gray-100"
          onClick={() => node.type === 'folder' && toggleFolder(node.id)}
        >
          {node.type === 'folder' && (
            isExpanded ? <ChevronDown className="mr-1" size={16} /> : <ChevronRight className="mr-1" size={16} />
          )}
          {node.type === 'folder' ? (
            <Folder className="mr-2 text-yellow-400" size={16} />
          ) : (
            <File className="mr-2 text-blue-400" size={16} />
          )}
          <span className="text-sm">{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && node.children?.map((child) => renderFileTree(child, depth + 1))}
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('fileExplorer')}</h2>
      <div className="border rounded-md p-4">
        {renderFileTree(mockFileSystem)}
      </div>
    </div>
  )
}

export default FileExplorer