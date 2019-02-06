const { app, BrowserWindow, dialog, messageNode, systemPreferences } = require('deskgap');
const fs = require('fs');

let win = null;

messageNode.on('save-file', (e, fileName, fileContentBase64) => {
    dialog.showSaveDialog(win, { defaultPath: fileName }, (path) => {
        if (path == null) return;
        fs.writeFileSync(path, Buffer.from(fileContentBase64, 'base64'));
    });
});

app.once('ready', () => {
    win = new BrowserWindow({
        titleBarStyle: "hidden",
        menu: null,
        show: false,
        vibrancy: 'under-window-background'
    }).once('ready-to-show', function() {
        this.show();
    });

    systemPreferences.on('dark-mode-toggled', () => {
        win.webContents.send('dark-mode-toggled', systemPreferences.isDarkMode());
    });

    win.loadFile("./build/index.html");
});
