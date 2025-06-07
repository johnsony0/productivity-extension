export const youtubeSettings = {
  General: [
    { id: 'yt-timeout', label: 'YT Timeout (seconds)', type: 'number', default: 30, min: 0, max: 300, rating: 1 },
    { id: 'yt-pages-exempt', label: 'Pages Exempt', type: 'array', default: [] },
    { id: 'yt-shorts-toggle', label: 'Hide Shorts Button', type: 'checkbox', default: true, rating: 2 },
  ],
  Navigation: [
    { id: 'yt-home-toggle', label: 'Hide Home Button', type: 'checkbox', default: true, rating: 2 },
    { id: 'yt-search-toggle', label: 'Hide Search Button', type: 'checkbox', default: true, rating: 2, tag: 'search' },
    { id: 'yt-menu-toggle', label: 'Hide Menu Button', type: 'checkbox', default: true, rating: 2 },
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
    { id: 'yt-homeposts-toggle', label: 'Hide Posts', type: 'checkbox', default: false, rating: 5 },
    { id: 'yt-playables-toggle', label: 'Hide Playables', type: 'checkbox', default: true, rating: 3 },
    { id: 'yt-genres-toggle', label: 'Hide Genres', type: 'checkbox', default: true, rating: 3 },
    { id: 'yt-featured-toggle', label: 'Hide YouTube Featured', type: 'checkbox', default: true, rating: 3 },
  ],
  Pages: [
    { id: 'yt-pagesposts-toggle', label: 'Hide Home Tab', type: 'checkbox', default: false, rating: 5 },
    { id: 'yt-videos-toggle', label: 'Hide Videos Tab', type: 'checkbox', default: true, rating: 3 },
    { id: 'yt-live-toggle', label: 'Hide Live Tab', type: 'checkbox', default: true, rating: 3 },
    { id: 'yt-playlists-toggle', label: 'Hide Playlists Tab', type: 'checkbox', default: true, rating: 3 },
    { id: 'yt-posts-toggle', label: 'Hide Posts Tab', type: 'checkbox', default: true, rating: 3 },
    { id: 'yt-store-toggle', label: 'Hide Store Tab', type: 'checkbox', default: true, rating: 3 },
    { id: 'yt-podcasts-toggle', label: 'Hide Podcasts Tab', type: 'checkbox', default: true, rating: 3 },
  ],
};
