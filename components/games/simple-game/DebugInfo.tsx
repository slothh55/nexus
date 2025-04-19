'use client'

import { useState, useEffect } from 'react'

export function DebugInfo() {
  const [info, setInfo] = useState<Record<string, any>>({})

  useEffect(() => {
    // Collect debug information
    const debugInfo = {
      userAgent: window.navigator.userAgent,
      webGL: {
        supported: !!window.WebGLRenderingContext,
        renderer: null as string | null,
        vendor: null as string | null,
      },
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
      },
      performance: {
        memory: (window.performance as any).memory ? {
          jsHeapSizeLimit: ((window.performance as any).memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
          totalJSHeapSize: ((window.performance as any).memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
          usedJSHeapSize: ((window.performance as any).memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
        } : 'Not available',
      },
    }

    // Try to get WebGL info
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (gl) {
        const webglInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (webglInfo) {
          debugInfo.webGL.renderer = gl.getParameter(webglInfo.UNMASKED_RENDERER_WEBGL)
          debugInfo.webGL.vendor = gl.getParameter(webglInfo.UNMASKED_VENDOR_WEBGL)
        }
      }
    } catch (e) {
      console.error('Error getting WebGL info:', e)
    }

    setInfo(debugInfo)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-2 text-xs font-mono z-50 max-h-32 overflow-auto">
      <div className="flex justify-between">
        <span>Debug Info</span>
        <button onClick={() => document.querySelector('.debug-info')?.classList.toggle('hidden')}>
          Toggle
        </button>
      </div>
      <div className="debug-info">
        <pre>{JSON.stringify(info, null, 2)}</pre>
      </div>
    </div>
  )
}
