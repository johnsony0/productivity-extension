import '@src/Options.css';
import React, { useState, useEffect } from 'react';
import { PlatformSelector, CategorySection } from '@extension/ui';
import { extensionSettings, facebookSettings, instagramSettings, twitterSettings } from '@extension/shared';
import { Switch } from '@headlessui/react';
import { Toast } from '@extension/ui';

export const Options: React.FC = () => {
  const [platform, setPlatform] = useState('extension');
  const [settings, setSettings] = useState<any>({});
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Load saved settings from chrome.storage.sync
    chrome.storage.sync.get([platform, 'darkMode'], result => {
      if (result[platform]) {
        setSettings(result[platform]);
      } else {
        setSettings(getDefaultSettings(platform));
      }
      if (result.darkMode !== undefined) {
        setDarkMode(result.darkMode);
      }
    });
  }, [platform]);

  useEffect(() => {
    // Apply dark mode class to the body
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
    // Save dark mode preference
    chrome.storage.sync.set({ darkMode });
  }, [darkMode]);

  const getDefaultSettings = (platform: string) => {
    switch (platform) {
      case 'extension':
        return extensionSettings;
      case 'facebook':
        return facebookSettings;
      case 'instagram':
        return instagramSettings;
      case 'twitter':
        return twitterSettings;
      default:
        return {};
    }
  };

  const handleSettingChange = (id: string, value: any) => {
    const updatedSettings = { ...settings };
    updatedSettings[id] = value;
    setSettings(updatedSettings);
    chrome.storage.sync.set({ [platform]: updatedSettings }, () => {
      // Show toast notification when settings are saved
      setShowToast(true);
    });
  };

  const renderSettings = () => {
    const platformSettings = getDefaultSettings(platform) as Record<string, any>;
    return Object.keys(platformSettings).map(category => (
      <CategorySection
        key={category}
        category={category}
        settings={platformSettings[category]}
        onChange={handleSettingChange}
      />
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-font">
      <div className="w-full max-w-4xl mx-4 bg-primary p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <PlatformSelector onPlatformChange={setPlatform} />
          <Switch.Group>
            <div className="flex items-center">
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={`${
                  darkMode ? 'bg-secondary' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2`}>
                <span
                  className={`${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
              <Switch.Label className="ml-2 text-sm text-heading">Dark Mode</Switch.Label>
            </div>
          </Switch.Group>
        </div>
        {renderSettings()}
      </div>
      {showToast && (
        <Toast message="Settings updated successfully!" duration={3000} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};
