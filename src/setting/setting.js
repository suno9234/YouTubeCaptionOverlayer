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

  const background = myStorage.getItem('background')
  console.log(background)
  const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/g;
  const rgbaValues = [];
  let match;
  while ((match = rgbaRegex.exec(background)) !== null) {
    rgbaValues.push(`rgba(${match[1]}, ${match[2]}, ${match[3]}, ${match[4]})`);
  }
  const [r, g, b, o] = rgbaValues[1].split(",");
  const rNum = parseInt(r.trim().slice(5), 10);
  const gNum = parseInt(g.trim(), 10);
  const bNum = parseInt(b.trim(), 10);
  const oNum = parseFloat(o.trim().slice(0, -1));
  const rHex = ("0" + rNum.toString(16)).slice(-2);
  const gHex = ("0" + gNum.toString(16)).slice(-2);
  const bHex = ("0" + bNum.toString(16)).slice(-2);
  const hexColor = `#${rHex}${gHex}${bHex}`;

  backgroundColorSelector.value = hexColor;
  opacitySlider.value = parseInt(oNum * 10);
  //`linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]}, ${opacity / 10}), rgba(${aRgb[0]}, ${aRgb[1]},${aRgb[2]},${opacity / 10}), rgba(0, 0, 0, 0))`

  heightSlider.oninput = () => {
    ipcRenderer.send('onChangeHeight', heightSlider.value)
  }
  widthSlider.oninput = () => {
    ipcRenderer.send('onChangeWidth', widthSlider.value)
  }
  fontSizeSlider.oninput = () => {
    ipcRenderer.send('onChangeFontSize', fontSizeSlider.value)
  }
  fontWeightSlider.oninput = () => {
    ipcRenderer.send('onChangeFontWeight', fontWeightSlider.value)
  }
  fontColorSelector.oninput = () => {
    ipcRenderer.send('onChangeFontColor', fontColorSelector.value)
  }
  backgroundColorSelector.oninput = () => {
    ipcRenderer.send('onChangeBackgroundColor', [backgroundColorSelector.value, opacitySlider.value])
  }
  opacitySlider.oninput = () => {
    ipcRenderer.send('onChangeBackgroundColor', [backgroundColorSelector.value, opacitySlider.value])
  }
}