try {
  console.log("Edit 'pages/devtools/src/index.ts' and save to reload.");
  chrome.devtools.panels.create('Dev Tools', '/icon-34.jpg', '/devtools-panel/index.html');
} catch (e) {
  console.error(e);
}
