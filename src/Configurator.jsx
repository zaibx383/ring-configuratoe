import React, { useState } from 'react'

const METAL_OPTIONS = [
  { label: 'White Gold', color: '#E8E4D9' },
  { label: 'Rose Gold', color: '#B76E79' },
  { label: 'Silver', color: '#C0C0C0' },
  { label: 'White Diamond', color: '#F6F6F2' },
]

const DIAMOND_OPTIONS = [
  { label: 'White Gold', color: '#FFD45A' },
  { label: 'Rose Gold', color: '#7AB2B2' },
  { label: 'Silver', color: '#8494FF' },
  { label: 'White Diamond', color: '#F6F6F2' },
]

const SECTIONS = [
  { key: 'metal',        label: 'Metal',        options: METAL_OPTIONS },
  { key: 'bigDiamond',   label: 'Center Stone',  options: DIAMOND_OPTIONS },
  { key: 'smallDiamond', label: 'Pavé Diamonds', options: DIAMOND_OPTIONS },
]

const Configurator = ({
  metalColor,       setMetalColor,
  bigDiamondColor,  setBigDiamondColor,
  smallDiamondColor, setSmallDiamondColor,
}) => {
  const [activeSection, setActiveSection] = useState(null)
  const [displaySection, setDisplaySection] = useState(null)
  const [closing, setClosing] = useState(false)
  const [animKey, setAnimKey] = useState(0) // ← forces dot-in re-trigger

  const colorMap = {
    metal:        { value: metalColor,        setter: setMetalColor },
    bigDiamond:   { value: bigDiamondColor,   setter: setBigDiamondColor },
    smallDiamond: { value: smallDiamondColor, setter: setSmallDiamondColor },
  }

  const close = (then) => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      setDisplaySection(null)
      setActiveSection(null)
      if (then) then()
    }, 150)
  }

  const handleSectionClick = (key) => {
    if (activeSection === key) {
      close()
    } else if (activeSection) {
      close(() => {
        setAnimKey(k => k + 1) // ← new key = fresh dot-in animation
        setActiveSection(key)
        setDisplaySection(key)
      })
    } else {
      setAnimKey(k => k + 1)
      setActiveSection(key)
      setDisplaySection(key)
    }
  }

  return (
    <>
      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: translateY(6px) scale(0.93); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes popOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(6px) scale(0.93); }
        }
        @keyframes dotIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        .palette-in  { animation: popIn  1s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .palette-out { animation: popOut 1s ease-in forwards; }
        .dot-in { animation: dotIn 1s cubic-bezier(0.34,1.56,0.64,1) forwards; opacity: 0; }
      `}</style>

      <div className='absolute z-50 bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'>

        {displaySection && (
          <div className={`flex gap-3 bg-black/60 backdrop-blur px-5 py-3 rounded-full ${closing ? 'palette-out' : 'palette-in'}`}>
            {SECTIONS.find(s => s.key === displaySection).options.map((option, i) => (
              <button
                key={`${animKey}-${option.color}`}  // ← animKey forces remount → fresh dotIn
                onClick={() => colorMap[displaySection].setter(option.color)}
                style={{ backgroundColor: option.color, animationDelay: `${i * 25}ms` }}
                className={`dot-in w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${
                  colorMap[displaySection].value === option.color
                    ? 'border-white scale-110'
                    : 'border-transparent'
                }`}
                title={option.label}
              />
            ))}
          </div>
        )}

        <div className='flex gap-2 bg-black/60 backdrop-blur px-4 py-3 rounded-full'>
          {SECTIONS.map(({ key, label }) => {
            const isActive = activeSection === key
            return (
              <button
                key={key}
                onClick={() => handleSectionClick(key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                  isActive ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <span
                  className='w-4 h-4 rounded-full border border-white/30 flex-shrink-0 transition-all duration-300'
                  style={{ backgroundColor: colorMap[key].value }}
                />
                {label}
              </button>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default Configurator