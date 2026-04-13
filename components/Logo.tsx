'use client'

import Image from 'next/image'

interface LogoProps {
  variant?: 'default' | 'white'
}

export default function Logo({ variant = 'default' }: LogoProps) {
  const textColor = variant === 'white' ? 'text-white' : 'text-black'
  const subtextColor = variant === 'white' ? 'text-white/80' : 'text-black/70'
  
  return (
    <a href="/" className="flex items-center space-x-3 group">
      {/* Логотип куб (из PDF, конвертирован в PNG) */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
        <Image
          src="/logo-cube.png"
          alt="BIORISE"
          width={56}
          height={56}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      
      {/* Текст логотипа */}
      <div className="flex flex-col">
        <span className={`text-xl md:text-2xl font-menu ${textColor} font-semibold leading-tight tracking-tight`}>
          БИОРАЙЗ
        </span>
        <span className={`text-[11px] md:text-xs font-body ${subtextColor} leading-tight`}>
          клиника восстановительной медицины
        </span>
      </div>
    </a>
  )
}
