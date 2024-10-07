import React, { useState, useEffect } from 'react'
import { Fingerprint } from 'lucide-react'

const UserFingerprint: React.FC = () => {
  const [fingerprint, setFingerprint] = useState<string>('')

  useEffect(() => {
    // Simulate generating a user fingerprint
    const generateFingerprint = () => {
      const randomFingerprint = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      setFingerprint(randomFingerprint)
    }

    generateFingerprint()
  }, [])

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User Fingerprint</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <Fingerprint className="h-16 w-16 text-blue-600" />
        </div>
        <p className="text-center text-sm text-gray-600 mb-4">
          Your unique user fingerprint is used to identify and secure your account.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-center font-mono text-sm break-all">{fingerprint}</p>
        </div>
        <p className="mt-4 text-xs text-gray-500 text-center">
          This fingerprint is based on your device and browser characteristics.
          It helps us detect unauthorized access to your account.
        </p>
      </div>
    </div>
  )
}

export default UserFingerprint