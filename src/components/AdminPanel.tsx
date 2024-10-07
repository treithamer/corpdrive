import React, { useState } from 'react'
import { User, UserRole } from '../types'
import { useTranslation } from 'react-i18next'
import { Clock } from 'lucide-react'

interface AdminPanelProps {
  userRole: UserRole
}

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' },
]

const AdminPanel: React.FC<AdminPanelProps> = ({ userRole }) => {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [timeZone, setTimeZone] = useState('UTC')
  const [showTimeZoneModal, setShowTimeZoneModal] = useState(false)
  const { t } = useTranslation()

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  const handleTimeZoneChange = (newTimeZone: string) => {
    setTimeZone(newTimeZone)
    setShowTimeZoneModal(false)
    // Here you would typically update the server's time zone
    console.log('Updating server time zone to:', newTimeZone)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{t('adminPanel')}</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">{t('systemTimeZone')}</h3>
        <div className="flex items-center">
          <Clock className="mr-2" size={20} />
          <span className="mr-2">{t('currentTimeZone')}: {timeZone}</span>
          <button
            onClick={() => setShowTimeZoneModal(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t('change')}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('email')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('role')}</th>
              {userRole === 'superadmin' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t(user.role)}</td>
                {userRole === 'superadmin' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="user">{t('user')}</option>
                      <option value="admin">{t('admin')}</option>
                      <option value="superadmin">{t('superadmin')}</option>
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showTimeZoneModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setShowTimeZoneModal(false)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{t('changeTimeZone')}</h3>
              <div className="mt-2 px-7 py-3">
                <select
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={timeZone}
                  onChange={(e) => handleTimeZoneChange(e.target.value)}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                  {/* Add more time zones as needed */}
                </select>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setShowTimeZoneModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel