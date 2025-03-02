import '@src/Options.css';
import React, { useState, useEffect } from 'react';
import { PlatformSelector, CategorySection } from '@extension/ui';
import { extensionSettings, facebookSettings, instagramSettings, twitterSettings } from '@extension/shared';
import { Switch, Label, Field } from '@headlessui/react';
import { Toast } from '@extension/ui';

export const Options: React.FC = () => {
  const [platform, setPlatform] = useState('extension');
  const [settings, setSettings] = useState<any>({});
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Load saved settings and dark mode preference on initial load
  useEffect(() => {
    chrome.storage.sync.get([platform, 'darkMode'], result => {
      const platformSettings = result[platform] || getDefaultSettings(platform);
      setSettings(platformSettings);

      // Load dark mode preference (default to false if not set)
      setDarkMode(result.darkMode ?? false);
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
    const updatedSettings = { ...settings, [id]: value };
    setSettings(updatedSettings);
    console.log(updatedSettings);
    // Save updated settings to chrome.storage.sync
    chrome.storage.sync.set({ [platform]: updatedSettings }, () => {
      setShowToast(true);
    });
    chrome.storage.sync.get(null, result => {
      console.log('Entire chrome.storage.sync:', result);
    });
  };

  const renderSettings = () => {
    const platformSettings = getDefaultSettings(platform) as Record<string, any>;
    return Object.keys(platformSettings).map(category => (
      <CategorySection
        key={category}
        category={category}
        settings={platformSettings[category]}
        currentSettings={settings}
        onChange={handleSettingChange}
      />
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-font">
      <div className="w-[90%] lg:w-1/2 h-[90vh] bg-primary p-8 rounded-lg shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <PlatformSelector onPlatformChange={setPlatform} />
          <Field>
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
              <Label className="ml-2 text-sm text-heading">Dark Mode</Label>
            </div>
          </Field>
        </div>
        {renderSettings()}
      </div>
      {showToast && (
        <Toast message="Settings updated successfully!" duration={3000} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};
