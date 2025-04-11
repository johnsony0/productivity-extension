type Data = { [key: string]: number };

export const createBarSegment = (barContainer: HTMLDivElement, name: string, value: number): void => {
  const segment = document.createElement('div');
  segment.style.width = `${value}%`;
  segment.style.backgroundColor = name === 'left' ? '#00AEF3' : name === 'center' ? '#808080' : '#f44336';
  segment.style.height = '100%';
  segment.title = name;
  segment.innerText = `${value}%`;
  segment.style.display = 'flex';
  segment.style.justifyContent = 'center';
  segment.style.alignItems = 'center';
  barContainer.appendChild(segment);
};

export const createDataBars = (data: Data, targetElement: HTMLElement | null): void => {
  const dataDiv = document.createElement('div');
  const barContainer = document.createElement('div');
  barContainer.style.display = 'flex';
  barContainer.style.height = '20px';
  barContainer.style.border = '1px solid #ccc';
  barContainer.style.borderRadius = '4px';
  barContainer.style.overflow = 'hidden';

  const dataEntries = Object.entries(data);
  dataEntries.forEach(([name, value]) => {
    if (value) {
      createBarSegment(barContainer, name, value);
    }
  });

  dataDiv.style.padding = '10px';
  const bodyStyle = getComputedStyle(document.body);
  const backgroundColor = bodyStyle.backgroundColor || '#f0f0f0';
  dataDiv.style.backgroundColor = backgroundColor;
  dataDiv.appendChild(barContainer);

  if (targetElement) {
    targetElement.style.flexDirection = 'column';
    targetElement.insertAdjacentElement('beforeend', dataDiv);
  } else {
    console.warn('Parent node not found');
  }
};

export const createDropdown = (text: string, postNode: HTMLElement): void => {
  const toggleButton = document.createElement('button');
  const buttonNode = postNode.parentNode as HTMLElement;

  toggleButton.textContent = `v ${text} v`;
  toggleButton.style.width = '100%';
  toggleButton.style.border = '1px solid #ccc';
  toggleButton.style.borderRadius = '8px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.margin = '10px';

  const bodyStyle = getComputedStyle(document.body);
  const backgroundColor = bodyStyle.backgroundColor || '#f0f0f0';
  toggleButton.style.backgroundColor = backgroundColor;
  toggleButton.style.padding = '10px';
  buttonNode.style.display = 'flex';
  buttonNode.style.flexDirection = 'column';

  let isHidden = true;
  postNode.style.display = 'none';
  toggleButton.onclick = () => {
    if (isHidden) {
      postNode.style.display = 'block';
      toggleButton.textContent = `^ ${text} ^`;
    } else {
      postNode.style.display = 'none';
      toggleButton.textContent = `v ${text} v`;
    }
    isHidden = !isHidden;
  };

  buttonNode.insertAdjacentElement('afterbegin', toggleButton);
};

export const createTimeout = (name: string, duration: number): void => {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.color = 'white';
  overlay.style.fontSize = '2rem';

  const styleElement = document.createElement('style');
  styleElement.textContent = `
    a {
      pointer-events: none;
    }`;
  overlay.appendChild(styleElement);

  document.body.style.overflow = 'hidden';

  document.body.appendChild(overlay);

  let remainingTime = duration;
  overlay.innerText = `Access to ${name} is disabled for ${remainingTime} seconds`;

  const interval = setInterval(() => {
    remainingTime -= 1;
    if (remainingTime > 0) {
      overlay.innerText = `Access to ${name} is disabled for ${remainingTime} seconds`;
    } else {
      clearInterval(interval);
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
    }
  }, 1000);
};

export const displayLimitReached = (adjacentElement: HTMLElement, postLimit: number): void => {
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = '0';
  messageContainer.style.left = '0';
  messageContainer.style.width = '100%';
  messageContainer.style.height = '100%';
  messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  messageContainer.style.display = 'flex';
  messageContainer.style.flexDirection = 'column';
  messageContainer.style.justifyContent = 'center';
  messageContainer.style.alignItems = 'center';
  messageContainer.style.zIndex = '9999';
  messageContainer.style.color = 'white';
  messageContainer.style.fontSize = '1.5rem';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.padding = '20px';

  const messageText = document.createElement('p');
  messageText.innerHTML = `You have hit your set post limit of ${postLimit}.<br>Let's focus on improving one percent today.`;
  messageText.style.marginBottom = '50px';
  messageContainer.appendChild(messageText);

  const quoteText = document.createElement('blockquote');
  quoteText.style.fontStyle = 'italic';
  quoteText.style.fontSize = '1.2rem';
  quoteText.style.textAlign = 'center';
  quoteText.style.margin = '0 20px';
  quoteText.innerHTML = `
    "If you can get 1 percent better each day for one year, 
    you’ll end up thirty-seven times better by the time you’re done. 
    Conversely, if you get 1 percent worse each day for one year, 
    you’ll decline nearly down to zero."
  `;
  messageContainer.appendChild(quoteText);

  const citation = document.createElement('cite');
  citation.style.marginTop = '10px';
  citation.style.display = 'block';
  citation.style.fontSize = '1rem';
  citation.style.color = 'rgba(255, 255, 255, 0.8)';
  citation.innerText = `- James Clear, Atomic Habits`;
  messageContainer.appendChild(citation);

  adjacentElement.insertAdjacentElement('beforebegin', messageContainer);
  adjacentElement.style.display = 'none';
};
