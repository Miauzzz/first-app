const { app, BrowserWindow } = require('electron');
const path = require('path');

// Importar el backend
require('./js/index.js'); // Asegúrate de que el archivo index.js esté en la misma carpeta

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        resizable: true,
        // frame: true,
        autoHideMenuBar: true,
        width: 1400,
        height: 800,
        minWidth: 1400,
        minHeight: 800,
        roundedCorners: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html'); // Asegúrate de que index.html exista
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});