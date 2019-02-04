const { app, BrowserWindow, dialog, messageNode } = require('deskgap');
const fs = require('fs');

messageNode.on('save-file', (e, fileName, fileContentBase64) => {
    dialog.showSaveDialog(null, { defaultPath: fileName }, (path) => {
        if (path == null) return;
        fs.writeFileSync(path, Buffer.from(fileContentBase64, 'base64'));
    });
});


app.once('ready', () => {
    const win = new BrowserWindow({
        show: false
    }).once('ready-to-show', function() {
        this.show();
    });

    win.loadFile("./build/index.html");
});
