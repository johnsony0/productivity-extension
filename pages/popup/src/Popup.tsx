import React, { useState, useEffect } from 'react';
import { PlatformSelector, CategorySection, QuickSettings } from '@extension/ui';
import {
  extensionSettings,
  facebookSettings,
  instagramSettings,
  twitterSettings,
  youtubeSettings,
} from '@extension/storage';
import { Switch, Label, Field, Button } from '@headlessui/react';
import { Toast } from '@extension/ui';

const PopupSettings: React.FC = () => {
  const [platform, setPlatform] = useState('quick-settings'); // Default to "Quick Settings"
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Helper function to flatten settings into id: value pairs
  const flattenSettings = (settings: any) => {
    const flattened: Record<string, any> = {};
    Object.keys(settings).forEach(category => {
      settings[category].forEach((setting: any) => {
        flattened[setting.id] = setting.default;
      });
    });
    return flattened;
  };

  // Load saved settings and dark mode preference on initial load
  useEffect(() => {
    // Load dark mode preference from chrome.storage.sync
    chrome.storage.sync.get(['darkMode'], result => {
      setDarkMode(result.darkMode ?? false); // Default to false if not set
    });

    // Load platform-specific settings (skip for quick-settings)
    if (platform === 'quick-settings') return;
    chrome.storage.sync.get([platform], result => {
      const defaultSettings = getDefaultSettings(platform);
      const flattenedSettings = result[platform] || flattenSettings(defaultSettings);
      setSettings(flattenedSettings);
    });
  }, [platform]);

  // Apply dark mode class to the <html> element and save preference when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
    // Save dark mode preference to chrome.storage.sync
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
      case 'youtube':
        return youtubeSettings;
      default:
        console.warn(`Unsupported platform: ${platform}`);
        return {};
    }
  };

  const handleSettingChange = (id: string, value: any) => {
    const updatedSettings = { ...settings, [id]: value };
    setSettings(updatedSettings);

    // Save updated settings to chrome.storage.sync
    chrome.storage.sync.set({ [platform]: updatedSettings });
    chrome.storage.sync.get(null, result => {
      console.log(result);
    });
    setShowToast(true);
  };

  const renderSettings = () => {
    if (platform === 'quick-settings') {
      return <QuickSettings onSettingsChange={setShowToast} mode={0} />;
    }

    const platformSettings = getDefaultSettings(platform) as Record<string, any>;
    return Object.keys(platformSettings).map(category => (
      <CategorySection
        key={category}
        category={category}
        settings={platformSettings[category]}
        currentSettings={settings}
        onChange={handleSettingChange}
        mode={0}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-font p-4">
      <PlatformSelector onPlatformChange={setPlatform} mode={0} />
      <div className="flex justify-between mb-1">
        <Field>
          <div className="flex items-center ">
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
            <Label className="ml-2 text-sm text-heading">Dark Mode</Label>
          </div>
        </Field>
      </div>
      {renderSettings()}
      {showToast && (
        <Toast message="Settings updated successfully!" duration={3000} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

const PopupStats: React.FC = () => {
  return <h1>Stats</h1>;
};

export const Popup: React.FC = () => {
  const [menu, setMenu] = useState('stats');

  const StatsBarGraphIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"></line>
      <line x1="18" y1="20" x2="18" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="16"></line>
      <line x1="4" y1="20" x2="20" y2="20"></line>
    </svg>
  );

  const SettingsGearIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 5.4 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 5.4 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a2 2 0 0 1 2-2v-.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a2 2 0 0 1 2 2h.09a1.65 1.65 0 0 0 1.51 1 1.65 1.65 0 0 0 1.51 1.65z"></path>
    </svg>
  );

  const baseButtonClasses =
    'relative font-bold text-lg flex h-[50px] w-40 items-center justify-center overflow-hidden bg-white font-medium text-black transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-secondary before:duration-100 before:ease-linear hover:bg-secondary hover:text-black hover:shadow-black hover:before:border-[25px]';
  const activeClasses = 'underline';
  const inactiveClasses = 'no-underline';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex w-full ">
        <Button
          onClick={() => setMenu('stats')}
          className={`${baseButtonClasses} ${menu === 'stats' ? activeClasses : inactiveClasses}`}>
          <span className="flex items-center justify-center z-10">
            {StatsBarGraphIcon}
            Stats
          </span>
        </Button>
        <Button
          onClick={() => setMenu('settings')}
          className={`${baseButtonClasses} ${menu === 'settings' ? activeClasses : inactiveClasses}`}>
          <span className="flex items-center justify-center z-10">
            {SettingsGearIcon}
            Settings
          </span>
        </Button>
      </div>
      {menu === 'settings' && <PopupSettings />}
      {menu === 'stats' && <PopupStats />}
    </div>
  );
};
