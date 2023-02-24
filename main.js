// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, screen, Tray, Menu } = require('electron')
const path = require('path')
const url = require('url')

function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      backgroundThrottling: false,
      preload: path.join(__dirname, 'src', 'mainPage', 'mainPage.js')
    },
    title: 'YoutubeCaptionOverlayer',
  })
  const settingWindow = new BrowserWindow({
    width: 300,
    height: 350,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'setting',
    parent: mainWindow,
    resizable: false,
  })
  const subWindow = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    /* parent: mainWindow, */
    minimizable:false,
    skipTaskbar:true,
    frame: false,
    transparent: true,
  })


  subWindow.loadURL(path.join(__dirname, 'src', 'caption', 'caption.html'))
  settingWindow.loadURL(path.join(__dirname, 'src', 'setting', 'setting.html'))
  mainWindow.loadURL('https://www.youtube.com/')

  settingWindow.setMenu(null)
  mainWindow.setMenu(null)
  subWindow.setMenu(null)

  subWindow.setAlwaysOnTop(true)
  subWindow.setIgnoreMouseEvents(true)

  settingWindow.setClosable(false)

  ipcMain.on('onChangeCaption', (evt, payload) => {
    subWindow.webContents.send('onChangeCaption', payload)
  })
  ipcMain.on('onChangeHeight', (evt, payload) => {
    subWindow.webContents.send('onChangeHeight', payload)
  })
  ipcMain.on('onChangeWidth', (evt, payload) => {
    subWindow.webContents.send('onChangeWidth', payload)
  })
  ipcMain.on('onChangeFontSize', (evt, payload) => {
    subWindow.webContents.send('onChangeFontSize', payload)
  })
  ipcMain.on('onChangeFontWeight', (evt, payload) => {
    subWindow.webContents.send('onChangeFontWeight', payload)
  })
  ipcMain.on('onChangeFontColor', (evt, payload) => {
    subWindow.webContents.send('onChangeFontColor', payload)
  })
  ipcMain.on('onChangeBackgroundColor', (evt, payload) => {
    subWindow.webContents.send('onChangeBackgroundColor', payload)
  })
  const tray = new Tray(path.join(__dirname, 'tray-icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit(종료)',
      click: () => {
        BrowserWindow.getAllWindows().forEach(win=>win.destroy())
      }
    }
  ])
  tray.setToolTip('YoutubeCaptionOverlayer')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    mainWindow.show()
  })
  mainWindow.on('close', (e) => {
    e.preventDefault()
    mainWindow.hide()

  })
}


app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
