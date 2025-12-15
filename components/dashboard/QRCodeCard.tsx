'use client'

import QRCode from 'react-qr-code'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

interface QRCodeCardProps {
  slug: string
}

export function QRCodeCard({ slug }: QRCodeCardProps) {
  const svgRef = useRef<any>(null)
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(`${window.location.origin}/g/${slug}`)
  }, [slug])

  if (!url) return null

  const downloadQR = () => {
    const svg = svgRef.current
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      
      const downloadLink = document.createElement('a')
      downloadLink.download = `mysenda-${slug}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col items-center text-center space-y-4">
      <h3 className="font-bold text-gray-900">Tu Código QR</h3>
      <p className="text-sm text-gray-500">
        Escanea para ver tu perfil público
      </p>
      
      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
        <QRCode
          ref={svgRef as any}
          value={url}
          size={150}
          level="H"
        />
      </div>

      <Button 
        onClick={downloadQR} 
        variant="outline" 
        className="w-full flex items-center gap-2"
      >
        <Download size={16} />
        Descargar PNG
      </Button>
    </div>
  )
}
