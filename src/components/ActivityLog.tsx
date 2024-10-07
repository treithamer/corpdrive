import React, { useState } from 'react'
import { Clock, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LogEntry {
  id: number
  user: string
  action: string
  file: string
  timestamp: string
}

const mockLogs: LogEntry[] = [
  { id: 1, user: 'john@example.com', action: 'uploaded', file: 'presentation.pptx', timestamp: '2023-05-10 14:30:00' },
  { id: 2, user: 'jane@example.com', action: 'deleted', file: 'old-report.pdf', timestamp: '2023-05-10 15:45:00' },
  { id: 3, user: 'bob@example.com', action: 'modified', file: 'budget.xlsx', timestamp: '2023-05-11 09:15:00' },
  { id: 4, user: 'alice@example.com', action: 'assigned', file: 'project-plan.docx', timestamp: '2023-05-11 11:30:00' },
]

const ActivityLog: React.FC = () => {
  const { t } = useTranslation()
  const [selectedUser, setSelectedUser] = useState<string>('all')

  const filteredLogs = selectedUser === 'all' 
    ? mockLogs 
    : mockLogs.filter(log => log.user === selectedUser)

  const uniqueUsers = Array.from(new Set(mockLogs.map(log => log.user)))

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{t('activityLog')}</h2>
      <div className="mb-4">
        <label htmlFor="user-filter" className="block text-sm font-medium text-gray-700 mb-1">
          {t('filterByUser')}
        </label>
        <select
          id="user-filter"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="all">{t('allUsers')}</option>
          {uniqueUsers.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div key={log.id} className="flex items-start bg-gray-50 p-3 rounded-md">
            <Clock className="mr-2 mt-1 text-gray-400 flex-shrink-0" size={16} />
            <div>
              <p className="text-sm text-gray-600">
                <User className="inline mr-1 text-gray-400" size={14} />
                <span className="font-medium text-gray-900">{log.user}</span> {t(log.action)} {log.file}
              </p>
              <p className="text-xs text-gray-500">{log.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityLog