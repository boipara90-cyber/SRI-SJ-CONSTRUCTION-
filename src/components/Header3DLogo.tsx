import React, { useRef, useState } from 'react';
import companyLogoImg from '../assets/images/regenerated_image_1788338692886.png';

interface Header3DLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Header3DLogo: React.FC<Header3DLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt: max 15 degrees
    const rotateY = ((x - centerX) / centerX) * 16;
    const rotateX = -((y - centerY) / centerY) * 16;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleLogoClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 900);
  };

  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14'
  };

  return (
    <div
      ref={containerRef}
      id="header-3d-logo"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleLogoClick}
      className={`relative inline-flex items-center gap-3 select-none cursor-pointer perspective-800 ${className}`}
      title="Sri SJ Constructions Pvt Ltd - Click for 3D spin"
    >
      {/* 3D Emblem Container */}
      <div
        className={`relative rounded-xl p-0.5 shrink-0 preserve-3d transition-transform duration-200 ease-out ${sizeClasses[size]} ${
          isSpinning ? 'rotate-y-360 transition-transform duration-900 ease-in-out' : ''
        }`}
        style={{
          transform: isSpinning 
            ? 'rotateY(360deg)' 
            : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovered ? '8px' : '0px'})`
        }}
      >
        {/* Glowing 3D Orbit Ring */}
        <div 
          className="absolute -inset-1.5 rounded-full border border-orange-500/40 pointer-events-none animate-orbit-ring-3d opacity-75"
          style={{ transformStyle: 'preserve-3d' }}
        />
        
        {/* Pulsing 3D Specular Aura */}
        <div 
          className={`absolute -inset-2 rounded-2xl bg-orange-500/20 filter blur-md pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-30 scale-95'
          }`} 
        />

        {/* 3D Beveled Emblem Plaque */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-white via-zinc-100 to-zinc-200 p-1 shadow-[0_6px_16px_rgba(0,0,0,0.8),0_2px_4px_rgba(249,115,22,0.3)] border-2 border-orange-500/80 flex items-center justify-center overflow-hidden">
          {/* Specular Glare Reflection */}
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none transition-transform duration-200"
            style={{
              transform: `translate(${rotate.y * 1.5}px, ${-rotate.x * 1.5}px)`
            }}
          />
          
          <img
            src={companyLogoImg}
            alt="Sri SJ Constructions Pvt Ltd"
            className="w-full h-full object-contain filter contrast-110 transition-transform duration-300 hover:scale-105"
            draggable={false}
          />
        </div>

        {/* 3D Depth Shadow Projection */}
        <div 
          className="absolute -bottom-1 left-1 right-1 h-1.5 rounded-full bg-orange-600/40 blur-xs transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.9 : 0.4 }}
        />
      </div>

      {/* Brand Text with 3D Depth Tracking */}
      <div 
        className="flex flex-col justify-center transition-transform duration-200"
        style={{
          transform: `translateZ(${isHovered ? '4px' : '0px'})`
        }}
      >
        <div className="flex items-center gap-1.5 leading-none flex-wrap">
          <span className="font-black tracking-tight font-['Space_Grotesk'] text-lg sm:text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            SRI <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 font-black">SJ</span> <span className="text-zinc-100">CONSTRUCTIONS</span>
          </span>
          <span className="text-[10px] font-black tracking-wider px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/50 shadow-xs">
            PVT LTD
          </span>
        </div>
        <span className="text-[10px] text-zinc-400 font-medium tracking-wide mt-0.5 hidden sm:block">
          Piling &amp; Civil Engineering Specialist
        </span>
      </div>
    </div>
  );
};
