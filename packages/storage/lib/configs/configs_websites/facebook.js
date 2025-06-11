export const facebookConfigs = {
  mainContainer: { selector: '[role="main"]', type: 'attribute', parents: 0 },
  postContainer: {
    selector: 'x1n2onr6 x1ja2u2z x1jx94hy xw5cjc7 x1dmpuos x1vsv7so xau1kf4 x9f619 xh8yej3 x6ikm8r x10wlt62 xquyuld',
    type: 'class',
    parents: 0,
  },
  messageContainer: { selector: '[data-ad-preview="message"]', type: 'attribute', parents: 0 },
  otherContainers: {
    'fb-reels-toggle': [
      { selector: 'Reels', type: 'text', parents: 9 },
      { selector: '[aria-label="Open reel in Reels Viewer"]', type: 'attribute', parents: 3 },
    ],
    'fb-suggestions-toggle': [
      { selector: '[aria-label="See more groups"]', type: 'attribute', parents: 3 },
      { selector: 'People you may know', type: 'text', parents: 8 },
    ],
  },
  others: {
    exempt: 'fb-pages-exempt',
    createTimeout: { selector: 'fb-timeout', text: 'Facebook' },
  },
  onOpen: {
    General: {
      url: '_',
      hideElement: {
        'fb-messengeroverlay-toggle': {
          selector:
            'x1i10hfl xjqpnuy xc5r6h4 xqeqjp1 x1phubyo x13fuv20 x18b5jzi x1q0q8m5 x1t7ytsu x972fbf x10w94by x1qhh985 x14e42zd x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x14z9mp xat24cr x1lziwak x2lwn1j xeuugli xexx8yu xyri2b x18d9i69 x1c1uobl x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x6s0dn4 xjyslct x1l31dnx x14yjl9h xudhj91 x18nykt9 xww2gxu x1qeybcx x3nfvp2 xsdox4t xl56j7k x1n2onr6 x1useyqa x19xcq9t',
          type: 'class',
          parents: 4,
        },
        'fb-stories-toggle': { selector: '[aria-label="Stories"]', type: 'attribute', parents: 0 },
        'postings-toggle': [
          { selector: '[aria-label="Create a post"]', type: 'attribute', parents: 1 },
          { selector: 'Write something...', type: 'text', parents: 4 },
          { selector: '[aria-label="New message"]', type: 'attribute', parents: 2 },
        ],
      },
    },
    Navigation: {
      url: '_',
      hideElement: {
        'fb-search-toggle': { selector: '[aria-label="Search Facebook"]', type: 'attribute', parents: 1 },
        'fb-profile-toggle': {
          selector: `x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1q0g3np x87ps6o x1lku1pv x1a2a7pz x1lq5wgf xgqcy7u x30kzoy x9jhf4c x1lliihq`,
          type: 'class',
          parents: 0,
        },
        'fb-home-toggle': { selector: '[aria-label="Home"]', type: 'attribute', parents: 3 },
        'fb-video-toggle': { selector: '[aria-label="Video"]', type: 'attribute', parents: 3 },
        'fb-market-toggle': { selector: '[aria-label="Marketplace"]', type: 'attribute', parents: 3 },
        'fb-groups-toggle': { selector: '[aria-label="Groups"]', type: 'attribute', parents: 3 },
        'fb-gaming-toggle': { selector: '[aria-label="Gaming"]', type: 'attribute', parents: 3 },
        'fb-menu-toggle': { selector: '[aria-label="Menu"]', type: 'attribute', parents: 3 },
        'fb-messages-toggle': { selector: '[aria-label="Messenger"]', type: 'attribute', parents: 3 },
        'fb-notification-toggle': { selector: 'Number of unread notifications', type: 'text', parents: 4 },
      },
    },
    Home: {
      url: '/',
      hideElement: {
        'fb-homeposts-toggle': { selector: 'News Feed posts', type: 'text', parents: 1 },
        'fb-homeshortcuts-toggle': {
          selector: 'x9f619 x1n2onr6 x1ja2u2z x78zum5 xdt5ytf xedcshv x1t2pt76',
          type: 'class',
          parents: 0,
        },
        'fb-contacts-toggle': { selector: 'Contacts', type: 'text', parents: 11 },
        'fb-groupchats-toggle': { selector: 'Group chats', type: 'text', parents: 8 },
      },
    },
    Pages: {
      url: '/',
      hideElements: {
        'fb-pageshortcuts-toggle': { selector: '[role="tablist"]', type: 'attribute', parents: 0 },
      },
      hideElement: {
        'fb-pagesposts-toggle': {
          selector:
            'x9f619 x1n2onr6 x1ja2u2z xeuugli xs83m0k xjl7jj x1xmf6yo x1emribx x1e56ztr x1i64zmx x19h7ccj xu9j1y6 x7ep2pv',
          type: 'class',
          parents: 0,
        },
        'fb-intro-toggle': { selector: 'Intro', type: 'text', parents: 11 },
        'fb-photos-toggle': { selector: 'See all photos', type: 'text', parents: 16 },
      },
    },
    Extras: {
      url: '/groups',
      hideElement: {
        'fb-groupsposts-toggle': { selector: '[role="feed"]', type: 'attribute', parents: 0 },
        'fb-groupshortcuts-toggle': { selector: '[role="tablist"]', type: 'attribute', parents: 0 },
        'fb-about-toggle': { selector: 'About', type: 'text', parents: 11 },
        'fb-recentmedia-toggle': { selector: 'Recent media', type: 'text', parents: 11 },
        'fb-featured-toggle': { selector: '[role="tablist"]', type: 'attribute', parents: 7 },
      },
    },
  },
  onPost: {
    hideElements: {
      'comments-toggle': { selector: `[role="article"]`, type: 'attribute', parents: 2 },
    },
    hideElement: {
      'comments-toggle': [
        { selector: `[aria-label="Write a comment…"]`, type: 'attribute', parents: 12 },
        { selector: `[aria-label="Leave a comment"]`, type: 'attribute', parents: 0 },
        { selector: 'View more comments', type: 'text', parents: 4 },
      ],
      'reacts-toggle': [
        { selector: '[aria-label="See who reacted to this"]', type: 'attribute', parents: 1 },
        { selector: '[aria-label="Like"]', type: 'attribute', parents: 0 },
      ],
      'shares-toggle': [
        {
          selector:
            'x9f619 x1ja2u2z x78zum5 x2lah0s x1n2onr6 x1qughib x1qjc9v5 xozqiw3 x1q0g3np x1ws5yxj xw01apr x4cne27 xifccgj x123j3cw xs9asl8',
          type: 'class',
          parents: 0,
        },
        { selector: `[aria-label="Send this to friends or post it on your profile."]`, type: 'attribute', parents: 0 },
        {
          selector:
            'x1i10hfl x1qjc9v5 xjbqb8w xjqpnuy xa49m3k xqeqjp1 x2hbi6w x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xdl72j9 x2lah0s xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x2lwn1j xeuugli xexx8yu x4uap5 x18d9i69 xkhd6sd x1n2onr6 x16tdsg8 x1hl2dhg xggy1nq x1ja2u2z x1t137rt x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x3nfvp2 x1q0g3np x87ps6o x1lku1pv x1a2a7pz',
          type: 'class',
          parents: 0,
        },
        { selector: `Send`, type: 'text', parents: 5 },
      ],
    },
  },
};
