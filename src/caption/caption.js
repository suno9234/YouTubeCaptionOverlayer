const { ipcRenderer } = require('electron')
let elapsedTime = 0;
let intervalId;

window.onload = () => {
  const wrapper = document.getElementById('caption-wrapper')
  const caption0 = document.getElementById('caption0')
  const caption1 = document.getElementById('caption1')
  caption0.innerText = ''
  caption1.innerText = ''
  ipcRenderer.on('onChangeCaption', (evt, payload) => {
    if (payload.length > 1) {
      caption0.innerText = payload[0]
      caption1.innerText = payload[1]
    } else if (payload.length > 0) {
      caption0.innerText = payload[0]
      caption1.innerText = ''
    } else {
      caption0.innerText = ''
      caption1.innerText = ''
    }
    elapsedTime = 0
  })
  ipcRenderer.on('onChangeHeight', (evt, payload) => {
    wrapper.style.marginTop = payload + 'vh'
  })
  ipcRenderer.on('onChangeWidth', (evt, payload) => {
    wrapper.style.width = payload + 'vw'
  })
  ipcRenderer.on('onChangeFontSize', (evt, payload) => {
    wrapper.style.fontSize = payload + 'px'
    wrapper.style.lineHeight = payload * 1.2 + 'px'
  })
  ipcRenderer.on('onChangeFontWeight', (evt, payload) => {
    wrapper.style.fontWeight = payload
  })
  ipcRenderer.on('onChangeFontColor', (evt, payload) => {
    wrapper.style.color = payload
  })
  ipcRenderer.on('onChangeBackgroundColor', (evt, payload) => {
    let [color, opacity] = payload
    color = color.substr(1)
    const rgbhex = color.match(/.{1,2}/g);
    const aRgb = [
      parseInt(rgbhex[0],16),
      parseInt(rgbhex[1],16),
      parseInt(rgbhex[2],16),
    ]
    wrapper.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]}, ${opacity/10}), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]},${opacity/10}), rgba(0, 0, 0, 0))`
  })
  intervalId = setInterval(() => {
    elapsedTime += 1;
    if (elapsedTime > 10) {
      caption0.innerText = "";
      caption1.innerText = "";
      elapsedTime = 0;
    }
  }, 1000)
}

window.onbeforeunload = () => {
  clearInterval(intervalId)
}