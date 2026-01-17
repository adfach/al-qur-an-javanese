import React from 'react';
import { Instagram, Facebook, Github } from 'lucide-react';
import { IslamicOrnament } from './IslamicOrnament';

export const Footer: React.FC = () => {
    return (
        <footer className="mt-8 py-6 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-sm font-medium text-foreground">
                            © 2026 Al-Qur'an Javanese
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            Karya <span className="text-primary/80">Fakhri Chusain</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://www.instagram.com/adfach5758/?next=%2F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                            title="Instagram"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.facebook.com/aditya.fakhri.39/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                            title="Facebook"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a
                            href="https://github.com/adfach"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                            title="GitHub"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
