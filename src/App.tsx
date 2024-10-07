import React, { useState } from 'react'
import { HardDrive, Upload, User, LogOut, Settings, Users, Globe, FileText, Activity } from 'lucide-react'
import FileList from './components/FileList'
import FileUpload from './components/FileUpload'
import UserFingerprint from './components/UserFingerprint'
import AdminPanel from './components/AdminPanel'
import LanguageSelector from './components/LanguageSelector'
import ServerSettings from './components/ServerSettings'
import FileExplorer from './components/FileExplorer'
import SpaceManagement from './components/SpaceManagement'
import FileOperations from './components/FileOperations'
import ActivityLog from './components/ActivityLog'
import UserManagement from './components/UserManagement'
import { UserRole } from './types'
import { useTranslation } from 'react-i18next'

function App() {
  const [activeTab, setActiveTab] = useState('files')
  const [userRole, setUserRole] = useState<UserRole>('admin') // For demo purposes
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center">
            <HardDrive className="mr-2" /> {t('corporateDrive')}
          </h1>
        </div>
        <nav className="mt-8">
          <button
            className={`w-full text-left p-4 flex items-center ${
              activeTab === 'files' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('files')}
          >
            <HardDrive className="mr-2" /> {t('files')}
          </button>
          <button
            className={`w-full text-left p-4 flex items-center ${
              activeTab === 'upload' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload className="mr-2" /> {t('upload')}
          </button>
          <button
            className={`w-full text-left p-4 flex items-center ${
              activeTab === 'explorer' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('explorer')}
          >
            <FileText className="mr-2" /> {t('fileExplorer')}
          </button>
          <button
            className={`w-full text-left p-4 flex items-center ${
              activeTab === 'operations' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('operations')}
          >
            <Settings className="mr-2" /> {t('fileOperations')}
          </button>
          <button
            className={`w-full text-left p-4 flex items-center ${
              activeTab === 'fingerprint' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('fingerprint')}
          >
            <User className="mr-2" /> {t('userFingerprint')}
          </button>
          {(userRole === 'admin' || userRole === 'superadmin') && (
            <>
              <button
                className={`w-full text-left p-4 flex items-center ${
                  activeTab === 'admin' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('admin')}
              >
                <Users className="mr-2" /> {t('adminPanel')}
              </button>
              <button
                className={`w-full text-left p-4 flex items-center ${
                  activeTab === 'server' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('server')}
              >
                <Settings className="mr-2" /> {t('serverSettings')}
              </button>
              <button
                className={`w-full text-left p-4 flex items-center ${
                  activeTab === 'activity' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('activity')}
              >
                <Activity className="mr-2" /> {t('activityLog')}
              </button>
            </>
          )}
        </nav>
        <div className="absolute bottom-16 w-64 p-4">
          <LanguageSelector />
        </div>
        <div className="absolute bottom-0 w-64 p-4">
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded flex items-center justify-center">
            <LogOut className="mr-2" /> {t('logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'files' && <FileList userRole={userRole} />}
        {activeTab === 'upload' && <FileUpload />}
        {activeTab === 'explorer' && <FileExplorer />}
        {activeTab === 'operations' && <FileOperations />}
        {activeTab === 'fingerprint' && <UserFingerprint />}
        {activeTab === 'admin' && <AdminPanel userRole={userRole} />}
        {activeTab === 'server' && <ServerSettings />}
        {activeTab === 'activity' && <ActivityLog />}
        <div className="mt-8">
          <SpaceManagement />
        </div>
        {(userRole === 'admin' || userRole === 'superadmin') && (
          <div className="mt-8">
            <UserManagement />
          </div>
        )}
      </div>
    </div>
  )
}

export default App