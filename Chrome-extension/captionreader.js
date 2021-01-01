console.log("reader loaded");
try {
  // CNusmb class for caption container
  let lwrSpeech = "";

  let speech = "";

  const ID_TOGGLE_BUTTON = "__gmt-icon";

  let isTranscribing = false;

  let weTurnedCaptionsOn = false;

  let email = window.WIZ_global_data.oPEP7c;


  const toggleTranscribing = () => {
    isTranscribing = !isTranscribing;
    isTranscribing ? startTranscribing() : stopTranscribing();
  };

  // stop recording captions
  const stopTranscribing = () => {
    document.querySelector(`#${ID_TOGGLE_BUTTON}`).classList.remove("on");
    subtitleObserver.disconnect();
    console.log("Stop");
    clearInterval(sendRequest);
    if (weTurnedCaptionsOn) {
      turnCaptionsOff();
      weTurnedCaptionsOn = false;
    }
  };

  // start recording captions
  const startTranscribing = () => {
    document.querySelector(`#${ID_TOGGLE_BUTTON}`).classList.add("on");
    console.log("Start");
    turnCaptionsOn();
    const subtitleSpan = document.querySelector("div[jsname='tgaKEf']");
    setObserver(subtitleSpan);
    CallSendRequest();
  };

  // Turn captions button on
  const turnCaptionsOn = () => {
    const captionsButtonOn = xpath(
      `//div[text()='Turn on captions']/ancestor::div[@role='button']`,
      document
    );
    if (captionsButtonOn) {
      captionsButtonOn.click();
      weTurnedCaptionsOn = true;
    }
  };

  // Turn captions button off
  const turnCaptionsOff = () => {
    const captionsButtonOff = xpath(
      `//div[text()='Turn off captions']/ancestor::div[@role='button']`,
      document
    );

    if (captionsButtonOff) {
      captionsButtonOff.click();
      weTurnedCaptionsOn = false;
    }
  };

  const findButtonContainer = () => {
    const participantsIcon = xpath(XPATH_SELECTOR_PARTICIPANTS, document);
    const chatIcon = xpath(XPATH_SELECTOR_CHAT, document);
    return getCommonAncestor(participantsIcon, chatIcon);
  };

  const getCommonAncestor = (node1, node2) => {
    const parents1 = parents(node1);
    const parents2 = parents(node2);

    if (parents1[0] === parents2[0]) {
      for (let i = 0; i < parents1.length; i++) {
        if (parents1[i] !== parents2[i]) {
          return parents1[i - 1];
        }
      }
    }
  };

  const parents = (node) => {
    const nodes = [node];
    for (; node; node = node.parentNode) {
      nodes.unshift(node);
    }
    return nodes;
  };

  const addButtonLoop = () => {
    const buttons = findButtonContainer();

    if (buttons && !buttons.__gmt_button_added) {
      buttons.__gmt_button_added = true;

      // Find the button container element and copy the divider
      buttons.prepend(buttons.children[1].cloneNode());

      // Add our button to enable/disable the grid
      const toggleButton = document.createElement("div");
      toggleButton.classList = buttons.children[1].classList;
      toggleButton.classList.add("__gmt-button");

      toggleButton.style.display = "flex";
      toggleButton.onclick = toggleTranscribing;
      buttons.prepend(toggleButton);

      toggleButton.appendChild(
        makeSvg(SVG_ICON, 24, 24, { id: ID_TOGGLE_BUTTON })
      );
    }
    const captionsButtonOn = xpath(
      `//div[text()='Turn on captions']/ancestor::div[@role='button']`,
      document
    );
    if (captionsButtonOn) {
      stopTranscribing();
    }
  };

  // Observes subtitle container
  const subtitleObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      const newNodes = mutation.removedNodes;
      newNodes.forEach((node) => {
        speech = node.textContent + speech;
      });
    });
    lwrSpeech = lwrSpeech + speech;
    speech = "";
    console.log(lwrSpeech);
  });

  // Mount observer
  const setObserver = (subtitleSpan) => {
      subtitleObserver.observe(subtitleSpan, {
        childList: true,
        // subtree: true,
        // attributes: false,
        // characterData: false,
      });
  };

  // check and mount the button in every 5 second
  const refresh = setInterval(() => {
    addButtonLoop();
  }, 5000);

  // Sends the caption text after every 60s
  function CallSendRequest() {
    const sendRequest = setInterval(() => {
      const text = lwrSpeech;
      console.log(text);
      lwrSpeech = "";
      if (text!=""){
      fetch("https://2d7ab7ade495.ngrok.io/submit", {
        method: "post",
        body: JSON.stringify({text:text,email:email}),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
      }
    }, 60000);
  }

  const xpath = (search, root = document) => {
    return document.evaluate(
      search,
      root,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    ).singleNodeValue;
  };

  const makeSvg = (
    { viewBoxWidth, viewBoxHeight, pathD },
    widthPx,
    heightPx,
    options = {}
  ) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = `${widthPx}px`;
    svg.style.height = `${heightPx}px`;
    svg.setAttribute("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    svg.innerHTML = `<path d="${pathD}" class="" />`;

    svg.id = options.id ? options.id : "";
    // svg.className = options.className ? options.className : '';
    if (options.className) {
      svg.classList.add(options.className);
    }
    svg.onclick = options.onclick ? options.onclick : null;

    return svg;
  };

  const COLOR_GREY = "5F6368";

  const COLOR_GREEN = "00796b";

  const STYLE = document.createElement("style");
  STYLE.innerText = `
    .__gmt-button {
      overflow: visible !important;
    }
    .__gmt-button > div {
      box-sizing: border-box;
      display: none;
      position: absolute;
      top: 40px;
      left: 0;
      width: 300px;
      padding: 12px;
      padding-bottom: 10px;
      padding-top: 18px;
      background: white;
      border-radius: 0 0 0 8px;
      text-align: left;
      cursor: auto;
    }
    .__gmt-button:hover > div {
      display: block;
    }
    .__gmt-button > div label {
      display: block;
      line-height: 24px;
      cursor: pointer;
      margin-right: 8px;
      margin-left: 8px;
    }
    .__gmt-button > div label > span {
      margin-left: 6px;
    }
    .__gmt-button > div > ul {
      list-style-type: none;
      padding: 0px;
      padding-inline-start: 0px;
      padding-inline-end: 0px;
      padding-right: 8px;
      margin-left: 8px;
      margin-right: -8px;
      margin-top: 4px;
      margin-bottom: 0px;
      max-height: 400px;
      overflow-y: scroll;
    }
    .__gmt-button > div > ul > li {
      line-height: 1em;
      position: relative;
      margin-top: 12px;
      margin-bottom: 12px;
    }
    .__gmt-button > div > ul > li > svg.copy {
      cursor: pointer;
    }
    .__gmt-button > div > ul > li > span {
      margin-left: 6px;
      cursor: pointer;
    }
    .__gmt-button > path {
      fill: #${COLOR_GREY};
    }
    #__gmt-icon.on > path {
      fill: #${COLOR_GREEN};
    }
  `;
  document.body.append(STYLE);

  const SVG_ICON = {
    viewBoxWidth: 512,
    viewBoxHeight: 512,
    pathD:
      "M472.004,0c-0.001,0-0.003,0-0.004,0H8C3.583-0.001,0.001,3.579,0,7.996C0,7.997,0,7.999,0,8v160h16V16h448v176H184v16h288c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004V8C480.001,3.583,476.421,0.001,472.004,0zM255.362,68.974c-5.477-13.165-20.589-19.397-33.753-13.92c-0.225,0.094-0.449,0.19-0.671,0.29l-64.868,33.65 C158.628,83.692,159.971,77.886,160,72c0-22.091-17.909-40-40-40S80,49.909,80,72c0.03,8.683,2.913,17.116,8.205,24h-0.333 c-22.708,0.152-42.979,14.269-50.996,35.516L15.52,205.125c-5.084,13.206,1.5,28.034,14.707,33.118 c6.022,2.318,12.697,2.279,18.692-0.11c6.888-2.775,12.248-8.379,14.715-15.383L72,196.125v115.783 c-6.884-5.291-15.317-8.174-24-8.205c-22.058-0.033-39.967,17.822-40,39.881c-0.016,10.803,4.344,21.151,12.087,28.685 C7.799,378.547,0.048,391.163,0,404.961V472c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80 c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039c-0.039-11.339-5.307-22.025-14.276-28.961h60.553 c-8.97,6.936-14.238,17.622-14.276,28.961V472c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80 c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039c-0.048-13.798-7.799-26.414-20.087-32.692 c15.795-15.417,16.102-40.72,0.685-56.515c-9.494-9.727-23.281-13.962-36.598-11.242V140.859l73.441-38.133 C254.606,97.25,260.838,82.138,255.362,68.974z M120,48c13.255,0,24,10.745,24,24s-10.745,24-24,24 c-13.249-0.014-23.986-10.751-24-24C96,58.745,106.745,48,120,48z M48,319.703c13.255,0,24,10.745,24,24s-10.745,24-24,24 s-24-10.745-24-24C24.014,330.454,34.751,319.718,48,319.703z M80,464H16v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07 c11.571,0.014,20.949,9.39,20.965,20.961V464z M208,404.961V464h-64v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07 C198.607,384.014,207.984,393.39,208,404.961z M176,319.703c13.249,0.014,23.986,10.751,24,24c0,13.255-10.745,24-24,24 s-24-10.745-24-24S162.745,319.703,176,319.703z M240.723,82.32c-1.071,2.748-3.27,4.905-6.039,5.922l-78.367,40.656 C153.665,130.274,152,133.013,152,136v175.908c-14.985,11.08-20.176,31.133-12.448,48.092H128V224h-16v136H84.448 c2.276-5.03,3.475-10.48,3.522-16H88V144c-0.001-4.419-3.584-8-8.002-7.999c-3.493,0.001-6.582,2.268-7.63,5.601L48.48,217.617 c-1.81,4.992-7.325,7.572-12.317,5.761c-0.35-0.127-0.693-0.274-1.027-0.441c-4.615-2.385-6.574-7.953-4.468-12.703l21.355-73.609 c5.759-14.79,19.976-24.556,35.848-24.625h56.645c1.282,0.002,2.546-0.307,3.684-0.898l79.512-41.273 c4.77-1.99,10.268,0.046,12.59,4.664C241.533,76.927,241.686,79.767,240.723,82.32zM331.913,372.269c15.823-15.416,16.153-40.741,0.737-56.564c-15.416-15.823-40.741-16.153-56.564-0.737 c-15.823,15.416-16.153,40.741-0.737,56.564c0.243,0.249,0.489,0.495,0.738,0.737c-12.287,6.278-20.039,18.894-20.087,32.692V472 c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039 C351.952,391.163,344.201,378.547,331.913,372.269z M304,319.703c13.255,0,24,10.745,24,24s-10.745,24-24,24s-24-10.745-24-24 C280.014,330.454,290.751,319.718,304,319.703z M336,464h-64v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07 c11.571,0.014,20.949,9.39,20.965,20.961V464zM459.913,372.269c15.823-15.416,16.153-40.741,0.737-56.564c-15.416-15.823-40.741-16.153-56.564-0.737 c-15.823,15.416-16.153,40.741-0.737,56.564c0.243,0.249,0.489,0.495,0.738,0.737c-12.287,6.278-20.039,18.894-20.087,32.692V472 c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039 C479.952,391.163,472.201,378.547,459.913,372.269z M432,319.703c13.255,0,24,10.745,24,24s-10.745,24-24,24s-24-10.745-24-24 C408.014,330.454,418.751,319.718,432,319.703z M464,464h-64v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07 c11.571,0.014,20.949,9.39,20.965,20.961V464z",
  };

  const XPATH_SELECTOR_PARTICIPANTS = `//div[@aria-label='Show everyone']//*[@d='M15 8c0-1.42-.5-2.73-1.33-3.76.42-.14.86-.24 1.33-.24 2.21 0 4 1.79 4 4s-1.79 4-4 4c-.43 0-.84-.09-1.23-.21-.03-.01-.06-.02-.1-.03A5.98 5.98 0 0 0 15 8zm1.66 5.13C18.03 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.58-3.47-6.34-3.87zM9 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 9c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2M9 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 9c2.67 0 8 1.34 8 4v3H1v-3c0-2.66 5.33-4 8-4z']`;

  const XPATH_SELECTOR_CHAT = `//div[@aria-label='Chat with everyone']//*[@d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H4V4h16v12z']`;
} catch (e) {
  console.log("error in transcripting", e);
}
