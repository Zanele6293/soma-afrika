import React from 'react';

interface AfricaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  lightMode?: boolean;
}

export const AfricaLogo: React.FC<AfricaLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'National Study Portal',
  lightMode = false
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Exact Glowing Circular Emblem from Mockup */}
      <div className={`relative ${iconSizes[size]} shrink-0 rounded-full bg-gradient-to-br from-[#ea580c] via-[#d97706] to-[#78350f] p-[2px] shadow-lg shadow-orange-950/60 ring-1 ring-amber-400/50 flex items-center justify-center overflow-hidden`}>
        <div className="w-full h-full rounded-full bg-gradient-to-b from-[#29170e] to-[#120b06] flex items-center justify-center p-1 relative">
          {/* Glowing central orb */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/30 via-amber-500/20 to-transparent rounded-full" />
          
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow relative z-10">
            {/* African Continent Silhouette */}
            <path
              d="M 38 12 
                 C 45 12, 54 16, 58 20
                 C 64 25, 74 30, 80 38
                 C 86 46, 82 52, 78 58
                 C 74 63, 70 68, 62 80
                 C 58 86, 52 90, 48 90
                 C 44 90, 40 82, 38 76
                 C 34 68, 30 63, 26 56
                 C 22 50, 15 44, 17 34
                 C 19 26, 25 22, 29 18
                 C 33 14, 36 12, 38 12 Z"
              fill="#F97316"
            />
            {/* Madagascar */}
            <ellipse cx="82" cy="72" rx="3.5" ry="8" transform="rotate(-20 82 72)" fill="#F97316" />
            {/* Central White Knowledge Star / Dot */}
            <circle cx="50" cy="46" r="3" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <div className={`font-black tracking-tight brand-font ${titleSizes[size]} flex items-baseline text-stone-100`}>
          <span>SomaAfrika</span>
        </div>
        {showSubtitle && (
          <span className={`font-medium tracking-wide ${subtitleSizes[size]} text-stone-400`}>
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
