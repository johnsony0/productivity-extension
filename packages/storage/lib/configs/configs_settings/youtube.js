export const youtubeSettings = {
  General: [
    { id: 'yt-timeout', label: 'YT Timeout (seconds)', type: 'number', default: 30, min: 0, max: 300, rating: 1 },
  ],
  Navigation: [
    { id: 'yt-home-toggle', label: 'Hide Home Button', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-search-toggle', label: 'Hide Search Button', type: 'checkbox', default: true, rating: 2, tag: 'search' },
    { id: 'yt-menu-toggle', label: 'Hide Menu Button', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-shorts-toggle', label: 'Hide Shorts Button', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-subscriptions-toggle', label: 'Hide Subscriptions Button', type: 'checkbox', default: 'true', rating: 2 },
    { id: 'yt-profile-toggle', label: 'Hide Profile Button', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-explore-toggle', label: 'Hide Explore Button', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-notification-toggle', label: 'Hide Notification Button', type: 'checkbox', default: true, rating: 2 },
  ],
  Posts: [
    { id: 'yt-suggestions-toggle', label: 'Hide Suggestions', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-description-toggle', label: 'Hide Descriptions', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-download-toggle', label: 'Hide Download Button', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-clip-toggle', label: 'Hide Clip Button', type: 'checkbox', default: true, rating: 2 },
  ],
  Home: [
    { id: 'yt-homeposts-toggle', label: 'Hide Posts', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-playables-toggle', label: 'Hide Playables', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-homeshorts-toggle', label: 'Hide Shorts', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-genres-toggle', label: 'Hide Genres', type: 'checkbox', default: true, rating: 2 },
  ],
  Pages: [
    { id: 'yt-pagesposts-toggle', label: 'Hide Posts', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-foryou-toggle', label: 'Hide For You', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-videos-toggle', label: 'Hide Videos', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-pagesshorts-toggle', label: 'Hide Shorts', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-store-toggle', label: 'Hide Store', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-pagessearch-toggle', label: 'Hide Search', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-pages-exempt', label: 'Pages Exempt', type: 'array', default: [] },
  ],
};
