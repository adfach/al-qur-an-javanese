import React from 'react';

interface IslamicOrnamentProps {
  className?: string;
  variant?: 'header' | 'divider' | 'corner';
}

export const IslamicOrnament: React.FC<IslamicOrnamentProps> = ({ 
  className = '', 
  variant = 'divider' 
}) => {
  if (variant === 'header') {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ornament to-transparent" />
        <svg 
          className="w-8 h-8 text-ornament-accent" 
          viewBox="0 0 32 32" 
          fill="currentColor"
        >
          <path d="M16 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ornament to-transparent" />
      </div>
    );
  }

  if (variant === 'corner') {
    return (
      <svg 
        className={`text-ornament ${className}`}
        viewBox="0 0 40 40" 
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M0 40 Q 0 0, 40 0" />
        <path d="M5 40 Q 5 5, 40 5" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-ornament" />
      <div className="w-2 h-2 rotate-45 bg-ornament" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-ornament" />
    </div>
  );
};

export const Bismillah: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <p className="quran-arabic text-3xl md:text-4xl text-primary mb-2">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
      <p className="text-sm text-muted-foreground">
        Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
      </p>
    </div>
  );
};
