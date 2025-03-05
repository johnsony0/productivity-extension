import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';
import { extensionSettings, facebookSettings, instagramSettings, twitterSettings } from '@extension/shared';
import { flattenSettings } from '@extension/shared';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onInstalled.addListener(() => {
  const defaultSettings = {
    extension: flattenSettings(extensionSettings),
    facebook: flattenSettings(facebookSettings),
    instagram: flattenSettings(instagramSettings),
    twitter: flattenSettings(twitterSettings),
    darkMode: false,
  };
  chrome.storage.sync.set(defaultSettings, () => {
    console.log('Default settings saved on install.');
  });
});

console.log('Background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
