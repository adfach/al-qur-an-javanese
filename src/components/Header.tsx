import React from 'react';
import { Book, Moon, Sun, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReadingPreferences } from '@/hooks/useLocalStorage';
import { Link, useLocation } from 'react-router-dom';
import { FeedbackModal } from './FeedbackModal';

export const Header: React.FC = () => {
  const [preferences, setPreferences] = useReadingPreferences();
  const location = useLocation();

  const toggleDarkMode = () => {
    const newDarkMode = !preferences.darkMode;
    setPreferences({ ...preferences, darkMode: newDarkMode });
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', preferences.darkMode);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/90 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" id="site-logo" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
              <Book className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground leading-tight">
                Al-Qur'an
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">
                Javanese
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {location.pathname !== '/' && (
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-foreground"
                id="back-to-home"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Beranda</span>
                </Link>
              </Button>
            )}

            <div id="feedback-button">
              <FeedbackModal />
            </div>

            <Button
              id="dark-mode-toggle"
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
            >
              {preferences.darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
