console.log('reader loaded');
try {
    // CNusmb
    const subtitleDiv = document.querySelector("div[jscontroller='D1tHje']");

      const subtitleObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const newNodes = mutation.addedNodes;

          newNodes.forEach((node) => {
            if (node.classList && node.classList.contains("CNusmb")) {
              const speech = node.textContent;
              
              let lwrSpeech = speech.toLowerCase();

              
            }
          });
        });
      });
      subtitleObserver.observe(subtitleDiv, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });
} catch (e) {
    console.log('error in transcripting',e);
}