import React, { useState } from 'react'
import { User, Mail, Key, Fingerprint } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface UserData {
  email: string
  password: string
  role: 'user' | 'admin' | 'superadmin'
  fingerprint: string
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [newUser, setNewUser] = useState<UserData>({
    email: '',
    password: '',
    role: 'user',
    fingerprint: '',
  })
  const { t } = useTranslation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddUser = () => {
    setUsers((prev) => [...prev, { ...newUser, fingerprint: generateFingerprint() }])
    setNewUser({ email: '', password: '', role: 'user', fingerprint: '' })
  }

  const generateFingerprint = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('userManagement')}</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('email')}
          </label>
          <div className="flex items-center">
            <Mail className="mr-2 text-gray-400" size={20} />
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="user@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {t('password')}
          </label>
          <div className="flex items-center">
            <Key className="mr-2 text-gray-400" size={20} />
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            {t('role')}
          </label>
          <div className="flex items-center">
            <User className="mr-2 text-gray-400" size={20} />
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            >
              <option value="user">{t('user')}</option>
              <option value="admin">{t('admin')}</option>
              <option value="superadmin">{t('superadmin')}</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleAddUser}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t('addUser')}
        </button>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">{t('userList')}</h3>
        {users.map((user, index) => (
          <div key={index} className="border-t border-gray-200 py-2">
            <p className="text-sm">
              <Mail className="inline mr-1 text-gray-400" size={16} /> {user.email}
            </p>
            <p className="text-sm">
              <User className="inline mr-1 text-gray-400" size={16} /> {t(user.role)}
            </p>
            <p className="text-sm">
              <Fingerprint className="inline mr-1 text-gray-400" size={16} /> {user.fingerprint}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserManagement