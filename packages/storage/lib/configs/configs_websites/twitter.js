export const twitterConfigs = {
  mainContainer: { selector: '[aria-label="Home timeline"]', type: 'attribute', parents: 0 },
  postContainer: { selector: 'article', type: 'attribute', parents: 0 },
  messageContainer: { selector: '[data-testid="tweetText"]', type: 'attribute', parents: 0 },
  otherContainers: {},
  others: {
    exempt: 'x-pages-exempt',
    createTimeout: { selector: 'x-timeout', text: 'X/Twitter' },
  },
  onOpen: {
    General: {
      deleteElement: {
        'postings-toggle': [
          { selector: '[data-testid="toolBar"]', type: 'attribute', parents: 11 },
          { selector: '[aria-label="Post"]', type: 'attribute', parents: 0 },
        ],
      },
    },
    Navigation: {
      deleteElement: {
        'x-home-toggle': { selector: '[aria-label="Home"]', type: 'attribute', parents: 0 },
        'x-search-toggle': [
          { selector: '[aria-label="Search and explore"]', type: 'attribute', parents: 0 },
          { selector: '[role="search"]', type: 'attribute', parents: 0 },
        ],
        'x-messages-toggle': { selector: '[aria-label="Direct Messages"]', type: 'attribute', parents: 0 },
        'x-notification-toggle': { selector: '[aria-label="Notifications"]', type: 'attribute', parents: 0 },
        'x-grok-toggle': { selector: '[aria-label="Grok"]', type: 'attribute', parents: 0 },
        'x-jobs-toggle': { selector: '[aria-label="Jobs"]', type: 'attribute', parents: 0 },
        'x-communities-toggle': { selector: '[aria-label="Communities"]', type: 'attribute', parents: 0 },
        'x-premium-toggle': [
          { selector: '[aria-label="Premium"]', type: 'attribute', parents: 0 },
          { selector: '[aria-label="Subscribe to Premium"]', type: 'attribute', parents: 2 },
        ],
        'x-business-toggle': { selector: '[aria-label="Business"]', type: 'attribute', parents: 0 },
        'x-profile-toggle': { selector: '[aria-label="Profile"]', type: 'attribute', parents: 0 },
        'x-menu-toggle': { selector: '[aria-label="More menu items"]', type: 'attribute', parents: 0 },
      },
      hideElement: {
        'x-list-toggle': { selector: '[aria-label="Lists"]', type: 'attribute', parents: 0 },
        'x-bookmark-toggle': { selector: '[aria-label="Bookmarks"]', type: 'attribute', parents: 0 },
      },
    },
    Home: {
      url: '/home',
      deleteElement: {
        'x-homeposts-toggle': { selector: '[role="region"]', type: 'attribute', parents: 0 },
        'x-foryou-toggle': { selector: 'For you', type: 'text', parents: 4 },
        'x-following-toggle': { selector: 'Following', type: 'text', parents: 4 },
        'x-trending-toggle': { selector: '[aria-label="Timeline: Trending now"]', type: 'attribute', parents: 1 },
        'x-recc-toggle': { selector: '[aria-label="Who to follow"]', type: 'attribute', parents: 1 },
      },
    },
    Pages: {
      url: '/*',
      deleteElement: {
        'x-pagesposts-toggle': [
          { selector: '[role="region"]', type: 'attribute', parents: 0 },
          { selector: 'Posts', type: 'text', parents: 4 },
        ],
        'x-articles-toggle': { selector: 'Articles', type: 'text', parents: 4 },
        'x-replies-toggle': { selector: 'Replies', type: 'text', parents: 4 },
        'x-highlights-toggle': { selector: 'Highlights', type: 'text', parents: 4 },
        'x-media-toggle': { selector: 'Media', type: 'text', parents: 4 },
      },
    },
    Posts: {
      url: '',
      deleteElement: {},
    },
  },
  onPost: {
    hideElements: {},
    hideElement: {
      'comments-toggle': [{ selector: '[data-testid="reply"]', type: 'attribute', parents: 0 }],
      'reacts-toggle': [{ selector: '[data-testid="like"]', type: 'attribute', parents: 0 }],
      'shares-toggle': [
        { selector: '[data-testid="retweet"]', type: 'attribute', parents: 0 },
        { selector: '[aria-label="Share post"]', type: 'attribute', parents: 0 },
      ],
      'x-stats-toggle': [
        { selector: '[aria-label*="View post analytics"]', type: 'attribute', parents: 0 },
        { selector: 'Views', type: 'text', parents: 3 },
      ],
      'saves-toggle': [{ selector: '[data-testid="bookmark"]', type: 'attribute', parents: 0 }],
    },
  },
};
