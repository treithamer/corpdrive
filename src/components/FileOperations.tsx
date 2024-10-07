import React, { useState } from 'react'
import { Folder, Trash2, Edit, Eye, UserPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const FileOperations: React.FC = () => {
  const [newFolderName, setNewFolderName] = useState('')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const { t } = useTranslation()

  const handleCreateFolder = () => {
    console.log('Creating folder:', newFolderName)
    setNewFolderName('')
  }

  const handleDeleteFile = () => {
    console.log('Deleting selected file')
  }

  const handleRenameFile = () => {
    console.log('Renaming selected file')
  }

  const handlePreviewFile = () => {
    console.log('Previewing selected file')
  }

  const handleAssignFile = () => {
    setShowAssignModal(true)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{t('fileOperations')}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="new-folder" className="block text-sm font-medium text-gray-700 mb-2">
            {t('createNewFolder')}
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="new-folder"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="flex-grow mr-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder={t('folderName')}
            />
            <button
              onClick={handleCreateFolder}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Folder className="mr-2" size={16} />
              {t('create')}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleDeleteFile}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="mr-2" size={16} />
            {t('delete')}
          </button>
          <button
            onClick={handleRenameFile}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Edit className="mr-2" size={16} />
            {t('rename')}
          </button>
          <button
            onClick={handlePreviewFile}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <Eye className="mr-2" size={16} />
            {t('preview')}
          </button>
          <button
            onClick={handleAssignFile}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <UserPlus className="mr-2" size={16} />
            {t('assign')}
          </button>
        </div>
      </div>
      {showAssignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowAssignModal(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{t('assignFile')}</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={t('enterUserEmail')}
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {t('assign')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileOperations