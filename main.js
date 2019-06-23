const electron = require('electron');
const url = require('url');
const path = require('path');

const {
  app,
  BrowserWindow
} = electron;

let mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
});
