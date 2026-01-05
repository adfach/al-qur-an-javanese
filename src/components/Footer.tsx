import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          {/* Attribution */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Dibuat dengan</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>oleh</span>
            <a 
              href="https://adfach.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              adfach.co
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © 2026 Al-Qur'an Javanese. Semua hak dilindungi.
          </p>
          
          {/* Standard Note */}
          <p className="text-xs text-muted-foreground max-w-md">
            Teks Al-Qur'an dan terjemahan mengikuti standar Kementerian Agama Republik Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};
