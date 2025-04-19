"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useTheme } from 'next-themes';
import { Sun, Moon, Type, ZoomIn, Volume2, Languages, Contrast, PanelLeft } from 'lucide-react';

export function AccessibilityPanel() {
  const [accessibilitySettings, setAccessibilitySettings] = useLocalStorage('accessibility-settings', {
    highContrast: false,
    largeText: false,
    textSize: 100,
    reducedMotion: false,
    screenReader: false,
    simplifiedLayout: false,
    language: 'en',
    readingGuide: false,
    textToSpeech: false
  });
  
  const { setTheme } = useTheme();
  
  const handleToggleChange = (setting: string) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      [setting]: !accessibilitySettings[setting as keyof typeof accessibilitySettings]
    });
    
    // Apply high contrast theme if selected
    if (setting === 'highContrast') {
      setTheme(!accessibilitySettings.highContrast ? 'high-contrast' : 'light');
    }
    
    // Apply changes to document
    applyAccessibilityChanges({
      ...accessibilitySettings,
      [setting]: !accessibilitySettings[setting as keyof typeof accessibilitySettings]
    });
  };
  
  const handleTextSizeChange = (value: number[]) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      textSize: value[0]
    });
    
    // Apply changes to document
    applyAccessibilityChanges({
      ...accessibilitySettings,
      textSize: value[0]
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setAccessibilitySettings({
      ...accessibilitySettings,
      language: value
    });
  };
  
  // Apply accessibility settings to the document
  const applyAccessibilityChanges = (settings: typeof accessibilitySettings) => {
    // Apply text size
    document.documentElement.style.fontSize = `${settings.textSize}%`;
    
    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Apply large text
    if (settings.largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
    
    // Apply simplified layout
    if (settings.simplifiedLayout) {
      document.documentElement.classList.add('simplified-layout');
    } else {
      document.documentElement.classList.remove('simplified-layout');
    }
    
    // Apply reading guide
    if (settings.readingGuide) {
      enableReadingGuide();
    } else {
      disableReadingGuide();
    }
    
    // Apply text-to-speech if enabled
    if (settings.textToSpeech) {
      enableTextToSpeech();
    } else {
      disableTextToSpeech();
    }
  };
  
  // Initialize settings on component mount
  React.useEffect(() => {
    applyAccessibilityChanges(accessibilitySettings);
  }, []);
  
  // Reading guide implementation
  const enableReadingGuide = () => {
    // Create reading guide element if it doesn't exist
    if (!document.getElementById('reading-guide')) {
      const guide = document.createElement('div');
      guide.id = 'reading-guide';
      guide.style.position = 'fixed';
      guide.style.height = '30px';
      guide.style.background = 'rgba(255, 255, 0, 0.2)';
      guide.style.width = '100%';
      guide.style.pointerEvents = 'none';
      guide.style.zIndex = '9999';
      guide.style.display = 'none';
      document.body.appendChild(guide);
      
      // Add mouse move event listener
      document.addEventListener('mousemove', handleMouseMove);
    }
  };
  
  const disableReadingGuide = () => {
    const guide = document.getElementById('reading-guide');
    if (guide) {
      guide.style.display = 'none';
      document.removeEventListener('mousemove', handleMouseMove);
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    const guide = document.getElementById('reading-guide');
    if (guide) {
      guide.style.display = 'block';
      guide.style.top = `${e.clientY - 15}px`;
    }
  };
  
  // Text-to-speech implementation
  const enableTextToSpeech = () => {
    // Add click event listeners to paragraphs and headings
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    textElements.forEach(element => {
      element.setAttribute('data-tts-enabled', 'true');
      element.addEventListener('click', speakText);
    });
  };
  
  const disableTextToSpeech = () => {
    // Remove click event listeners
    const textElements = document.querySelectorAll('[data-tts-enabled="true"]');
    textElements.forEach(element => {
      element.removeAttribute('data-tts-enabled');
      element.removeEventListener('click', speakText);
    });
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };
  
  const speakText = (e: Event) => {
    if (window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Get text content
      const text = (e.currentTarget as HTMLElement).textContent || '';
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language based on settings
      utterance.lang = accessibilitySettings.language;
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <PanelLeft className="h-5 w-5 mr-2" />
          Accessibility Settings
        </CardTitle>
        <CardDescription>
          Customize your experience to make learning more accessible
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Display</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Contrast className="h-4 w-4" />
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
            </div>
            <Switch
              id="high-contrast"
              checked={accessibilitySettings.highContrast}
              onCheckedChange={() => handleToggleChange('highContrast')}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <Label>Text Size</Label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">A</span>
              <Slider
                value={[accessibilitySettings.textSize]}
                min={80}
                max={200}
                step={10}
                onValueChange={handleTextSizeChange}
                className="flex-1"
              />
              <span className="text-lg">A</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ZoomIn className="h-4 w-4" />
              <Label htmlFor="large-text">Large Text Mode</Label>
            </div>
            <Switch
              id="large-text"
              checked={accessibilitySettings.largeText}
              onCheckedChange={() => handleToggleChange('largeText')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Moon className="h-4 w-4" />
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
            </div>
            <Switch
              id="reduced-motion"
              checked={accessibilitySettings.reducedMotion}
              onCheckedChange={() => handleToggleChange('reducedMotion')}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Reading & Navigation</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <Label htmlFor="screen-reader">Screen Reader Support</Label>
            </div>
            <Switch
              id="screen-reader"
              checked={accessibilitySettings.screenReader}
              onCheckedChange={() => handleToggleChange('screenReader')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PanelLeft className="h-4 w-4" />
              <Label htmlFor="simplified-layout">Simplified Layout</Label>
            </div>
            <Switch
              id="simplified-layout"
              checked={accessibilitySettings.simplifiedLayout}
              onCheckedChange={() => handleToggleChange('simplifiedLayout')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <Label htmlFor="reading-guide">Reading Guide</Label>
            </div>
            <Switch
              id="reading-guide"
              checked={accessibilitySettings.readingGuide}
              onCheckedChange={() => handleToggleChange('readingGuide')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <Label htmlFor="text-to-speech">Text-to-Speech (Click on text)</Label>
            </div>
            <Switch
              id="text-to-speech"
              checked={accessibilitySettings.textToSpeech}
              onCheckedChange={() => handleToggleChange('textToSpeech')}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4" />
            <Label htmlFor="language">Language</Label>
          </div>
          <Select
            value={accessibilitySettings.language}
            onValueChange={handleLanguageChange}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="hi">हिन्दी</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          // Reset to defaults
          const defaults = {
            highContrast: false,
            largeText: false,
            textSize: 100,
            reducedMotion: false,
            screenReader: false,
            simplifiedLayout: false,
            language: 'en',
            readingGuide: false,
            textToSpeech: false
          };
          
          setAccessibilitySettings(defaults);
          applyAccessibilityChanges(defaults);
          setTheme('light');
        }}>
          Reset to Default
        </Button>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}
