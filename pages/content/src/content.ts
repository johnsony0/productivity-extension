import { runBiasModel, runTopicModel, initModel } from '@extension/shared';
import { createDataBars, createTimeout, createDropdown, displayLimitReached } from '@extension/shared';
import { waitForElm, hideElement, hideElements, deleteElement, hideVideosPhotos, findElement } from '@extension/shared';

import { facebookConfigs } from '@extension/storage';
import { instaConfigs } from '@extension/storage';
import { twitterConfigs } from '@extension/storage';

// Define types for settings and configs
interface FindElementInput {
  type: string;
  selector: string;
  parents?: number;
}
type Settings = { [key: string]: any };
type PlatformConfig = {
  mainContainer: FindElementInput;
  postContainer: FindElementInput;
  messageContainer: FindElementInput;
  otherContainers: { [key: string]: FindElementInput[] };
  others: {
    exempt: string;
    createTimeout: {
      selector: string;
      text: string;
    };
  };
  onOpen: {
    General: {
      deleteElement: { [key: string]: FindElementInput | FindElementInput[] };
    };
    Navigation: {
      deleteElement: { [key: string]: FindElementInput | FindElementInput[] };
    };
    Home: {
      url: string;
      deleteElement: { [key: string]: FindElementInput | FindElementInput[] };
    };
    Pages: {
      url: string;
      deleteElement: { [key: string]: FindElementInput | FindElementInput[] };
    };
  };
  onPost: {
    hideElement: { [key: string]: FindElementInput | FindElementInput[] };
    hideElements: { [key: string]: FindElementInput | FindElementInput[] };
  };
};

const filterPost = async (
  platformConfig: PlatformConfig,
  settings: Settings,
  postContainer: HTMLElement,
  messageContainer: HTMLElement | null,
  text: string,
) => {
  // Hide images if enabled
  if (settings['imagevideo-toggle']) {
    hideVideosPhotos(postContainer);
  }

  // Run filters on each post
  const onPostFilters = platformConfig.onPost || {};
  for (const [functionName, filters] of Object.entries(onPostFilters)) {
    for (const [filterKey, targetElements] of Object.entries(filters)) {
      if (!settings[filterKey]) continue;
      switch (functionName) {
        case 'hideElement':
          hideElement(targetElements, postContainer);
          break;
        case 'hideElements':
          hideElements(targetElements, postContainer);
          break;
      }
    }
  }

  // Check post limit
  chrome.storage.sync.get(['post_count', 'date'], result => {
    const postCount = result.post_count || 0;
    chrome.storage.sync.set({ post_count: postCount + 1 });
    console.log(postCount);
    if (settings['limit-toggle'] && postCount >= settings['limit-value']) {
      console.warn('Post limit exceeded!');
      displayLimitReached(postContainer, settings['limit-value']);
    }
  });

  let dropdownCreated = false;

  // Filter words
  settings['filtered-words'].forEach((word: string) => {
    if (new RegExp(`\\b${word}\\b`, 'i').test(text)) {
      if (settings['content-filter-visibility'] === 'hide') {
        postContainer.style.display = 'none';
      } else if (settings['content-filter-visibility'] === 'min') {
        createDropdown(`Found keyword ${word}`, postContainer);
        dropdownCreated = true;
      }
    }
  });

  const topic_prediction = await runTopicModel(text);
  const topic_data = {
    tech: Math.round(topic_prediction[0] * 100),
    sports: Math.round(topic_prediction[1] * 100),
    politics: Math.round(topic_prediction[2] * 100),
    gaming: Math.round(topic_prediction[3] * 100),
    food: Math.round(topic_prediction[4] * 100),
    business: Math.round(topic_prediction[5] * 100),
  };
  const bias = Object.keys(topic_data).reduce((a, b) =>
    topic_data[a as keyof typeof topic_data] > topic_data[b as keyof typeof topic_data] ? a : b,
  );
  console.log(text, topic_data, bias);

  // ML pipeline for bias detection
  if (bias == 'politics' && !dropdownCreated && messageContainer) {
    const bias_prediction = await runBiasModel(text);
    const bias_data = {
      left: Math.round(bias_prediction[0] * 100),
      center: Math.round(bias_prediction[2] * 100),
      right: Math.round(bias_prediction[1] * 100),
    };
    const bias = Object.keys(bias_data).reduce((a, b) =>
      bias_data[a as keyof typeof bias_data] > bias_data[b as keyof typeof bias_data] ? a : b,
    );
    createDataBars(bias_data, postContainer);

    const biasThresholdExceeded =
      (bias === 'left' && settings['enable-left'] && bias_data['left'] > settings['bias-threshold']) ||
      (bias === 'right' && settings['enable-right'] && bias_data['right'] > settings['bias-threshold']) ||
      (bias === 'center' && settings['enable-center'] && bias_data['center'] > settings['bias-threshold']);
    if (settings['bias-filter-visibility'] === 'hide' && biasThresholdExceeded) {
      postContainer.style.display = 'none';
    } else if (settings['bias-filter-visibility'] === 'min' && biasThresholdExceeded) {
      createDropdown(`Biased towards ${bias} at ${bias_data[bias]}%`, postContainer);
    }
  }
};

