import React, { useState, useEffect } from 'react';
import { Button } from '@headlessui/react';
import { extensionSettings, facebookSettings, instagramSettings, twitterSettings } from '@extension/shared';

interface QuickSettingsProps {
  onSettingsChange: (showToast: boolean) => void;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({ onSettingsChange }) => {
  const [sliderValue, setSliderValue] = useState(3);
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    bias: false,
    messages: false,
    search: false,
  });

  // Load saved slider value and toggle states on initial load
  useEffect(() => {
    chrome.storage.sync.get(['sliderValue', 'toggleStates'], result => {
      if (result.sliderValue !== undefined) {
        setSliderValue(result.sliderValue);
      }
      if (result.toggleStates !== undefined) {
        setToggleStates(result.toggleStates);
      }
    });
  }, []);

  // Get all platform settings
  const getAllPlatformSettings = () => {
    return {
      extension: extensionSettings,
      facebook: facebookSettings,
      instagram: instagramSettings,
      twitter: twitterSettings,
    };
  };

  // Handle slider change
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);
    updateSettingsBasedOnSlider(value);
    chrome.storage.sync.set({ sliderValue: value });
  };

  const updateSettingsBasedOnSlider = (value: number) => {
    const allPlatformSettings = getAllPlatformSettings() as Record<string, any>;

    // Loop through each platform's settings
    Object.keys(allPlatformSettings).forEach(platform => {
      chrome.storage.sync.get([platform], result => {
        const existingSettings = result[platform] || {}; // Load existing settings
        const updatedSettings = { ...existingSettings }; // Create a copy to modify

        const platformSettings = allPlatformSettings[platform];
        Object.keys(platformSettings).forEach(category => {
          platformSettings[category].forEach((setting: any) => {
            if (setting.rating !== undefined) {
              if (!toggleStates[setting.tag]) {
                if (setting.type === 'checkbox') {
                  updatedSettings[setting.id] = setting.rating <= value;
                } else if (setting.type === 'number') {
                  if (setting.id === 'limit-value') {
                    updatedSettings[setting.id] = setting.default - 100 * value;
                  } else {
                    updatedSettings[setting.id] = setting.default * value;
                  }
                }
              }
            }
          });
        });

        // Save updated settings for the current platform
        chrome.storage.sync.set({ [platform]: updatedSettings }, () => {
          console.log(`Settings updated for ${platform}:`, updatedSettings);
        });
      });
    });

    // Notify the parent to show the toast
    onSettingsChange(true);
  };

  const handleToggleTag = (tag: string) => {
    const newToggleStates = { ...toggleStates, [tag]: !toggleStates[tag] };
    setToggleStates(newToggleStates);

    // Save updated toggle states to chrome.storage.sync
    chrome.storage.sync.set({ toggleStates: newToggleStates }, () => {
      console.log(`Toggle state for ${tag} updated:`, newToggleStates[tag]);
    });

    const allPlatformSettings = getAllPlatformSettings() as Record<string, any>;

    // Loop through each platform's settings
    Object.keys(allPlatformSettings).forEach(platform => {
      chrome.storage.sync.get([platform], result => {
        const existingSettings = result[platform] || {}; // Load existing settings
        const updatedSettings = { ...existingSettings }; // Create a copy to modify

        const platformSettings = allPlatformSettings[platform];
        Object.keys(platformSettings).forEach(category => {
          platformSettings[category].forEach((setting: any) => {
            if (setting.tag === tag) {
              updatedSettings[setting.id] = !newToggleStates[tag]; // Update only the relevant setting
            }
          });
        });

        // Save updated settings for the current platform
        chrome.storage.sync.set({ [platform]: updatedSettings }, () => {
          console.log(`Settings updated for ${platform}:`, updatedSettings);
        });
      });
    });

    // Notify the parent to show the toast
    onSettingsChange(true);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-heading">Quick Settings</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="slider" className="block text-sm font-medium text-heading">
            Adjust Settings Rating
          </label>
          <input
            id="slider"
            type="range"
            min="1"
            max="5"
            value={sliderValue}
            onChange={handleSliderChange}
            className="mt-1 block w-full"
          />
          <div className="text-sm text-gray-500">Current Value: {sliderValue}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          <Button
            onClick={() => handleToggleTag('bias')}
            className={`w-full h-18 text-base px-6 py-4 bg-secondary text-heading rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
              toggleStates.bias ? 'border-2 border-white' : ''
            }`}>
            Disable Bias Filter
          </Button>
          <Button
            onClick={() => handleToggleTag('messages')}
            className={`w-full h-18 text-base px-6 py-4 bg-secondary text-heading rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
              toggleStates.messages ? 'border-2 border-white' : ''
            }`}>
            Enable Messages
          </Button>
          <Button
            onClick={() => handleToggleTag('search')}
            className={`w-full h-18 text-base px-6 py-4 bg-secondary text-heading rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
              toggleStates.search ? 'border-2 border-white' : ''
            }`}>
            Enable Search
          </Button>
        </div>
      </div>
    </div>
  );
};
