const { app, BrowserWindow, dialog, messageNode } = require('deskgap');
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
    }).once('ready-to-show', function() {
        this.show();
    });

    win.loadFile("./build/index.html");
});