const filterPage = (configs: PlatformConfig, settings: Settings) => {
  // Timeout if enabled
  //createTimeout(settings.others.createTimeout['fb-timeout'].text,settings.others.createTimeout['fb-timeout']);
  // Limit scroll if enabled
  if (settings['scroll-limit']) {
    // artifical default scroll_limit given
    const SCROLL_LIMIT = 10000;
    function preventScrollBeyondLimit() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > SCROLL_LIMIT) {
        window.scrollTo(0, SCROLL_LIMIT); // Keep the user at the limit
      }
    }
    // Attach scroll listener
    window.addEventListener('scroll', preventScrollBeyondLimit);
  }

  // Hide images if enabled
  if (settings['imagevideo-toggle']) {
    setTimeout(() => {
      hideVideosPhotos(document);
    }, 2000);
  }

  // Limit posts
  chrome.storage.sync.get(['post_count', 'date'], result => {
    const today = new Date().toDateString();
    let postCount = result.post_count || 0;
    console.log(`Count currently at ${postCount}`);

    if (result.date !== today) {
      // Reset post count for a new day
      chrome.storage.sync.set({ post_count: 0, date: today });
      postCount = 0;
      console.log('Post count reset for the new day.');
    }

    if (settings['limit-toggle'] && postCount >= settings['limit-value']) {
      console.warn('Post limit exceeded!');
      displayLimitReached(document.body, postCount);
    }
  });

  // Handle navigation
  if (settings['navs-toggle']) {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      a {
        pointer-events: none;
      }
    `;
    document.head.appendChild(styleElement);
  }

  // Hide initial elements
  for (const [functionName, filters] of Object.entries(configs.onPost || {})) {
    for (const [filterKey, filterData] of Object.entries(filters)) {
      if (settings[filterKey]) deleteElement(filterData, document);
    }
  }

  const currentUrl = window.location.pathname;
  const exemptPages = settings[configs.others.exempt] || [];
  if (!exemptPages.includes(currentUrl)) {
    // Hide or manage elements based on settings and URL
    for (const [category, functions] of Object.entries(configs.onOpen || {})) {
      // if correct url and not exempt, then filter
      for (const [functionName, functionData] of Object.entries(functions)) {
        for (const [filterKey, filterData] of Object.entries(functionData)) {
          if (!settings[filterKey]) continue;
          switch (functionName) {
            case 'hideElement':
              hideElement(filterData);
              break;
            case 'deleteElement':
              deleteElement(filterData);
              break;
            default:
              console.warn(`Unknown function: ${functionName}`);
          }
        }
      }

      if (settings[configs.others.createTimeout.selector]) {
        createTimeout(configs.others.createTimeout.text, settings[configs.others.createTimeout.selector]);
      }
    }
  }
};

const processPost = (platformConfig: PlatformConfig, settings: Settings, postContainer: HTMLElement) => {
  for (const [filterKey, filterData] of Object.entries(platformConfig.otherContainers)) {
    if (!settings[filterKey]) continue;
    hideElement(filterData, postContainer);
  }
  const messageContainer = findElement(postContainer, platformConfig.messageContainer);
  const text = messageContainer ? messageContainer.innerText : '';
  filterPost(platformConfig, settings, postContainer, messageContainer, text);
};

const setupObserver = (platformConfig: PlatformConfig, settings: Settings) => {
  waitForElm(document, platformConfig.mainContainer).then(mainContainer => {
    if (!mainContainer) {
      console.warn('Main container not found for this platform.');
      return;
    }

    // Process initial posts after mainContainer is found
    const initialPosts = document.querySelectorAll(platformConfig.postContainer.selector);
    initialPosts.forEach(postContainer => processPost(platformConfig, settings, postContainer as HTMLElement));

    // Observe for new posts
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof Element) {
            const postContainer = findElement(node, platformConfig.postContainer);
            if (postContainer && !postContainer.dataset.processed) {
              postContainer.dataset.processed = 'true';
              processPost(platformConfig, settings, postContainer);
            }
          }
        });
      });
    });
    observer.observe(mainContainer, { childList: true, subtree: true });
  });
};

const handleURLChange = () => {
  initModel();
  const url = window.location.hostname + window.location.pathname;
  chrome.storage.sync.get(null, settings => {
    let temp = {};
    temp = { ...temp, ...settings['extension'] };
    temp = { ...temp, ...settings['quick-settings'] };
    temp = { ...temp, ...settings['toggleStates'] };
    if (url.includes('facebook.com')) {
      temp = { ...temp, ...settings['facebook'] };
      console.log('Observing Facebook posts...', temp);
      filterPage(facebookConfigs, temp);
      setupObserver(facebookConfigs, temp);
    } else if (url.includes('instagram.com')) {
      temp = { ...temp, ...settings['instagram'] };
      console.log('Observing Instagram posts...', temp);
      filterPage(instaConfigs, temp);
      setupObserver(instaConfigs, temp);
    } else if (url.includes('x.com')) {
      temp = { ...temp, ...settings['twitter'] };
      console.log('Observing Twitter posts...', temp);
      filterPage(twitterConfigs, temp);
      setupObserver(twitterConfigs, temp);
    } else {
      console.log('This script does not apply to this site.');
    }
  });
};

export const observe = () => {
  let lastURL = window.location.href;
  const observer = new MutationObserver(() => {
    const currentURL = window.location.href;
    if (currentURL !== lastURL) {
      console.log(`URL changed from ${lastURL} to ${currentURL}`);
      lastURL = currentURL;
      handleURLChange();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  handleURLChange();
};
