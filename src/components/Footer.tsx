import React from 'react';
import { Instagram, Facebook, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-8 border-t border-border bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-foreground">
              © 2026 Al-Qur'an Javanese
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-muted-foreground mt-1">
              <span>Dibuat dengan</span>
              <Heart className="w-3 h-3 text-primary fill-primary" />
              <span>oleh</span>
              <a
                href="https://github.com/adfach"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Fakhri Chusain
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/adfach5758/?next=%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-sm"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/aditya.fakhri.39/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-sm"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/adfach"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 shadow-sm"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right hidden sm:block">
            <p className="text-[10px] text-muted-foreground uppercase opacity-70">
              Standards Kemenag RI
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Mangga dipun waos kanthi khusyuk.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
