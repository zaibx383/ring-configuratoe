import React from 'react'
import { Rotate3d, Maximize, Expand, Focus } from 'lucide-react'

const Controller = ({ onResetView, onRotateCamera, onFitObject, onFullscreen, autoRotate }) => {
  return (
    <div className='absolute bg-black/60 z-50 top-48 flex flex-col gap-3 right-2 p-2 rounded-lg'>
      
      <button
        onClick={onResetView}
        className='flex flex-col items-center gap-1 text-white/80 hover:text-white p-2 rounded hover:bg-white/10 transition-all text-xs'
        title="Reset View"
      >
        <Focus size={18} />
        <span>Focus</span>
      </button>

      <button
        onClick={onRotateCamera}
        className={`flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition-all text-xs ${autoRotate ? 'text-yellow-400' : 'text-white/80 hover:text-white'}`}
        title="Toggle Auto Rotate"
      >
        <Rotate3d size={18} />
        <span>{autoRotate ? 'Stop' : 'Rotate'}</span>
      </button>

      <button
        onClick={onFitObject}
        className='flex flex-col items-center gap-1 text-white/80 hover:text-white p-2 rounded hover:bg-white/10 transition-all text-xs'
        title="Fit Object"
      >
        <Maximize size={18} />
        <span>Fit</span>
      </button>

      <button
        onClick={onFullscreen}
        className='flex flex-col items-center gap-1 text-white/80 hover:text-white p-2 rounded hover:bg-white/10 transition-all text-xs'
        title="Toggle Fullscreen"
      >
        <Expand size={18} />
        <span>Fullscreen</span>
      </button>

    </div>
  )
}

export default Controller