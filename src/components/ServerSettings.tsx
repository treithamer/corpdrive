import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faHdd } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TreeView } from "@/components/TreeView"

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

const ServerSettings: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/home/user/files')
  const [newPath, setNewPath] = useState('')
  const [showTreeView, setShowTreeView] = useState(false)
  const { t } = useTranslation()

  const handlePathChange = () => {
    setCurrentPath(newPath)
    setNewPath('')
    setShowTreeView(false)
  }

  const handleFolderSelect = (folderId: string) => {
    // In a real app, you'd map the folder ID to its full path
    setNewPath(`/home/user/${folderId}`)
    setShowTreeView(false)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('serverSettings')}</h2>
      <div className="mb-4">
        <Label htmlFor="current-path">{t('currentFilePath')}</Label>
        <div className="flex items-center bg-gray-100 p-2 rounded mt-1">
          <FontAwesomeIcon icon={faHdd} className="mr-2 text-gray-500" />
          <span id="current-path">{currentPath}</span>
        </div>
      </div>
      <div className="mb-4">
        <Label htmlFor="new-path">{t('setNewPath')}</Label>
        <div className="flex items-center mt-1">
          <Input
            type="text"
            id="new-path"
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            className="flex-grow mr-2"
            placeholder="/path/to/new/folder"
          />
          <Button onClick={() => setShowTreeView(true)} className="mr-2">
            <FontAwesomeIcon icon={faFolder} className="mr-2" />
            {t('browse')}
          </Button>
          <Button onClick={handlePathChange}>
            {t('setPath')}
          </Button>
        </div>
      </div>
      {showTreeView && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">{t('selectFolder')}</h3>
          <TreeView
            data={mockFileSystem}
            onSelect={handleFolderSelect}
          />
        </div>
      )}
    </div>
  )
}

export default ServerSettings