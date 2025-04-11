export const extensionSettings = {
  //{ id: 'theme-toggle', label: 'Dark Mode', type: 'checkbox', default: false, tag: 'light mode' },
  General: [
    {
      id: 'ex-timeout',
      label: 'Extension Timeout (seconds)',
      type: 'number',
      default: 30,
      min: 0,
      max: 300,
      rating: 1,
    },
    { id: 'navs-toggle', label: 'Disable Navigation', type: 'checkbox', default: false, rating: 5 },
    { id: 'scroll-limit', label: 'Limit Scrolling', type: 'checkbox', default: true, rating: 4 },
  ],
  Content: [
    {
      id: 'content-filter-visibility',
      label: 'Content Filter Visibility',
      type: 'select',
      default: 'min',
      rating: 1,
      options: [
        { value: 'min', text: 'Minimize' },
        { value: 'hide', text: 'Hide' },
      ],
    },
    { id: 'filtered-words', label: 'Word/Phrase Filter', type: 'array', default: [] },
    { id: 'imagevideo-toggle', label: 'Hide Images/Videos', type: 'checkbox', default: false, rating: 5 },
  ],
  Posts: [
    { id: 'limit-toggle', label: 'Limit Posts', type: 'checkbox', default: true, rating: 1 },
    { id: 'limit-value', label: 'Limit Posts Amount', type: 'number', default: 600, min: 0, max: 1000, rating: 1 },
    { id: 'postings-toggle', label: 'Hide Post Creation Menu', type: 'checkbox', default: true, rating: 3 },
    { id: 'reacts-toggle', label: 'Hide Reacts', type: 'checkbox', default: true, rating: 3 },
    { id: 'comments-toggle', label: 'Hide Comments', type: 'checkbox', default: true, rating: 3 },
    { id: 'shares-toggle', label: 'Hide Shares', type: 'checkbox', default: true, rating: 3 },
    { id: 'saves-toggle', label: 'Hide Save', type: 'checkbox', default: true, rating: 3 },
  ],
  Bias: [
    {
      id: 'bias-filter-visibility',
      label: 'Bias Filter Visibility',
      type: 'select',
      default: 'min',
      tag: 'bias',
      options: [
        { value: 'min', text: 'Minimize' },
        { value: 'hide', text: 'Hide' },
      ],
    },
    { id: 'enable-left', label: 'Left Leaning', type: 'checkbox', default: true, tag: 'bias', rating: 1 },
    //{id: 'enable-center',label: 'Center Leaning',type: 'checkbox', default: false, rating: 1},
    { id: 'enable-right', label: 'Right Leaning', type: 'checkbox', default: true, tag: 'bias', rating: 1 },
    { id: 'threshold', label: 'Threshold', type: 'number', default: 50, min: 5, max: 95 },
  ],
};
