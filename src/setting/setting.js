const { ipcRenderer } = require('electron')
const myStorage = localStorage;
window.onload = () => {
  const heightSlider = document.getElementById('user-height')
  const widthSlider = document.getElementById('user-width')
  const fontSizeSlider = document.getElementById('user-font-size')
  const fontWeightSlider = document.getElementById('user-font-weight')
  const fontColorSelector = document.getElementById('user-font-color')
  const backgroundColorSelector = document.getElementById('user-background-color')
  const opacitySlider = document.getElementById('user-opacity')

  heightSlider.value = myStorage.getItem('marginTop') || '80vh'
  widthSlider.value = myStorage.getItem('width') || '90vw'
  fontSizeSlider.value = myStorage.getItem('fontSize') || '30px'
  fontWeightSlider.value = myStorage.getItem('fontWeight') || '600'
  fontColorSelector.value = myStorage.getItem('color') || '#ffffff'
  
  heightSlider.oninput = ()=>{
    ipcRenderer.send('onChangeHeight',heightSlider.value)
  }
  widthSlider.oninput = ()=>{
    ipcRenderer.send('onChangeWidth',widthSlider.value)
  }
  fontSizeSlider.oninput = ()=>{
    ipcRenderer.send('onChangeFontSize',fontSizeSlider.value)
  }
  fontWeightSlider.oninput = ()=>{
    ipcRenderer.send('onChangeFontWeight',fontWeightSlider.value)
  }
  fontColorSelector.oninput = ()=>{
    ipcRenderer.send('onChangeFontColor',fontColorSelector.value)
  }
  backgroundColorSelector.oninput = ()=>{
    ipcRenderer.send('onChangeBackgroundColor',[backgroundColorSelector.value,opacitySlider.value])
  }
  opacitySlider.oninput = ()=>{
    ipcRenderer.send('onChangeBackgroundColor',[backgroundColorSelector.value,opacitySlider.value])
  }
}