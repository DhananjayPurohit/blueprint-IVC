
console.log("reader loaded");

try {
  let buttonisadded = false;
  let dropvisible = false;
  let isTranscribing = false;
  let subject = 'Subject';
  var recognition = false;
  var transcript = '';
  var email = '';
  var class_id = '';
  
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = event => {
    var final_transcript = '';
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    transcript=transcript+final_transcript;
    console.log("Recorded by webspeechapi: "+transcript);
  };

  const xpath_sharetray=`//item-widget/push-button/div/button[@id='share-button']`;
  const xpath_mic=`//item-widget/push-button/div/button[@id='microphone-button']`;
  const pathD='M472.004,0c-0.001,0-0.003,0-0.004,0H8C3.583-0.001,0.001,3.579,0,7.996C0,7.997,0,7.999,0,8v160h16V16h448v176H184v16    h288c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004V8C480.001,3.583,476.421,0.001,472.004,0z M255.362,68.974c-5.477-13.165-20.589-19.397-33.753-13.92c-0.225,0.094-0.449,0.19-0.671,0.29l-64.868,33.65    C158.628,83.692,159.971,77.886,160,72c0-22.091-17.909-40-40-40S80,49.909,80,72c0.03,8.683,2.913,17.116,8.205,24h-0.333    c-22.708,0.152-42.979,14.269-50.996,35.516L15.52,205.125c-5.084,13.206,1.5,28.034,14.707,33.118    c6.022,2.318,12.697,2.279,18.692-0.11c6.888-2.775,12.248-8.379,14.715-15.383L72,196.125v115.783    c-6.884-5.291-15.317-8.174-24-8.205c-22.058-0.033-39.967,17.822-40,39.881c-0.016,10.803,4.344,21.151,12.087,28.685    C7.799,378.547,0.048,391.163,0,404.961V472c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80    c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039c-0.039-11.339-5.307-22.025-14.276-28.961h60.553    c-8.97,6.936-14.238,17.622-14.276,28.961V472c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80    c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039c-0.048-13.798-7.799-26.414-20.087-32.692    c15.795-15.417,16.102-40.72,0.685-56.515c-9.494-9.727-23.281-13.962-36.598-11.242V140.859l73.441-38.133    C254.606,97.25,260.838,82.138,255.362,68.974z M120,48c13.255,0,24,10.745,24,24s-10.745,24-24,24    c-13.249-0.014-23.986-10.751-24-24C96,58.745,106.745,48,120,48z M48,319.703c13.255,0,24,10.745,24,24s-10.745,24-24,24    s-24-10.745-24-24C24.014,330.454,34.751,319.718,48,319.703z M80,464H16v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07    c11.571,0.014,20.949,9.39,20.965,20.961V464z M208,404.961V464h-64v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07    C198.607,384.014,207.984,393.39,208,404.961z M176,319.703c13.249,0.014,23.986,10.751,24,24c0,13.255-10.745,24-24,24    s-24-10.745-24-24S162.745,319.703,176,319.703z M240.723,82.32c-1.071,2.748-3.27,4.905-6.039,5.922l-78.367,40.656    C153.665,130.274,152,133.013,152,136v175.908c-14.985,11.08-20.176,31.133-12.448,48.092H128V224h-16v136H84.448    c2.276-5.03,3.475-10.48,3.522-16H88V144c-0.001-4.419-3.584-8-8.002-7.999c-3.493,0.001-6.582,2.268-7.63,5.601L48.48,217.617    c-1.81,4.992-7.325,7.572-12.317,5.761c-0.35-0.127-0.693-0.274-1.027-0.441c-4.615-2.385-6.574-7.953-4.468-12.703l21.355-73.609    c5.759-14.79,19.976-24.556,35.848-24.625h56.645c1.282,0.002,2.546-0.307,3.684-0.898l79.512-41.273    c4.77-1.99,10.268,0.046,12.59,4.664C241.533,76.927,241.686,79.767,240.723,82.32z M331.913,372.269c15.823-15.416,16.153-40.741,0.737-56.564c-15.416-15.823-40.741-16.153-56.564-0.737    c-15.823,15.416-16.153,40.741-0.737,56.564c0.243,0.249,0.489,0.495,0.738,0.737c-12.287,6.278-20.039,18.894-20.087,32.692V472    c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039    C351.952,391.163,344.201,378.547,331.913,372.269z M304,319.703c13.255,0,24,10.745,24,24s-10.745,24-24,24s-24-10.745-24-24    C280.014,330.454,290.751,319.718,304,319.703z M336,464h-64v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07    c11.571,0.014,20.949,9.39,20.965,20.961V464z M459.913,372.269c15.823-15.416,16.153-40.741,0.737-56.564c-15.416-15.823-40.741-16.153-56.564-0.737    c-15.823,15.416-16.153,40.741-0.737,56.564c0.243,0.249,0.489,0.495,0.738,0.737c-12.287,6.278-20.039,18.894-20.087,32.692V472    c-0.001,4.417,3.579,7.999,7.996,8c0.001,0,0.003,0,0.004,0h80c4.417,0.001,7.999-3.579,8-7.996c0-0.001,0-0.003,0-0.004v-67.039    C479.952,391.163,472.201,378.547,459.913,372.269z M432,319.703c13.255,0,24,10.745,24,24s-10.745,24-24,24s-24-10.745-24-24    C408.014,330.454,418.751,319.718,432,319.703z M464,464h-64v-59.039c0.016-11.571,9.393-20.947,20.965-20.961h22.07    c11.571,0.014,20.949,9.39,20.965,20.961V464z';
  // const pathDwithstroke='m472.004,0c-0.001,0 -0.003,0 -0.004,0l-464,0c-4.417,-0.001 -7.999,3.579 -8,7.996c0,0.001 0,0.003 0,0.004l0,160l16,0l0,-152l448,0l0,176l-280,0l0,16l288,0c4.417,0.001 7.999,-3.579 8,-7.996c0,-0.001 0,-0.003 0,-0.004l0,-192c0.001,-4.417 -3.579,-7.999 -7.996,-8z m255.362,68.974c-5.477,-13.165 -20.589,-19.397 -33.753,-13.92c-0.225,0.094 -0.449,0.19 -0.671,0.29l-64.868,33.65c2.558,-5.302 3.901,-11.108 3.93,-16.994c0,-22.091 -17.909,-40 -40,-40s-40,17.909 -40,40c0.03,8.683 2.913,17.116 8.205,24l-0.333,0c-22.708,0.152 -42.979,14.269 -50.996,35.516l-21.356,73.609c-5.084,13.206 1.5,28.034 14.707,33.118c6.022,2.318 12.697,2.279 18.692,-0.11c6.888,-2.775 12.248,-8.379 14.715,-15.383l8.366,-26.625l0,115.783c-6.884,-5.291 -15.317,-8.174 -24,-8.205c-22.058,-0.033 -39.967,17.822 -40,39.881c-0.016,10.803 4.344,21.151 12.087,28.685c-12.288,6.278 -20.039,18.894 -20.087,32.692l0,67.039c-0.001,4.417 3.579,7.999 7.996,8c0.001,0 0.003,0 0.004,0l80,0c4.417,0.001 7.999,-3.579 8,-7.996c0,-0.001 0,-0.003 0,-0.004l0,-67.039c-0.039,-11.339 -5.307,-22.025 -14.276,-28.961l60.553,0c-8.97,6.936 -14.238,17.622 -14.276,28.961l0,67.039c-0.001,4.417 3.579,7.999 7.996,8c0.001,0 0.003,0 0.004,0l80,0c4.417,0.001 7.999,-3.579 8,-7.996c0,-0.001 0,-0.003 0,-0.004l0,-67.039c-0.048,-13.798 -7.799,-26.414 -20.087,-32.692c15.795,-15.417 16.102,-40.72 0.685,-56.515c-9.494,-9.727 -23.281,-13.962 -36.598,-11.242l0,-163.653l73.441,-38.133c13.164,-5.476 19.396,-20.588 13.92,-33.752zm-135.362,-20.974c13.255,0 24,10.745 24,24s-10.745,24 -24,24c-13.249,-0.014 -23.986,-10.751 -24,-24c0,-13.255 10.745,-24 24,-24zm-72,271.703c13.255,0 24,10.745 24,24s-10.745,24 -24,24s-24,-10.745 -24,-24c0.014,-13.249 10.751,-23.985 24,-24zm32,144.297l-64,0l0,-59.039c0.016,-11.571 9.393,-20.947 20.965,-20.961l22.07,0c11.571,0.014 20.949,9.39 20.965,20.961l0,59.039zm128,-59.039l0,59.039l-64,0l0,-59.039c0.016,-11.571 9.393,-20.947 20.965,-20.961l22.07,0c11.572,0.014 20.949,9.39 20.965,20.961zm-32,-85.258c13.249,0.014 23.986,10.751 24,24c0,13.255 -10.745,24 -24,24s-24,-10.745 -24,-24s10.745,-24 24,-24zm64.723,-237.383c-1.071,2.748 -3.27,4.905 -6.039,5.922l-78.367,40.656c-2.652,1.376 -4.317,4.115 -4.317,7.102l0,175.908c-14.985,11.08 -20.176,31.133 -12.448,48.092l-11.552,0l0,-136l-16,0l0,136l-27.552,0c2.276,-5.03 3.475,-10.48 3.522,-16l0.03,0l0,-200c-0.001,-4.419 -3.584,-8 -8.002,-7.999c-3.493,0.001 -6.582,2.268 -7.63,5.601l-23.888,76.015c-1.81,4.992 -7.325,7.572 -12.317,5.761c-0.35,-0.127 -0.693,-0.274 -1.027,-0.441c-4.615,-2.385 -6.574,-7.953 -4.468,-12.703l21.355,-73.609c5.759,-14.79 19.976,-24.556 35.848,-24.625l56.645,0c1.282,0.002 2.546,-0.307 3.684,-0.898l79.512,-41.273c4.77,-1.99 10.268,0.046 12.59,4.664c1.231,2.434 1.384,5.274 0.421,7.827z m331.913,372.269c15.823,-15.416 16.153,-40.741 0.737,-56.564c-15.416,-15.823 -40.741,-16.153 -56.564,-0.737c-15.823,15.416 -16.153,40.741 -0.737,56.564c0.243,0.249 0.489,0.495 0.738,0.737c-12.287,6.278 -20.039,18.894 -20.087,32.692l0,67.039c-0.001,4.417 3.579,7.999 7.996,8c0.001,0 0.003,0 0.004,0l80,0c4.417,0.001 7.999,-3.579 8,-7.996c0,-0.001 0,-0.003 0,-0.004l0,-67.039c-0.048,-13.798 -7.799,-26.414 -20.087,-32.692zm-27.913,-52.566c13.255,0 24,10.745 24,24s-10.745,24 -24,24s-24,-10.745 -24,-24c0.014,-13.249 10.751,-23.985 24,-24zm32,144.297l-64,0l0,-59.039c0.016,-11.571 9.393,-20.947 20.965,-20.961l22.07,0c11.571,0.014 20.949,9.39 20.965,20.961l0,59.039z m459.913,372.269c15.823,-15.416 16.153,-40.741 0.737,-56.564c-15.416,-15.823 -40.741,-16.153 -56.564,-0.737c-15.823,15.416 -16.153,40.741 -0.737,56.564c0.243,0.249 0.489,0.495 0.738,0.737c-12.287,6.278 -20.039,18.894 -20.087,32.692l0,67.039c-0.001,4.417 3.579,7.999 7.996,8c0.001,0 0.003,0 0.004,0l80,0c4.417,0.001 7.999,-3.579 8,-7.996c0,-0.001 0,-0.003 0,-0.004l0,-67.039c-0.048,-13.798 -7.799,-26.414 -20.087,-32.692zm-27.913,-52.566c13.255,0 24,10.745 24,24s-10.745,24 -24,24s-24,-10.745 -24,-24c0.014,-13.249 10.751,-23.985 24,-24zm32,144.297l-64,0l0,-59.039c0.016,-11.571 9.393,-20.947 20.965,-20.961l22.07,0c11.571,0.014 20.949,9.39 20.965,20.961l0,59.039z';
  const xpath = (search, root = document) => {
    return document.evaluate(
      search,
      root,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE
    ).singleNodeValue;
  };

  const parents = (node) => {
    const nodes = [node];
    for (; node; node = node.parentNode) {
      nodes.unshift(node);
    }
    return nodes;
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

  const findButtonContainer = () => {
    const micIcon = xpath(xpath_mic, document);
    const sharetrayIcon = xpath(xpath_sharetray, document);
    return getCommonAncestor(micIcon, sharetrayIcon);
  };

  const startTranscribing = () => {
    recognition.start();
    document.getElementById("toggle-icon").innerHTML=`<path d="${pathD}" class="icons-default-fill" />`;
    CallSendRequest();
    console.log("Start");
  };

  const stopTranscribing = () => {
    recognition.stop();
    document.getElementById("toggle-icon").innerHTML=`<path d="${pathD}" class="icons-default-fill" /><line stroke="#fff" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_40" y2="600" x2="-100" y1="-100" x1="600" fill-opacity="null" stroke-opacity="null" stroke-width="20" fill="none"/>`;
    clearInterval(sendRequest);
    console.log("Stop");
  };

  const toggleTranscribing = () => {
    isTranscribing = !isTranscribing;
    isTranscribing ? startTranscribing() : stopTranscribing();
  };

  const makeCapitalString = (text) => {
    var SubInCap="";
    var token=text.split(" ");
    token.forEach(el => {
      SubInCap+=el.charAt(0);
    })
    return SubInCap;
  }

  const makeMenuOption = (text) => {
    const option = document.createElement('div');
    option.classList.add('subjects');
    option.appendChild(document.createTextNode(text));
    option.onclick = function setSubject(){ 
      dropvisible = false;
      subject = text;
      document.getElementById("addoptions").style.display='none';
      const divdown=document.getElementById("subjecttext");
      divdown.textContent = makeCapitalString(subject);
      // fetch(`https://b0d1592f0283.ngrok.io/get-class?email=${email}&course=${subject}`)
      // .then(response => response.json())
      // .then(data => {class_id=data.class});
    };
    return option;
  }

  const makeMenu = (additionalOptions) => {
    

    // fetch(`https://b0d1592f0283.ngrok.io/check-teacher?email=${email}`)
    // .then(response => response.json())
    // .then(data => {data.course.forEach((el) => additionalOptions.appendChild(makeMenuOption(el)));});
    const data = ['Operating Systems','Computer Network','Computer Organization Architecture'];
    data.forEach((el)=>{
      additionalOptions.appendChild(makeMenuOption(el));
    })
    document.body.appendChild(additionalOptions);
  }

  const refresh = setInterval(() => {

    const buttons = findButtonContainer();
    if (buttons && !buttonisadded) {
      buttonisadded = true;
      const toggle = buttons.children[3].cloneNode();
      buttons.append(toggle);
      const pushButton = document.createElement("push-button");
      toggle.appendChild(pushButton);
      const pushdiv = document.createElement("div");
      pushdiv.classList.add("ts-push-button");
      pushdiv.onclick = toggleTranscribing;
      pushButton.appendChild(pushdiv);
      const divbutton = document.createElement("button");
      divbutton.classList.add("ts-push-button-action","ts-sym","togglable","inset-border");
      pushdiv.appendChild(divbutton);
      const svgcontainer = document.createElement("ng-include");
      svgcontainer.classList.add("iconWrapper");
      divbutton.appendChild(svgcontainer);
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add("app-svg");
      svg.style.padding = '10px';
      svg.setAttribute("viewBox", `0 0 512 560`);
      svg.innerHTML = `<g id="toggle-icon"><path d="${pathD}" class="icons-default-fill" /><line stroke="#fff" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_40" y2="600" x2="-100" y1="-100" x1="600" fill-opacity="null" stroke-opacity="null" stroke-width="20" fill="none"/></g>`;
      svgcontainer.appendChild(svg);

      
      const additionalOptions = document.createElement('div');
      additionalOptions.setAttribute("id","addoptions");

      const dropdown = buttons.children[3].cloneNode();
      buttons.append(dropdown);
      const droppush = document.createElement("push-button");
      droppush.setAttribute("id","subjectbutton");
      dropdown.appendChild(droppush);
      const dropdiv = document.createElement("div");
      dropdiv.classList.add("ts-push-button");
      droppush.onclick = function showmenu(){
        if (!dropvisible){
          const subjectbutton = document.getElementById("subjectbutton");
          const pos=subjectbutton.getBoundingClientRect();
          additionalOptions.style.left=`${pos.left}px`;
          additionalOptions.style.bottom=`${window.innerHeight-pos.top}px`;
        }
        document.getElementById("addoptions").style.display= (dropvisible)?'none':'block';
        dropvisible=!dropvisible;
      };
      droppush.appendChild(dropdiv);
      const divdown = document.createElement("button");
      divdown.classList.add("ts-push-button-action","ts-sym","togglable","inset-border","dropbutton");
      divdown.setAttribute("id","subjecttext");
      divdown.textContent = subject;
      dropdiv.appendChild(divdown);
      makeMenu(additionalOptions);
      const emailcomp = document.getElementsByClassName("user-picture")[0];
      email = emailcomp.getAttribute("upn");
    }
  }, 5000);

  function CallSendRequest() {
    const sendRequest = setInterval(() => {
      const text = transcript;
      console.log(text);
      transcript = "";
      console.log(class_id);
      if (text!=""){
      fetch("https://2d7ab7ade495.ngrok.io/submit", {
        method: "post",
        body: JSON.stringify({
          text: text,
          email: email,
          subject: subject
        }),
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
  const STYLE = document.createElement("style");
  STYLE.innerText = `
    .dropbutton {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
    }
    #addoptions {
      position: absolute;
      z-index: 1000;
      display: none;
      float: left;
      min-width: 140px;
      padding: 5px 0;
      margin: 2px 0 0;
      list-style: none;
      font-size: 14px;
      text-align: left;
      background-color: #fff;
      border: 1px solid #ccc;
      border: 1px solid rgba(0,0,0,.15);
      border-radius: .3rem;
      box-shadow: 0 6px 12px rgba(0,0,0,.175);
      background-clip: padding-box;
      background: #2d2c2c;
    }
    .subjects {
      margin-top: .2rem;
      padding: 0 1.5rem 0.3rem .8rem;
      color: white;
      background: #2d2c2c;
    }
    #addoptions div:hover {
      background: #404040;
      cursor: pointer;
    }
  `;
  document.body.append(STYLE);

} catch (e) {
  console.log("error in transcripting", e);
}
