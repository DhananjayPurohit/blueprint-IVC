try {
    const node = document.getElementsByTagName('html')[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    const filePath = chrome.runtime.getURL('captionreader.js');
    script.setAttribute('src', filePath)
    node.appendChild(script);
  } catch (e) {
    console.log('error injecting script', e);
  }