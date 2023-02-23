/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const { ipcRenderer } = require('electron')

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
        if (!equals(lastCaptions, captions)) {
          lastCaptions = captions
          ipcRenderer.send('onChangeCaption', captions)
          console.log(captions)
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