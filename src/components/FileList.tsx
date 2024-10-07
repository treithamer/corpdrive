import React, { useState } from 'react'
import { File, Folder, Download, Trash2, Share2, Users } from 'lucide-react'
import { File as FileType, UserRole, Permission } from '../types'
import { useTranslation } from 'react-i18next'

const mockFiles: FileType[] = [
  { id: 1, name: 'Project Proposal.docx', type: 'file', size: '2.5 MB', permissions: 'editor' },
  { id: 2, name: 'Marketing Assets', type: 'folder', size: '-- MB', permissions: 'admin' },
  { id: 3, name: 'Q3 Report.pdf', type: 'file', size: '5.1 MB', permissions: 'viewer' },
  { id: 4, name: 'Team Photos', type: 'folder', size: '-- MB', permissions: 'editor' },
]

interface FileListProps {
  userRole: UserRole
}

const FileList: React.FC<FileListProps> = ({ userRole }) => {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const { t } = useTranslation()

  const handleShare = (file: FileType) => {
    const shareLink = `https://corporate-drive.com/share/${file.id}`
    // In a real app, you'd generate this link on the server
    alert(t('shareLinkGenerated', { link: shareLink }))
  }

  const handlePermissions = (file: FileType) => {
    setSelectedFile(file)
    // In a real app, you'd open a modal or navigate to a permissions management page
    alert(t('managePermissions', { fileName: file.name }))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('yourFiles')}</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('size')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('permissions')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockFiles.map((file) => (
              <tr key={file.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {file.type === 'folder' ? <Folder className="mr-2 text-yellow-400" /> : <File className="mr-2 text-blue-400" />}
                    <span className="text-sm font-medium text-gray-900">{file.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{file.size}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{t(file.permissions)}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4" title={t('download')}>
                    <Download size={18} />
                  </button>
                  {(userRole === 'admin' || userRole === 'superadmin' || file.permissions === 'admin') && (
                    <button className="text-red-600 hover:text-red-900 mr-4" title={t('delete')}>
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button className="text-green-600 hover:text-green-900 mr-4" onClick={() => handleShare(file)} title={t('share')}>
                    <Share2 size={18} />
                  </button>
                  {(userRole === 'admin' || userRole === 'superadmin') && (
                    <button className="text-purple-600 hover:text-purple-900" onClick={() => handlePermissions(file)} title={t('managePermissions')}>
                      <Users size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FileList