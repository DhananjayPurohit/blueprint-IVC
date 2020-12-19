console.log("reader loaded");
try {
  // CNusmb
  let lwrSpeech = "";
  const subtitleObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newNodes = mutation.addedNodes;
      newNodes.forEach((node) => {
        if (node.classList && node.classList.contains("CNusmb")) {
          const speech = node.textContent;

          lwrSpeech = lwrSpeech + speech.toLowerCase();
          console.log(lwrSpeech);
        }
      });
    });
  });

  const refresh = setInterval(() => {
    const subtitleDiv = document.querySelector("div[jscontroller='D1tHje']");
    subtitleObserver.observe(subtitleDiv, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }, 5000);
  const sendRequest = setInterval(() => {
      const text=lwrSpeech;
      lwrSpeech="";
    fetch("https://eaogudskckezrfywev.pythonanywhere.com/submit", {
      method: "post",
      body: JSON.stringify(text),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  },30000);
} catch (e) {
  console.log("error in transcripting", e);
}
