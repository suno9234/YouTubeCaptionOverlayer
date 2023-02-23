const { ipcRenderer } = require('electron')

window.onload = () => {
  const heightSlider = document.getElementById('user-height')
  const widthSlider = document.getElementById('user-width')
  const fontSizeSlider = document.getElementById('user-font-size')
  const fontWeightSlider = document.getElementById('user-font-weight')
  const fontColorSelector = document.getElementById('user-font-color')
  const backgroundColorSelector = document.getElementById('user-background-color')
  const opacitySlider = document.getElementById('user-opacity')

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