const { ipcRenderer } = require('electron')
window.onload = () => {
  const backButton = document.getElementById('backButton');
  const forwardButton = document.getElementById('forwardButton');
  const reloadButton = document.getElementById('reloadButton');
  const addressBar = document.getElementById('addressBar');

  const minButton = document.getElementById('minimizeBtn');
  const closeButton = document.getElementById('closeBtn');
  const titleBar = document.getElementById('title-bar');

  let isDragging = false;
  let mouseOffset = { x: 0, y: 0 }

  console.log(backButton);
  console.log(forwardButton)
  console.log(reloadButton)

  backButton.addEventListener('click', () => {
    console.log('b')
    ipcRenderer.send('goBack');
  });
  forwardButton.addEventListener('click', () => {
    console.log('c')
    ipcRenderer.send('goForward');
  });
  reloadButton.addEventListener('click', () => {
    console.log('r')
    ipcRenderer.send('reload')
  });
  minButton.addEventListener('click', () => {
    ipcRenderer.send('minimize')
  });
  closeButton.addEventListener('click', () => {
    ipcRenderer.send('close')
  });
  addressBar.addEventListener('change', () => {

  });
  titleBar.addEventListener('mousedown', (event) => {
    isDragging = true;
    ipcRenderer.send('getMouseOffset', { x: event.screenX, y: event.screenY })
    ipcRenderer.on('returnMouseOffset', (e, payload) => {
      mouseOffset.x = payload.x
      mouseOffset.y = payload.y
    })
  })
  titleBar.addEventListener('mousemove', (event) => {
    if (isDragging) {
      ipcRenderer.send('moveWindow', { x: event.screenX - mouseOffset.x, y: event.screenY - mouseOffset.y })
    }
  })
  titleBar.addEventListener('mouseup', () => {
    isDragging = false;
  })

}
