console.log("reader loaded");
try {
  // CNusmb class for caption container
  let lwrSpeech = "";

  let alertStatus = false;

  let observerStatus = false;

  let speech = "";
  // Observes subtitle container
  const subtitleObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newNodes = mutation.removedNodes;
      newNodes.forEach((node) => {
        speech=node.textContent+speech;
      })
    });
    lwrSpeech=lwrSpeech+speech;
    speech="";
    console.log(lwrSpeech);
  });

  const setObserver = (subtitleSpan) => {
    if (!observerStatus){
      subtitleObserver.observe(subtitleSpan, {
        childList: true,
        // subtree: true,
        // attributes: false,
        // characterData: false,
      });
    }
  }
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
    if (subtitleDiv != null &&
      subtitleDiv.style.display !== "none"){
        const subtitleSpan = document.querySelector("div[jsname='tgaKEf']");
        setObserver(subtitleSpan);
      }
  }, 5000);

  // Sends the caption text after every 60s
  const sendRequest = setInterval(() => {
    const text = lwrSpeech;
    console.log(text)
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
