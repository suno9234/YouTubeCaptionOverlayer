const { ipcRenderer } = require('electron')
const myStorage = window.localStorage;
let elapsedTime = 0;
let intervalId;

window.onload = () => {
  const wrapper = document.getElementById('caption-wrapper')
  const caption0 = document.getElementById('caption0')
  const caption1 = document.getElementById('caption1')
  const caption2 = document.getElementById('caption2')
  wrapper.style.background = myStorage.getItem('background') || 'background: linear-gradient(90deg, rgba(0,0,0, 0), rgba(0,0,0,0.6), rgba(0,0,0,0.6), rgba(0,0,0, 0))'
  wrapper.style.color = myStorage.getItem('color') || '#ffffff'
  wrapper.style.width = myStorage.getItem('width') ? myStorage.getItem('width')+'vw' : `90vw`
  wrapper.style.marginTop = myStorage.getItem('marginTop')?  myStorage.getItem('marginTop')+'vh' :  '80vh'
  wrapper.style.fontSize = myStorage.getItem('fontSize') ? myStorage.getItem('fontSize')+'px' : '30px'
  wrapper.style.fontWeight = myStorage.getItem('fontWeight') || '600'
  wrapper.style.lineHeight = myStorage.getItem('fontSize') ? myStorage.getItem('fontSize') * 1.2 + 'px' : '40px'

  console.log(myStorage);
  caption0.innerText = ''
  caption1.innerText = ''
  caption2.innerText = ''
  ipcRenderer.on('onChangeCaption', (evt, payload) => {
    if(payload.length > 2){
      caption0.innerText = payload[0]
      caption1.innerText = payload[1]
      caption2.innerText = payload[2]
    }
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
    myStorage.setItem('marginTop', payload)
  })
  ipcRenderer.on('onChangeWidth', (evt, payload) => {
    wrapper.style.width = payload + 'vw'
    myStorage.setItem('width', payload)
  })
  ipcRenderer.on('onChangeFontSize', (evt, payload) => {
    wrapper.style.fontSize = payload + 'px'
    wrapper.style.lineHeight = payload * 1.2 + 'px'
    myStorage.setItem('fontSize', payload)
    myStorage.setItem('lineHeight', payload * 1.2 + 'px')
  })
  ipcRenderer.on('onChangeFontWeight', (evt, payload) => {
    wrapper.style.fontWeight = payload
    myStorage.setItem('fontWeight', payload)
  })
  ipcRenderer.on('onChangeFontColor', (evt, payload) => {
    wrapper.style.color = payload
    myStorage.setItem('color', payload)
  })
  ipcRenderer.on('onChangeBackgroundColor', (evt, payload) => {
    let [color, opacity] = payload
    color = color.substr(1)
    const rgbhex = color.match(/.{1,2}/g);
    const aRgb = [
      parseInt(rgbhex[0], 16),
      parseInt(rgbhex[1], 16),
      parseInt(rgbhex[2], 16),
    ]
    wrapper.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]}, ${opacity / 10}), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]},${opacity / 10}), rgba(0, 0, 0, 0))`
    myStorage.setItem('background', `linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]}, ${opacity / 10}), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]},${opacity / 10}), rgba(0, 0, 0, 0))`)
  })
  intervalId = setInterval(() => {
    elapsedTime += 1;
    if (elapsedTime > 15) {
      caption0.innerText = "";
      caption1.innerText = "";
      caption2.innerText = "";
      elapsedTime = 0;
    }
  }, 1000)
}

window.onbeforeunload = () => {
  clearInterval(intervalId)
}