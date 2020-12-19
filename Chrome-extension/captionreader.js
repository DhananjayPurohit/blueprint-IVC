console.log("reader loaded");
try {
  // CNusmb class for caption container
  let lwrSpeech = "";

  let alertStatus = false;

  // Observes subtitle container
  const subtitleObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newNodes = mutation.addedNodes;
      newNodes.forEach((node) => {
        if (node.classList && node.classList.contains("CNusmb")) {
          const speech = node.textContent;

          lwrSpeech = lwrSpeech +" "+ speech.toLowerCase();
        }
      });
    });
  });

  // calls the observer after every 5s
  const refresh = setInterval(() => {
    const subtitleDiv = document.querySelector("div[jscontroller='D1tHje']");
    if (
      alertStatus == false &&
      subtitleDiv != null &&
      subtitleDiv.style.display === "none"
    ) {
      alert("Turn your captions on for working of IVC");
      alertStatus = true;
    }
    subtitleObserver.observe(subtitleDiv, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }, 5000);

  // Sends the caption text after every 60s
  const sendRequest = setInterval(() => {
    const text = lwrSpeech;
    lwrSpeech = "";
    fetch("https://2d7ab7ade495.ngrok.io/submit", {
      method: "post",
      body: JSON.stringify(text),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }, 60000);
} catch (e) {
  console.log("error in transcripting", e);
}
