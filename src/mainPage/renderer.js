const { ipcRenderer } = require('electron')
window.onload = () => {
  const backButton = document.getElementById('backButton');
  const forwardButton = document.getElementById('forwardButton');
  const reloadButton = document.getElementById('reloadButton');
  const addressBar = document.getElementById('addressBar');

  const minButton = document.getElementById('minimizeBtn');
  const closeButton = document.getElementById('closeBtn');

  backButton.addEventListener('click', () => {
    ipcRenderer.send('goBack');
  });
  forwardButton.addEventListener('click', () => {
    ipcRenderer.send('goForward');
  });
  reloadButton.addEventListener('click', () => {
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
}
