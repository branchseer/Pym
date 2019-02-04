const { app, BrowserWindow } = require('deskgap');

app.once('ready', () => {
    const win = new BrowserWindow({
        show: false
    }).once('ready-to-show', function() {
        this.show();
    });

    win.loadFile("./build/index.html");
});
