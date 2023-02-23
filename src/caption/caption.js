const { ipcRenderer } = require('electron')
let elapsedTime = 0;
let intervalId ;

window.onload = () => {
  const caption0 = document.getElementById('caption0')
  const caption1 = document.getElementById('caption1')
  caption0.innerText = ''
  caption1.innerText = ''
  ipcRenderer.on('onChangeCaption', (evt, payload) => {
    if (payload.length > 1){
      caption0.innerText = payload[0]
      caption1.innerText = payload[1]
    }else if (payload.length > 0){
      caption0.innerText = payload[0]
      caption1.innerText = ''
    }else{
      caption0.innerText = ''
      caption1.innerText = ''
    }
    elapsedTime = 0
  })
  intervalId = setInterval(()=>{
    elapsedTime+=1;
    if(elapsedTime > 6){
      caption0.innerText = "";
      caption1.innerText = "";
      elapsedTime = 0;
    }
  },1000)
}

window.onbeforeunload = ()=>{
  clearInterval(intervalId)
}