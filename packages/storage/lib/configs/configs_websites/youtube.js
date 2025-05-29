export const youtubeConfigs = {
  mainContainer: { selector: '[id="contents"]', type: 'attribute', parents: 0 },
  postContainer: { selector: '[id="thumbnail"]', type: 'attribute', parents: 3 },
  messageContainer: { selector: '[id="video-title"]', type: 'attribute', parents: 0 },
  otherContainers: {},
  others: {
    exempt: 'yt-pages-exempt',
    createTimeout: { selector: 'yt-timeout', text: 'YouTube' },
  },
  onOpen: {
    General: {
      deleteElement: {
        'postings-toggle': { selector: '[aria-label="Create"]', type: 'attribute', parents: 2 },
      },
    },
    Navigation: {
      deleteElement: {
        'yt-search-toggle': [
          { selector: '[role="search"]', type: 'attribute', parents: 0 },
          { selector: '[aria-label="Search with your voice"]', type: 'attribute', parents: 0 },
        ],
        'yt-explore-toggle': { selector: 'Explore', type: 'text', parents: 2 },
        'yt-notification-toggle': { selector: '[aria-label="Notifications"]', type: 'attribute', parents: 2 },
        'yt-profile-toggle': [{ selector: 'You', type: 'text', parents: 1 }],
        'yt-home-toggle': [{ selector: 'Home', type: 'text', parents: 1 }],
        'yt-shorts-toggle': [{ selector: 'Shorts', type: 'text', parents: 1 }],
        'yt-subscriptions-toggle': [{ selector: 'Subscriptions', type: 'text', parents: 1 }],
        'yt-menu-toggle': { selector: '[aria-label="Guide"]', type: 'attribute', parents: 1 },
      },
    },
    Home: {
      url: '/',
      deleteElement: {
        'yt-homeposts-toggle': { selector: '[id="primary"]', type: 'attribute', parents: 0 },
        'yt-playables-toggle': { selector: '[data-pagelet="story_tray"]', type: 'attribute', parents: 0 },
        'yt-homeshorts-toggle': { selector: 'Suggested for you', type: 'text', parents: 3 },
        'yt-genres-toggle': { selector: '[id="chips"]', type: 'attribute', parents: 0 },
      },
    },
    Pages: {
      url: '/@',
      deleteElement: {
        'yt-pagesposts-toggle': [
          { selector: 'Posts', type: 'text', parents: 1 },
          { selector: '_ac7v x1f01sob xcghwft xat24cr xzboxd6', type: 'class', parents: 1 },
        ],
        'yt-foryou-toggle': { selector: 'Reels', type: 'text', parents: 1 },
        'yt-videos-toggle': { selector: 'Tagged', type: 'text', parents: 1 },
        'yt-pagesshorts-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
        'yt-store-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
        'yt-pagessearch-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
        'yt-pages-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
      },
    },
    Posts: {
      url: '/watch',
      deleteElement: {
        'comments-toggle': [{ selector: '[data-testid="reply"]', type: 'attribute', parents: 0 }],
        'reacts-toggle': [{ selector: '[data-testid="like"]', type: 'attribute', parents: 0 }],
        'shares-toggle': [
          { selector: '[data-testid="retweet"]', type: 'attribute', parents: 0 },
          { selector: '[aria-label="Share post"]', type: 'attribute', parents: 0 },
        ],
        'saves-toggle': [{ selector: '[data-testid="bookmark"]', type: 'attribute', parents: 0 }],
        'yt-suggestions-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
        'yt-description-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
        'yt-download-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
        'yt-clip-toggle': { selector: '[role="menu"]', type: 'attribute', parents: 0 },
      },
    },
  },
  onPost: {
    hideElements: {},
    hideElement: {},
  },
};
