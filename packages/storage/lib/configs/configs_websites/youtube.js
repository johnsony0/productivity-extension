export const youtubeConfigs = {
  mainContainer: { selector: 'contents', type: 'id', parents: 0 },
  postContainer: { selector: 'thumbnail', type: 'id', parents: 1 },
  messageContainer: { selector: 'dnc', type: 'attribute', parents: 0 },
  otherContainers: {
    'yt-playables-toggle': [{ selector: 'YouTube Playables', type: 'text', parents: 0 }],
    'yt-homeshorts-toggle': [{ selector: 'Suggested for you', type: 'text', parents: 3 }],
    'yt-featured-toggle': [{ selector: '[id="chips"]', type: 'attribute', parents: 0 }],
  },
  others: {
    exempt: 'yt-pages-exempt',
    createTimeout: { selector: 'yt-timeout', text: 'YouTube' },
  },
  onOpen: {
    General: {
      url: '_',
      hideElement: {
        'postings-toggle': { selector: '[aria-label="Create"]', type: 'attribute', parents: 2 },
      },
    },
    Navigation: {
      url: '_',
      hideElement: {
        'yt-search-toggle': [
          { selector: '[role="search"]', type: 'attribute', parents: 0 },
          { selector: '[aria-label="Search with your voice"]', type: 'attribute', parents: 0 },
        ],
        'yt-explore-toggle': { selector: 'Explore', type: 'text', parents: 2 },
        'yt-notification-toggle': { selector: '[aria-label="Notifications"]', type: 'attribute', parents: 2 },
        'yt-profile-toggle': [{ selector: '[aria-label="You"]', type: 'attribute', parents: 1 }],
        'yt-home-toggle': [{ selector: '[aria-label="Home"]', type: 'attribute', parents: 1 }],
        'yt-shorts-toggle': [{ selector: '[aria-label="Shorts"]', type: 'attribute', parents: 1 }],
        'yt-subscriptions-toggle': [{ selector: '[aria-label="Subscriptions"]', type: 'attribute', parents: 1 }],
        'yt-menu-toggle': { selector: '[aria-label="Guide"]', type: 'attribute', parents: 1 },
      },
    },
    Home: {
      url: '/',
      hideElement: {
        'yt-homeposts-toggle': { selector: 'contents', type: 'id', parents: 0 },
        'yt-genres-toggle': { selector: '[id="chips"]', type: 'attribute', parents: 0 },
      },
    },
    Pages: {
      url: '/@',
      hideElement: {
        'yt-pagesposts-toggle': [
          { selector: '[tab-title="Home"]', type: 'attribute', parents: 0 },
          { selector: '[id="contents"]', type: 'attribute', parents: 0 },
        ],
        'yt-videos-toggle': { selector: '[tab-title="Videos"]', type: 'attribute', parents: 0 },
        'yt-pagesshorts-toggle': { selector: '[tab-title="Shorts"]', type: 'attribute', parents: 0 },
        'yt-live-toggle': { selector: '[tab-title="Live"]', type: 'attribute', parents: 0 },
        'yt-playlists-toggle': { selector: '[tab-title="Playlists"]', type: 'attribute', parents: 0 },
        'yt-posts-toggle': { selector: '[tab-title="Posts"]', type: 'attribute', parents: 0 },
        'yt-store-toggle': { selector: '[tab-title="Store"]', type: 'attribute', parents: 0 },
        'yt-search-toggle': { selector: '[aria-label="Search"]', type: ' attribute', parents: 0 },
      },
    },
    Posts: {
      url: '/watch',
      hideElement: {
        'comments-toggle': [{ selector: '[section-identifier="comment-item-section"]', type: 'attribute', parents: 0 }],
        'reacts-toggle': [
          {
            selector: '[class="ytSegmentedLikeDislikeButtonViewModelHost style-scope ytd-menu-renderer"]',
            type: 'attribute',
            parents: 0,
          },
        ],
        'shares-toggle': { selector: '[aria-label="Share"]', type: 'attribute', parents: 0 },
        'saves-toggle': [{ selector: '[aria-label="Save to playlist"]', type: 'attribute', parents: 0 }],
        'yt-suggestions-toggle': { selector: 'contents', type: 'id', parents: 0 },
        'yt-description-toggle': { selector: 'description', type: 'id', parents: 0 },
        'yt-download-toggle': { selector: '[aria-label="Download"]', type: 'attribute', parents: 0 },
        'yt-clip-toggle': { selector: '[aria-label="Clip"]', type: 'attribute', parents: 0 },
      },
    },
  },
  onPost: {
    hideElements: {},
    hideElement: {},
  },
};
