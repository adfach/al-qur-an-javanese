import React from 'react';
import { Settings, Minus, Plus, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useReadingPreferences } from '@/hooks/useLocalStorage';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const FontSettings: React.FC = () => {
  const [preferences, setPreferences] = useReadingPreferences();

  const updateFontSize = (type: 'arabic' | 'latin' | 'translation', value: number) => {
    setPreferences({
      ...preferences,
      fontSize: {
        ...preferences.fontSize,
        [type]: value,
      },
    });
  };

  const toggleSetting = (setting: 'showLatin' | 'showTranslation' | 'showTajwid') => {
    setPreferences({
      ...preferences,
      [setting]: !preferences[setting],
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Pengaturan Tampilan</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-6">
          <h4 className="font-semibold text-foreground mb-4">Pengaturan Tampilan</h4>

          {/* Arabic Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ukuran Teks Arab</span>
              <span className="text-sm font-medium">{preferences.fontSize.arabic}px</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateFontSize('arabic', Math.max(20, preferences.fontSize.arabic - 2))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Slider
                value={[preferences.fontSize.arabic]}
                min={20}
                max={48}
                step={2}
                onValueChange={([value]) => updateFontSize('arabic', value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateFontSize('arabic', Math.min(48, preferences.fontSize.arabic + 2))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Latin Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ukuran Teks Latin</span>
              <span className="text-sm font-medium">{preferences.fontSize.latin}px</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateFontSize('latin', Math.max(10, preferences.fontSize.latin - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Slider
                value={[preferences.fontSize.latin]}
                min={10}
                max={20}
                step={1}
                onValueChange={([value]) => updateFontSize('latin', value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateFontSize('latin', Math.min(20, preferences.fontSize.latin + 1))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Translation Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ukuran Terjemahan</span>
              <span className="text-sm font-medium">{preferences.fontSize.translation}px</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateFontSize('translation', Math.max(12, preferences.fontSize.translation - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Slider
                value={[preferences.fontSize.translation]}
                min={12}
                max={24}
                step={1}
                onValueChange={([value]) => updateFontSize('translation', value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateFontSize('translation', Math.min(24, preferences.fontSize.translation + 1))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Toggle Settings */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tampilkan Latin</span>
              <Switch
                checked={preferences.showLatin}
                onCheckedChange={() => toggleSetting('showLatin')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tampilkan Terjemahan</span>
              <Switch
                checked={preferences.showTranslation}
                onCheckedChange={() => toggleSetting('showTranslation')}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Warna Tajwid</span>
              <Switch
                checked={preferences.showTajwid}
                onCheckedChange={() => toggleSetting('showTajwid')}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
