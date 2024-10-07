import React from 'react'
import { useTranslation } from 'react-i18next'

const SpaceManagement: React.FC = () => {
  const { t } = useTranslation()

  // Mock data for space usage
  const totalSpace = 100 // GB
  const usedSpace = 65 // GB
  const freeSpace = totalSpace - usedSpace

  const usedPercentage = (usedSpace / totalSpace) * 100

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('spaceManagement')}</h2>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{t('spaceUsed')}</span>
          <span className="text-sm font-medium text-gray-700">{`${usedSpace}GB / ${totalSpace}GB`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${usedPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t('usedSpace')}</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{usedSpace}GB</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t('freeSpace')}</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{freeSpace}GB</p>
        </div>
      </div>
    </div>
  )
}

export default SpaceManagement