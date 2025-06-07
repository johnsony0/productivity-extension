import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

/**
 * @prop default_locale
 * if you want to support multiple languages, you can use the following reference
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
 *
 * @prop browser_specific_settings
 * Must be unique to your extension to upload to addons.mozilla.org
 * (you can delete if you only want a chrome extension)
 *
 * @prop permissions
 * Firefox doesn't support sidePanel (It will be deleted in manifest parser)
 *
 * @prop content_scripts
 * css: ['content.css'], // public folder
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  name: 'A Productivity Extension',
  browser_specific_settings: {
    gecko: {
      id: 'example@example.com',
      strict_min_version: '109.0',
    },
  },
  version: packageJson.version,
  description: 'Placeholder for Now',
  host_permissions: ['<all_urls>'],
  permissions: ['activeTab', 'scripting', 'storage'],
  options_page: 'options/index.html',
  background: {
    service_worker: 'background.js',
    type: 'module',
  },
  action: {
    default_popup: 'popup/index.html',
    default_icon: 'icon-34.png',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: [
        'https://*.facebook.com/*',
        'https://*.x.com/*',
        'https://*.instagram.com/*',
        'https://*.youtube.com/*',
      ],
      js: ['content/index.iife.js'],
    },
    {
      matches: [
        'https://*.facebook.com/*',
        'https://*.x.com/*',
        'https://*.instagram.com/*',
        'https://*.youtube.com/*',
      ],
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: [
        'https://*.facebook.com/*',
        'https://*.x.com/*',
        'https://*.instagram.com/*',
        'https://*.youtube.com/*',
      ],
      css: ['content.css'],
    },
  ],
  devtools_page: 'devtools/index.html',
  web_accessible_resources: [
    {
      resources: [
        '*.js',
        '*.css',
        '*.svg',
        'icon-128.png',
        'icon-34.png',
        'bias_model.onnx',
        'topic_model.onnx',
        'ort-wasm-simd-threaded.jsep.mjs',
        'ort-wasm-simd-threaded.jsep.wasm',
        'ort-wasm-simd-threaded.mjs',
        'ort-wasm-simd-threaded.wasm',
      ],
      matches: ['*://*/*'],
    },
  ],
} satisfies chrome.runtime.ManifestV3;

export default manifest;
