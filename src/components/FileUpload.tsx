import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faPause, faPlay, faCompress, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Toast } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSpeed, setUploadSpeed] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [internetSpeed, setInternetSpeed] = useState(0)
  const { t } = useTranslation()
  const { toast } = useToast()
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0]
      if (selectedFile.size <= 2 * 1024 * 1024 * 1024) { // 2GB in bytes
        setFile(selectedFile)
      } else {
        toast({
          title: t('error'),
          description: t('fileSizeExceeded'),
          variant: "destructive",
        })
      }
    }
  }

  const handleUpload = () => {
    if (file) {
      // Simulating upload process
      let progress = 0
      const interval = setInterval(() => {
        if (!isPaused) {
          progress += 5
          setUploadProgress(progress)
          setUploadSpeed(Math.random() * 1024) // Simulated upload speed in KB/s
          if (progress >= 100) {
            clearInterval(interval)
            toast({
              title: t('success'),
              description: t('fileUploaded'),
            })
          }
        }
      }, 500)
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const handleCompress = () => {
    toast({
      title: t('compressing'),
      description: t('compressingDescription'),
    })
    // Implement compression logic here
  }

  const testInternetSpeed = () => {
    // This is a mock implementation. In a real app, you'd use an actual speed testing service.
    toast({
      title: t('testingSpeed'),
      description: t('testingSpeedDescription'),
    })
    setTimeout(() => {
      const mockSpeed = Math.random() * 100
      setInternetSpeed(mockSpeed)
      toast({
        title: t('speedTestComplete'),
        description: t('speedTestResult', { speed: mockSpeed.toFixed(2) }),
      })
    }, 3000)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{t('uploadFile')}</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <Label htmlFor="file-upload">{t('chooseFile')}</Label>
          <Input
            ref={uploadRef}
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="mt-1"
          />
        </div>
        {file && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">{t('selectedFile', { fileName: file.name })}</p>
            <Progress value={uploadProgress} className="mt-2" />
            <p className="text-sm text-gray-500 mt-1">
              {t('uploadProgress', { progress: uploadProgress })}
            </p>
            <p className="text-sm text-gray-500">
              {t('uploadSpeed', { speed: uploadSpeed.toFixed(2) })}
            </p>
          </div>
        )}
        <div className="flex mt-4 space-x-2">
          <Button onClick={handleUpload} disabled={!file || uploadProgress === 100}>
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            {t('upload')}
          </Button>
          <Button onClick={togglePause} disabled={!file || uploadProgress === 0 || uploadProgress === 100}>
            <FontAwesomeIcon icon={isPaused ? faPlay : faPause} className="mr-2" />
            {isPaused ? t('resume') : t('pause')}
          </Button>
          <Button onClick={handleCompress} disabled={!file}>
            <FontAwesomeIcon icon={faCompress} className="mr-2" />
            {t('compress')}
          </Button>
        </div>
        <div className="mt-4">
          <Button onClick={testInternetSpeed} variant="outline">
            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
            {t('testInternetSpeed')}
          </Button>
          {internetSpeed > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {t('internetSpeed', { speed: internetSpeed.toFixed(2) })}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUpload