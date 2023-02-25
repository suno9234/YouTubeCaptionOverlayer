const { ipcRenderer } = require('electron');

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);


window.onload = () => {
  const doc = document;
  let lastCaptions = []

  const docObserver = new MutationObserver((mutations) => {
    const target = document.getElementById('ytp-caption-window-container')
    if (target) {
      captions = []
      const spans = target.querySelectorAll(".ytp-caption-segment");
      if (spans && spans.length > 0) {
        spans.forEach((v) => {
          if (v.innerText.length>1){
            captions.push(v.innerText)
          }
        })
        if (captions.length %2 == 0){
          if (equals(captions.slice(0,captions.length/2),captions.slice(captions.length/2,captions.length))){
            captions = captions.slice(0,captions.length/2)
          }
        }
        if (!equals(lastCaptions, captions)) {
          lastCaptions = captions
          ipcRenderer.send('onChangeCaption', captions)
        }
      }

    }
  })
  const option = {
    childList: true,
    subtree: true,
  }
  docObserver.observe(doc, option)

}