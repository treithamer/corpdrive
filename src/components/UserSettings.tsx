import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFingerprint } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const UserSettings: React.FC = () => {
  const [fingerprint, setFingerprint] = useState<string>('')
  const { t } = useTranslation()

  useEffect(() => {
    const generateFingerprint = () => {
      const randomFingerprint = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      setFingerprint(randomFingerprint)
    }

    generateFingerprint()
  }, [])

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('userSettings')}</h2>
      <div className="mb-4">
        <Label htmlFor="user-fingerprint">{t('userFingerprint')}</Label>
        <div className="flex items-center mt-1">
          <Input
            type="text"
            id="user-fingerprint"
            value={fingerprint}
            readOnly
            className="flex-grow mr-2"
          />
          <Button variant="outline">
            <FontAwesomeIcon icon={faFingerprint} className="mr-2" />
            {t('regenerate')}
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {t('fingerprintDescription')}
        </p>
      </div>
      {/* Add more user settings here */}
    </div>
  )
}

export default UserSettings